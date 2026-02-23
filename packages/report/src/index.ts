/**
 * 数据上传
 * 优先级：图片上 > sendBeacon > ajax
 */

import config from "@mafirm-monitor/config";
import {
  generateUID,
  hasSendBeacon,
  getReportCache,
  addReportCache,
  clearReportCache,
} from "@mafirm-monitor/utils";

export const report = (data) => {
  if (!config.url) {
    console.error("请配置上报地址");
  }
  const monitorData = {
    id: generateUID(),
    data,
  };
  // 上传数据
  setReportUpload(monitorData);
};

export const batchReport = (data) => {
  addReportCache(data);
  const reportCache = getReportCache();
  const maxReportUploadSize = config.maxReportUploadSize;
  if (reportCache.length && reportCache.length > maxReportUploadSize) {
    report(reportCache);
    clearReportCache();
  }
};

const setReportUpload = (data) => {
  if (config.openImgUpload) {
    imgRequest(data);
  } else {
    const request = hasSendBeacon() ? sendBeaconRequent : ajaxRequest;
    if (window.requestIdleCallback) {
      window.requestIdleCallback(
        () => {
          request(data);
        },
        { timeout: 3000 },
      );
    } else {
      setTimeout(() => {
        request(data);
      }, 500);
    }
  }
};

// 图片上传
const imgRequest = (data) => {
  const img = new Image();
  img.src = `${config.url}?data=${encodeURIComponent(JSON.stringify(data))}`;
};
// sendBeacon 上传
const sendBeaconRequent = (data) => {
  navigator.sendBeacon(config.url, JSON.stringify(data));
};
// ajax 上传
const originalOpen = XMLHttpRequest.prototype.open;
const originalSend = XMLHttpRequest.prototype.send;
const ajaxRequest = (data) => {
  const xhr = new XMLHttpRequest();
  originalOpen.call(xhr, "POST", config.url, true);
  originalSend.call(xhr, JSON.stringify(data));
};
