import { createInstall, errorBoundary } from "./error/index";
import { setupHandle } from "./setupHandle";
import { InitOptions, PluginType, CreatePlugin } from "@mafirm-monitor/types";
import { setConfig } from "@mafirm-monitor/config";
import { subscribeEvent, initHandles } from "./subscribe";

// 初始化sdk配置项
export async function init(options: InitOptions) {
  console.log("初始化监控配置");
  if (!options.url) {
    return console.error("请配置上报地址: url");
  }
  // 初始化配置项
  setConfig(options);

  try {
    // 初始化错误监控函数
    setupHandle();
  } catch (error) {
    console.log(`初始化监控函数错误setupHandle ：${error}`);
  }
  // 订阅完所有的事件，初始化
  initHandles();
}

// vue插件注册
const install = createInstall((options: InitOptions) => init(options));

export function use(plugin: PluginType, options?: InitOptions) {
  console.log(`绑定插件； ${plugin.kind}`);
  if (!plugin.kind) return console.error("请配置插件类型:{kind: xxx,}");
  // 绑定事件到handles中
  subscribeEvent({
    kind: plugin.kind,
    type: plugin?.type,
    handler: () => plugin.handler(),
  });
}

export default {
  use, // 注册插件
  init,
  install, // vue错误监控
  errorBoundary, // react错误监控
};
