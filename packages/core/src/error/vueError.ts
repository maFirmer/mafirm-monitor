import {
  InitOptions,
  TraceKindEnum,
  TraceTypeEnum,
  VueInstance,
} from "@mafirm-monitor/types";
export function createInstall(callback: (options: InitOptions) => void) {
  return function install(app: VueInstance, options: InitOptions) {
    const vueErrorHandler = app.config.errorHandler;
    app.config.errorHandler = function (err: Error, instance: any, info: any) {
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
    callback(options);
  };
}

export default createInstall;
