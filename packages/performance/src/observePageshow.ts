import {
  TraceKindEnum,
  TraceTypeEnum,
  SendReportData,
} from "@mafirm-monitor/types";
export const observePageshow = (callback: SendReportData) => {
  console.log("页面加载相关");
  window.addEventListener(
    "pageshow",
    (event) => {
      requestAnimationFrame(() => {
        ["load", "DOMContentLoaded"].forEach((type) => {
          const traceTypeKey = type.toUpperCase() as keyof typeof TraceTypeEnum;
          const monitorData = {
            kind: TraceKindEnum.PERFORMANCE,
            type: TraceTypeEnum[traceTypeKey],
            pageUrl: window.location.href,
            timestamp: new Date().getTime(),
            startTime: Date.now() - event.timeStamp,
          };
          // 上报数据
          callback(monitorData);
        });
      });
    },
    true,
  );
};
