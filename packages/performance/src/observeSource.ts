import {
  TraceTypeEnum,
  TraceKindEnum,
  PerformanceResourceType,
} from "@mafirm-monitor/types";

// 页面加载完成触发监控
export const observeDOMLoad = () => {
  if (document.readyState === "complete") {
    observeResource();
  } else {
    const onload = () => {
      observeResource();
      window.addEventListener("load", onload, true);
    };
    window.removeEventListener("load", onload, true);
  }
};
export const observeResource = () => {
  const observer = new PerformanceObserver((list) => {
    const dataList: PerformanceResourceType[] = [];
    const entries = list.getEntries();
    entries.forEach((entry, index) => {
      const entryData = entry.toJSON();
      const data: PerformanceResourceType = {
        kind: TraceKindEnum.performance,
        type: entryData.entryType, // 类型
        name: entryData.name, // 资源的名字
        sourceType: entryData.initiatorType, // 资源类型
        duration: entryData.duration, // 加载时间
        dns: entryData.domainLookupEnd - entryData.domainLookupStart, // dns解析时间
        tcp: entryData.connectEnd - entryData.connectStart, // tcp连接时间
        redirect: entryData.redirectEnd - entryData.redirectStart, // 重定向时间
        ttfb: entryData.responseStart, // 首字节时间
        protocol: entryData.nextHopProtocol, // 请求协议
        responseBodySize: entryData.encodedBodySize, // 响应内容大小
        responseHeaderSize: entryData.transferSize - entryData.encodedBodySize, // 响应头部大小
        transferSize: entryData.transferSize, // 请求内容大小
        resourceSize: entryData.decodedBodySize, // 资源解压后的大小
        startTime: entryData.startTime, // 资源开始加载的时间
        pageUrl: window.location.href, // 页面地址
        timestamp: new Date().getTime(),
      };
      dataList.push(data);

      // 加载到最后一项 发送数据
      if (index === entries.length - 1) {
        const data = {
          kind: TraceKindEnum.performance,
          type: TraceTypeEnum.resource,
          data: dataList,
          timestamp: new Date().getTime(),
        };
        // 上报数据
      }
    });
  });

  observer.observe({ type: "resource", buffered: true });
};
