import { TraceTypeEnum, TraceKindEnum } from "@mafirm-monitor/types";

// js运行错误
const jsError = () => {
  window.onerror = (message, source, line, column, error) => {
    const data = {
      kind: TraceKindEnum.ERROR,
      type: TraceTypeEnum.JS,
      message,
      source,
      line,
      column,
      error,
      stack: error?.stack,
      pageUrl: window.location.href,
    };
    console.log(message, source, line, column, error);
  };

  // promise错误
  window.addEventListener("unhandledrejection", (event) => {
    const data = {
      kind: TraceKindEnum.ERROR,
      type: TraceTypeEnum.PROMISE,
      message: event.reason,
      stack: event.reason?.stack,
      pageUrl: window.location.href,
    };
    console.log(event.reason);
  });
};
// cors跨域错误
// 资源加载错误

export const webError = () => {};
