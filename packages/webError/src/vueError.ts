import { TraceKindEnum, TraceTypeEnum } from "@mafirm-monitor/types";
export default function install(app) {
  const vueErrorHandler = app.config.errorHandler;
  app.config.errorHandler = function (err, instance, info) {
    const monitorData = {
      kind: TraceKindEnum.ERROR,
      type: TraceTypeEnum.VUE,
      message: err.message,
      stack: err.stack,
      pageUrl: window.location.href,
      startTime: performance.now(),
    };
    // 数据上报
    vueErrorHandler.call(this, err, instance, info);
  };
}
