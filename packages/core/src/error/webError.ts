import {
  TraceTypeEnum,
  TraceKindEnum,
  HandlerOptionType,
} from "@mafirm-monitor/types";

const jsError = (handlerOption: HandlerOptionType) => {
  const { callback } = handlerOption;
  // js 资源加载错误 src href
  window.addEventListener(
    "error",
    (event) => {
      console.log(`js加载错误,jsResourceError`);
      const target = event.target;
      if (!target) return;

      if (
        ((target instanceof HTMLScriptElement ||
          target instanceof HTMLImageElement) &&
          target.src) ||
        (target instanceof HTMLLinkElement && target.href)
      ) {
        const url =
          target instanceof HTMLScriptElement ||
          target instanceof HTMLImageElement
            ? target.src
            : target.href;

        const monitorData = {
          kind: TraceKindEnum.ERROR,
          type: TraceTypeEnum.RESOURCE,
          url,
          html: target.outerHTML,
          pageUrl: window.location.href,
          // path: event.composedPath(),
        };
        console.log(monitorData);
        callback(monitorData);
      }
    },
    true,
  );

  // js运行错误
  window.onerror = (message, source, line, column, error) => {
    console.log(`js加载错误,jsError`);

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
      startTime: Date.now(),
    };
    callback(monitorData);
  };
};
// promise错误
const unhandledrejection = (handlerOption: HandlerOptionType) => {
  const { callback } = handlerOption;
  window.addEventListener("unhandledrejection", (event) => {
    console.log(`promise加载错误,unhandledrejection `);

    const monitorData = {
      kind: TraceKindEnum.ERROR,
      type: TraceTypeEnum.PROMISE,
      reason: event.reason?.stack,
      pageUrl: window.location.href,
      startTime: event.timeStamp,
    };
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
