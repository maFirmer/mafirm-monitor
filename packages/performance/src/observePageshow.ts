import { TraceTypeEnum, TraceKindEnum } from "@mafirm-monitor/types";
export const observePageshow = () => {
  window.addEventListener(
    "pageshow",
    (event) => {
      requestAnimationFrame(() => {
        ["load", "DOMContentLoaded"].forEach((type) => {
          const data = {
            kind: TraceKindEnum.performance,
            type: type,
            pageUrl: window.location.href,
            timestamp: new Date().getTime(),
            startTime: performance.now() - event.timeStamp,
          };
          // 上报数据
        });
      });
    },
    true,
  );
};
