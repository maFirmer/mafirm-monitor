import {
  TraceTypeEnum,
  TraceKindEnum,
  HandlerOptionType,
} from "@mafirm-monitor/types";
import ErrorStackParser from "error-stack-parser";
const jsError = (handlerOption: HandlerOptionType) => {
  const { callback, options } = handlerOption;
  if (!options?.openError)
    return console.info("错误监控未开启,请查看init中openError不为false");
  // js 资源加载错误 src href
  window.addEventListener(
    "error",
    (event: ErrorEvent) => {
      const target = event.target as any;
      // js运行代码错误
      if (!target?.localName) {
        try {
          // const errorStack = ErrorStackParser.parse(new Error("boom"))[0];
          // const { fileName, columnNumber, lineNumber } = errorStack as any;

          const { filename, lineno, colno } = event;
          const monitorData = {
            kind: TraceKindEnum.ERROR,
            type: TraceTypeEnum.JS,
            time: Date.now(),
            message: event.message,
            fileName: filename,
            line: lineno,
            column: colno,
          };
          callback(monitorData);
        } catch (error) {
          console.log(error);
        }
      }
      // js资源加载错误 img script css
      if ((target.src || target.href) && target?.localName) {
        const url = target ? target.src : target.href;

        const monitorData = {
          kind: TraceKindEnum.ERROR,
          type: TraceTypeEnum.RESOURCE,
          url,
          html: target.outerHTML,
          pageUrl: window.location.href,
          // path: event.composedPath(),
        };
        callback(monitorData);
      }
    },
    true,
  );

  // js运行错误
  // window.onerror = (message, source, line, column, error) => {
  //   console.log(`js加载错误,jsError`);
  //   const monitorData = {
  //     kind: TraceKindEnum.ERROR,
  //     type: TraceTypeEnum.JS,
  //     message,
  //     source,
  //     line,
  //     column,
  //     error,
  //     stack: error?.stack,
  //     pageUrl: window.location.href,
  //     startTime: Date.now(),
  //   };
  //   callback(monitorData);
  // };
  // promise错误
  window.addEventListener(
    "unhandledrejection",
    (event) => {
      console.log(`promise加载错误,unhandledrejection `);

      const monitorData = {
        kind: TraceKindEnum.ERROR,
        type: TraceTypeEnum.PROMISE,
        reason: event.reason?.stack,
        pageUrl: window.location.href,
        startTime: event.timeStamp,
      };
      callback(monitorData);
    },
    true,
  );
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
// export function handlerUnhandledrejection() {
//   return {
//     kind: TraceKindEnum.ERROR,
//     type: TraceTypeEnum.PROMISE,
//     handler: unhandledrejection,
//   };
// }

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
