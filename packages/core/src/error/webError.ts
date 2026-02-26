import {
  TraceTypeEnum,
  TraceKindEnum,
  HandlerOptionType,
} from "@mafirm-monitor/types";

const jsError = (handlerOption: HandlerOptionType) => {
  const { callback } = handlerOption;
  window.onerror = (message, source, line, column, error) => {
    console.log(`js加载错误, error:${error}`);

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
    callback(monitorData);
    console.log(message, source, line, column, error);
  };
};
// promise错误
const unhandledrejection = (handlerOption: HandlerOptionType) => {
  const { callback } = handlerOption;
  window.addEventListener("unhandledrejection", (event) => {
    console.log(`promise加载错误,event:${event} `);

    const monitorData = {
      kind: TraceKindEnum.ERROR,
      type: TraceTypeEnum.PROMISE,
      reason: event.reason?.stack,
      pageUrl: window.location.href,
      startTime: event.timeStamp,
    };
    console.log(event.reason);
    callback(monitorData);
  });
};

const corsError = () => {};

//  js错误
export function handlerJsError() {
  return {
    kind: TraceKindEnum.ERROR,
    type: TraceTypeEnum.JS,
    handler: jsError,
  };
}

// promise错误
export function handlerUnhandledrejection() {
  return {
    kind: TraceKindEnum.ERROR,
    type: TraceTypeEnum.PROMISE,
    handler: unhandledrejection,
  };
}

export function handlerCorsError() {
  return {
    kind: TraceKindEnum.ERROR,
    type: TraceTypeEnum.CORE,
    handler: corsError,
  };
}

// const webJsError = () => {
//   jsError();
//   corsError();
//   jsResourceError();
// };
