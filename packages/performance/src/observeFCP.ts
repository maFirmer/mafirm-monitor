import {
  PaintPageType,
  TraceKindEnum,
  TraceTypeEnum,
} from "@mafirm-monitor/types";
// 检测 页面渲染性能 first content paint 首次内容绘制
export const observeFCP = () => {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.name === "first-contentful-paint") {
        // 绘制完成 停止监听
        observer.disconnect();
        const entryData = entry.toJSON();
        const monitorData: PaintPageType = {
          ...entryData,
          kind: TraceKindEnum.PERFORMANCE,
          type: TraceTypeEnum.FCP,
          timestamp: new Date().getTime(),
          pageUrl: window.location.href,
        };
        console.log(monitorData);
        // 数据上报
      }
    });
  });

  observer.observe({ type: "paint", buffered: true });
};
