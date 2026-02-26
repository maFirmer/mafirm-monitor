import {
  TraceKindEnum,
  TraceTypeEnum,
  HandlerOptionType,
} from "@mafirm-monitor/types";

const originalXhrProto = XMLHttpRequest.prototype;
const originalOpen = originalXhrProto.open;
const originalSend = originalXhrProto.send;

interface CustomXMLHttpRequest extends XMLHttpRequest {
  url?: string;
  method?: string;
  startTime?: number;
  endTime?: number;
  duration?: number;
}
function overwriteXhr(handlerOption: HandlerOptionType) {
  const { callback } = handlerOption;
  // 重写 open 方法
  (originalXhrProto as CustomXMLHttpRequest).open = function (
    method: string,
    url: string | URL,
    async?: boolean,
    username?: string | null,
    password?: string | null,
  ) {
    this.url = typeof url === "string" ? url : url.toString();
    this.method = method;
    return originalOpen.apply(this, [
      method,
      url,
      async ?? true,
      username,
      password,
    ]);
  };
  // 重写 send 方法
  (originalXhrProto as CustomXMLHttpRequest).send = function (...args) {
    this.startTime = Date.now();
    const onloaded = () => {
      this.endTime = Date.now();
      this.duration = (this.endTime ?? 0) - (this.startTime ?? 0);

      const monitorData = {
        kind: TraceKindEnum.PERFORMANCE,
        type: TraceTypeEnum.XHR,
        pageUrl: window.location.href,
        startTime: this.startTime,
        duration: this.duration,
        url: this.url,
        method: this.method,
        status: this.status,
        timestamp: new Date().getTime(),
      };
      callback(monitorData);
      this.removeEventListener("loaded", onloaded, true);
    };

    this.addEventListener("loaded", onloaded, true);
    return originalSend.apply(this, args);
  };
}

export function handlerXhr() {
  return {
    kind: TraceKindEnum.PERFORMANCE,
    type: TraceTypeEnum.XHR,
    handler: overwriteXhr,
  };
}
