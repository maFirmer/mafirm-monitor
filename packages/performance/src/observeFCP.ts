import {
  PaintPageType,
  TraceKindEnum,
  TraceTypeEnum,
  SendReportData,
} from "@mafirm-monitor/types";
// 检测 页面渲染性能 first content paint 首次内容绘制
export const observeFCP = (callback: SendReportData) => {
  console.log("first content paint");
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.name === "first-contentful-paint") {
        // 绘制完成 停止监听
        observer.disconnect();
        const entryData = entry.toJSON();
        const monitorData = {
          ...entryData,
          kind: TraceKindEnum.PERFORMANCE,
          type: TraceTypeEnum.FCP,
          timestamp: new Date().getTime(),
          pageUrl: window.location.href,
        };
        // 数据上报
        callback(monitorData);
      }
    });
  });

  observer.observe({ type: "paint", buffered: true });
};
