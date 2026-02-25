import { generateUID } from "@mafirm-monitor/utils";
import {
  HandlerOptionType,
  TraceKindEnum,
  TraceTypeEnum,
} from "@mafirm-monitor/types";
export function pv(handlerOption: HandlerOptionType) {
  const { callback } = handlerOption;
  const monitorData = {
    kind: TraceKindEnum.BEHAVIOR,
    type: TraceTypeEnum.PV,
    startTime: performance.now(),
    pageUrl: window.location.href,
    refferer: document.referrer,
    uuid: generateUID(),
  };
  callback(monitorData);
}
export function click(handlerOption: HandlerOptionType) {
  const { callback } = handlerOption;
  ["mousedown", "touchStart"].forEach((eventType) => {
    window.addEventListener(eventType, function (e: Event) {
      const target = e.target;
      const element = target as HTMLElement;
      // 用户点击之后统计
      if (element.tagName) {
        const monitorData = {
          kind: TraceKindEnum.BEHAVIOR,
          type: eventType,
          eventType,
          startTime: e.timeStamp,
          target: element.tagName,
          innerHTML: element.innerHTML,
          outerHtml: element.outerHTML,
          width: element.offsetWidth,
          height: element.offsetHeight,
          path: e.composedPath(),
        };
        callback(monitorData);
      }
    });
  });
}
export function routerChange(handlerOptionvv: HandlerOptionType) {
  const { callback } = handlerOptionvv;
  let oldUrl = ""; // hash
  let from = ""; // history

  // hash
  window.addEventListener(
    "hashchange",
    function (e) {
      const newUrl = window.location.href;
      const monitorData = {
        kind: TraceKindEnum.BEHAVIOR,
        type: TraceTypeEnum.ROUTERCHANGE,
        startTime: performance.now(),
        pageUrl: newUrl,
        refferer: oldUrl,
        uuid: generateUID(),
      };
      // 上报数据
      callback(monitorData);
      oldUrl = newUrl;
    },
    true,
  );
  // history
  window.addEventListener(
    "popstate",
    function (e) {
      const to = window.location.href;
      const monitorData = {
        kind: TraceKindEnum.BEHAVIOR,
        type: TraceTypeEnum.ROUTERCHANGE,
        startTime: performance.now(),
        from: from,
        to: to,
        refferer: oldUrl,
        uuid: generateUID(),
      };
      // 上报数据
      callback(monitorData);
      from = to;
    },
    true,
  );
}

export function handlerPv() {
  return {
    kind: TraceKindEnum.BEHAVIOR,
    type: TraceTypeEnum.PV,
    callback: handlerPv,
  };
}

export function handlerClick() {
  return {
    kind: TraceKindEnum.BEHAVIOR,
    callback: handlerClick,
  };
}

export function handlerRouter() {
  return {
    kind: TraceKindEnum.BEHAVIOR,
    type: TraceTypeEnum.ROUTERCHANGE,
    callback: handlerRouter,
  };
}
