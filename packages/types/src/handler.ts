export type SendReportData = (data: any) => void;

export interface PluginType {
  handler: Function;
  kind: string;
  type?: string | undefined;
}

export type HandlerOptionType = {
  callback: (data: any) => void;
};
