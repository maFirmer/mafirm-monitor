import { TraceKindEnum, TraceTypeEnum } from "@mafirm-monitor/types";

const orginalFetch = window.fetch;

function overwriteFetch() {
  window.fetch = function (url: any, config?: RequestInit): Promise<Response> {
    const startTime = Date.now();

    const monitorData = {
      kind: TraceKindEnum.PERFORMANCE,
      type: TraceTypeEnum.FETCH,
      url,
      method: config?.method,
      startTime,
      endTime: undefined as number | undefined,
      duration: undefined as number | undefined,
      status: undefined as number | undefined,
      success: undefined as boolean | undefined,
    };
    return orginalFetch(url, config)
      .then((res) => {
        const endTime = Date.now();
        monitorData.endTime = endTime;
        monitorData.duration = endTime - startTime;
        monitorData.status = res.status;
        monitorData.success = res.ok;
        return res;
      })
      .catch((err) => {
        const endTime = Date.now();
        monitorData.endTime = endTime;
        monitorData.duration = endTime - startTime;
        monitorData.status = 0;
        monitorData.success = false;
        throw err;
      });
  };
}

function fetch() {
  overwriteFetch();
}
export default fetch;
