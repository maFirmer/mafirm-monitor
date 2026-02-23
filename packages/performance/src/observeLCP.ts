import {
  PaintPageType,
  TraceKindEnum,
  TraceTypeEnum,
} from "@mafirm-monitor/types";
// 检测 页面渲染性能 largest content paint 最大内容绘制
export const observeLCP = () => {
  const observer = new PerformanceObserver((list) => {
    if (observer) {
      observer.disconnect();
    }
    list.getEntries().forEach((entry) => {
      const entryData = entry.toJSON();
      const data: PaintPageType = {
        ...entryData,
        kind: TraceKindEnum.PERFORMANCE,
        type: TraceTypeEnum.LCP,
        timestamp: new Date().getTime(),
        pageUrl: window.location.href,
      };
      console.log(data);
      // 数据上报
    });
  });

  observer.observe({ type: "largest-contentful-paint", buffered: true });
};
