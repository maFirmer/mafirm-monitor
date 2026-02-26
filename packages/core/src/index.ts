import { createInstall, errorBoundary } from "./error/index";
import { setupHandle } from "./setupHandle";
import { InitOptions, PluginType } from "@mafirm-monitor/types";
import { setConfig } from "@mafirm-monitor/config";
import { subscribeEvent, initHandles } from "./subscribe";

// 初始化sdk配置项
export async function init(options: InitOptions) {
  if (!options.url) {
    return console.error("请配置上报地址: url");
  }
  // 初始化配置项
  setConfig(options);

  try {
    // 初始化错误监控函数
    await setupHandle();
  } catch (error) {
    console.log(`初始化监控函数错误setupHandle ：${error}`);
  }
  // 订阅完所有的事件，初始化
  setTimeout(initHandles, 0);
}

// vue插件注册
const install = createInstall((options: InitOptions) => init(options));
export function use(plugin: PluginType, options?: InitOptions) {
  if (!plugin.kind) return console.error("请配置插件类型");
  // 绑定事件到handles中
  subscribeEvent(plugin);
}

export default {
  use, // 注册插件
  init,
  install, // vue错误监控
  errorBoundary, // react错误监控
};
