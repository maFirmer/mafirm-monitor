import {
  handlerXhr,
  handlerFetch,
  handlerJsError,
  handlerUnhandledrejection,
} from "./error/index";
import { handlerPv, handlerClick, handlerRouter } from "./behavior/index";
import { subscribeEvent, initHandles } from "./subscribe";
import { TraceKindEnum, TraceTypeEnum } from "@mafirm-monitor/types";
import { sendReportData } from "./sendReportData";

// 初始化js错误集合 、用户行为集合
// const baseHandles =
export function setupHandle() {
  console.log("初始化事件绑定");

  // xhr
  subscribeEvent({
    kind: TraceKindEnum.PERFORMANCE,
    handler: () => handlerXhr(),
  });
  // fetch
  subscribeEvent({
    kind: TraceKindEnum.PERFORMANCE,
    handler: () => handlerFetch(),
  });
  // js运行错误
  subscribeEvent({
    kind: TraceKindEnum.ERROR,
    handler: () => handlerJsError(),
  });
  // promise错误
  subscribeEvent({
    kind: TraceKindEnum.ERROR,
    handler: () => handlerUnhandledrejection(),
  });
  // 用户行为
  subscribeEvent({
    kind: TraceKindEnum.BEHAVIOR,
    handler: () => handlerPv(),
  });

  subscribeEvent({
    kind: TraceKindEnum.BEHAVIOR,
    handler: () => handlerClick(),
  });
  subscribeEvent({
    kind: TraceKindEnum.BEHAVIOR,
    handler: () => handlerRouter(), // {kind type handler:funtion }
  });
}
