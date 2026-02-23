import { TraceTypeEnum, TraceKindEnum } from "@mafirm-monitor/types";

// js运行错误
const jsError = () => {
  //
  window.onerror = (message, source, line, column, error) => {
    const monitorData = {
      kind: TraceKindEnum.ERROR,
      type: TraceTypeEnum.JS,
      message,
      source,
      line,
      column,
      error,
      stack: error?.stack,
      pageUrl: window.location.href,
      startTime: performance.now(),
    };
    console.log(message, source, line, column, error);
  };

  // promise错误
  window.addEventListener("unhandledrejection", (event) => {
    const monitorData = {
      kind: TraceKindEnum.ERROR,
      type: TraceTypeEnum.PROMISE,
      reason: event.reason?.stack,
      pageUrl: window.location.href,
      startTime: event.timeStamp,
    };
    console.log(event.reason);
  });
};
// cors跨域错误
const corsError = () => {};
// 资源加载错误
const jsResourceError = () => {
  window.addEventListener("error", (event) => {
    const target = event.target as HTMLElement;
    if (!target) return;

    const url =
      (target as HTMLScriptElement | HTMLImageElement).src ||
      (target as HTMLLinkElement).href;

    if (url) {
      const monitorData = {
        kind: TraceKindEnum.ERROR,
        type: TraceTypeEnum.RESOURCE,
        url,
        html: target.outerHTML,
        pageUrl: window.location.href,
        paths: event.composedPath(), // 替代event.path
      };
      // 上报数据
    }
  });
};

const webError = () => {
  jsError();
  corsError();
  jsResourceError();
};

export default webError;
export { webError };
