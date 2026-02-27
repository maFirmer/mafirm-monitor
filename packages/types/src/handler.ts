import { TraceKindEnum, TraceTypeEnum, ExtentionType } from "./index";
// 上报数据类型
export type SendReportData = (data: ReportDataType) => void;

export interface ReportDataType {
  kind?: TraceKindEnum;
  type?: TraceTypeEnum;
  data?: any[];
  [key: string]: any;
}
// 事件类型
// 插件类型
export type CreatePlugin = () => PluginType;

export interface PluginType {
  handler: Function;
  kind: TraceKindEnum;
  type?: TraceTypeEnum | undefined;
}

// 事件回调
export type HandlerOptionType = {
  callback: (data: any) => void;
  options?: any;
};
