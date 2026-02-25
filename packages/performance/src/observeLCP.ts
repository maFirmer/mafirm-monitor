import {
  PaintPageType,
  TraceKindEnum,
  TraceTypeEnum,
  SendReportData,
} from "@mafirm-monitor/types";
// 检测 页面渲染性能 largest content paint 最大内容绘制
export const observeLCP = (callback: SendReportData) => {
  const observer = new PerformanceObserver((list) => {
    if (observer) {
      observer.disconnect();
    }
    list.getEntries().forEach((entry) => {
      const entryData = entry.toJSON();
      const monitorData: PaintPageType = {
        ...entryData,
        kind: TraceKindEnum.PERFORMANCE,
        type: TraceTypeEnum.LCP,
        timestamp: new Date().getTime(),
        pageUrl: window.location.href,
      };
      console.log(monitorData);
      // 数据上报
      callback(monitorData);
    });
  });

  observer.observe({ type: "largest-contentful-paint", buffered: true });
};
