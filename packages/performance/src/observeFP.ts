import {
  PaintPageType,
  TraceKindEnum,
  TraceTypeEnum,
  SendReportData,
} from "@mafirm-monitor/types";
// 检测 页面渲染性能 first paint 首次内容绘制
export const observeFP = (callback: SendReportData) => {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.name === "first-paint") {
        observer.disconnect();

        const entryData = entry.toJSON();
        const monitorData = {
          ...entryData,
          kind: TraceKindEnum.PERFORMANCE,
          type: TraceTypeEnum.FP,
          timestamp: new Date().getTime(),
          pageUrl: window.location.href,
        };
        console.log(monitorData);
        // 数据上报
        callback(monitorData);
      }
    });
  });

  observer.observe({ type: "first-paint", buffered: true });
};
