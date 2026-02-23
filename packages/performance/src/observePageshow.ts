import { TraceTypeEnum, TraceKindEnum } from "@mafirm-monitor/types";
export const observePageshow = () => {
  window.addEventListener(
    "pageshow",
    (event) => {
      requestAnimationFrame(() => {
        ["load", "DOMContentLoaded"].forEach((type) => {
          const monitorData = {
            kind: TraceKindEnum.PERFORMANCE,
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
