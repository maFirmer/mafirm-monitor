import {
  PaintPageType,
  TraceKindEnum,
  TraceTypeEnum,
  SendReportData,
} from "@mafirm-monitor/types";
// 检测 页面渲染性能 largest content paint 最大内容绘制
export const observeLCP = (callback: SendReportData) => {
  console.log("largest content paint");
  const observer = new PerformanceObserver((list) => {
    if (observer) {
      observer.disconnect();
    }
    list.getEntries().forEach((entry) => {
      const entryData = entry.toJSON();
      const monitorData = {
        ...entryData,
        kind: TraceKindEnum.PERFORMANCE,
        type: TraceTypeEnum.LCP,
        timestamp: new Date().getTime(),
        pageUrl: window.location.href,
      };
      // 数据上报
      callback(monitorData);
    });
  });

  observer.observe({ type: "largest-contentful-paint", buffered: true });
};
