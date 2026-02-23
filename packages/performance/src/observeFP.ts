import {
  PaintPageType,
  TraceKindEnum,
  TraceTypeEnum,
} from "@mafirm-monitor/types";
// 检测 页面渲染性能 first paint 首次内容绘制
export const observeLCP = () => {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.name === "first-paint") {
        observer.disconnect();

        const entryData = entry.toJSON();
        const monitorData: PaintPageType = {
          ...entryData,
          kind: TraceKindEnum.PERFORMANCE,
          type: TraceTypeEnum.FP,
          timestamp: new Date().getTime(),
          pageUrl: window.location.href,
        };
        console.log(monitorData);
        // 数据上报
      }
    });
  });

  observer.observe({ type: "first-paint", buffered: true });
};
