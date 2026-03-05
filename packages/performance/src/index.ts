import { observeFCP } from "./observeFCP";
import { observeResource } from "./observeResource";
import { observePageshow } from "./observePageshow";
import { observeLCP } from "./observeLCP";
import { observeFP } from "./observeFP";
import { TraceKindEnum, HandlerOptionType } from "@mafirm-monitor/types";

const performance = (handlerOption: HandlerOptionType) => {
  const { callback, options } = handlerOption;
  if (!options?.openPerformance)
    return console.info("性能监控未开启,请查看init中openPerformance不为false");
  [observeFCP, observeResource, observePageshow, observeLCP, observeFP].forEach(
    (handle) => {
      console.log("performance 插件安装成功");
      handle(callback);
    },
  );
};

//  为了统一错误监控传参格式相同
function createPlugin() {
  return {
    kind: TraceKindEnum.PERFORMANCE,
    handler: performance,
  };
}
export function createPerformance() {
  return {
    kind: TraceKindEnum.PERFORMANCE,
    handler: createPlugin,
  };
}
