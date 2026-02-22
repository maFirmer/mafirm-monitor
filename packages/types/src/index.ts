export type BaseDataType = {
  kind: string;
  type: string;
  timestamp: number;
};

export type PaintPageType = BaseDataType & {
  name: string;
  entryType: string;
  startTime: number;
  duration: number;
  pageUrl: string;
};

/* eslint-disable no-unused-vars */
export enum TraceKindEnum {
  performance = "performance",
  exception = "exception",
  error = "error",
  behavior = "behavior",
}

export type PerformanceResourceType = BaseDataType & {
  /** 资源的名称或 URL */
  name: string;

  /** DNS 查询所花费的时间，单位为毫秒 */
  dns: number;

  /** 请求的总持续时间，从开始到结束，单位为毫秒 */
  duration: number;

  /** 请求使用的协议，如 HTTP 或 HTTPS */
  protocol: string;

  /** 重定向所花费的时间，单位为毫秒 */
  redirect: number;

  /** 资源的大小，单位为字节 */
  resourceSize: number;

  /** 响应体的大小，单位为字节 */
  responseBodySize: number;

  /** 响应头的大小，单位为字节 */
  responseHeaderSize: number;

  /** 资源类型，如 "script", "css" 等 */
  sourceType: string;

  /** 请求开始的时间，通常是一个高精度的时间戳 */
  startTime: number;

  /** TCP 握手时间，单位为毫秒 */
  tcp: number;

  /** 传输过程中实际传输的字节大小，单位为字节 */
  transferSize: number;

  /** 首字节时间 (Time to First Byte)，从请求开始到接收到第一个字节的时间，单位为毫秒 */
  ttfb: number;

  /** 页面路径" */
  pageUrl: string;
};

/* eslint-disable no-unused-vars */
export enum TraceTypeEnum {
  fetch = "fetch",
  load = "load",
  xhr = "xhr",
  stutter = "stutter",
  whiteScreen = "whiteScreen",
  js = "js",
  cors = "cors",
  resource = "resource",
  promise = "promise",
  react = "react",
  vue = "vue",
  routerChange = "routerChange",
  pv = "pv",
  fcp = "fcp",
  fp = "fp",
  lcp = "lcp",
  fmp = "fmp",
  tracker = "tracker",
}

/**
 * 网页的几种加载方式
 */
export const WebPageLoad: Record<number, string> = {
  0: "navigate", // 网页通过点击链接,地址栏输入,表单提交,脚本操作等方式加载
  1: "reload", // 网页通过“重新加载”按钮或者location.reload()方法加载
  2: "back_forward", // 网页通过“前进”或“后退”按钮加载
  255: "reserved", // 任何其他来源的加载
};
