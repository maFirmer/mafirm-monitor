import {
  HandlerOptionType,
  TraceKindEnum,
  TraceTypeEnum,
} from "@mafirm-monitor/types";

const orginalFetch = window.fetch;

function overwriteFetch(handlerOption: HandlerOptionType) {
  const { callback } = handlerOption;
  window.fetch = function (url: any, config?: RequestInit): Promise<Response> {
    const startTime = Date.now();
    const monitorData = {
      kind: TraceKindEnum.PERFORMANCE,
      type: TraceTypeEnum.FETCH,
      url,
      method: config?.method,
      startTime,
    };
    return orginalFetch(url, config)
      .then((res) => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        Object.assign(monitorData, {
          endTime,
          duration,
          status: res.status,
          success: res.ok,
        });
        callback(monitorData);

        return res;
      })
      .catch((err) => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        Object.assign(monitorData, {
          endTime,
          duration,
          status: 0,
          success: false,
        });
        callback(monitorData);
        throw err;
      });
  };
}

export function handlerFetch() {
  return {
    kind: TraceKindEnum.PERFORMANCE,
    type: TraceTypeEnum.FETCH,
    handler: overwriteFetch,
  };
}
