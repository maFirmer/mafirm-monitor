import { PluginType } from "@mafirm-monitor/types";
import { sendReportData } from "./sendReportData";

const handles: { [key in string]: PluginType[] } = {};

export function subscribeEvent(plugin: PluginType) {
  const { kind, type, handler } = plugin;
  if (!kind || !handler) {
    return console.info(
      `请填写订阅事件类型和回调函数，如：subscribeEvent('error', ()=>{})`,
    );
  }
  handles[kind] = handles[kind] || [];
  handles[kind].push(handler());
}

export function notify(kind: string, data?: any) {
  if (!handles[kind] || !kind) return;
  handles[kind].forEach((handle) => {
    const handler = handle.handler();
    handler?.callback(data);
  });
}

export function initHandles() {
  console.log("初始化事件函数");
  if (!handles) return;
  const keys = Object.keys(handles);
  keys.forEach((key) => {
    handles[key]!.forEach((handle) => {
      handle.handler({ callback: sendReportData });
    });
  });
}
