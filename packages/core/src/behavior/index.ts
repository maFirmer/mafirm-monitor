import { generateUID } from "@mafirm-monitor/utils";
import {
  HandlerOptionType,
  TraceKindEnum,
  TraceTypeEnum,
} from "@mafirm-monitor/types";
export function pv(handlerOption: HandlerOptionType) {
  const { callback, options } = handlerOption;
  if (!options?.openError)
    return console.info("用户行为监控未开启,请查看init中openBehavior不为false");
  const monitorData = {
    kind: TraceKindEnum.BEHAVIOR,
    type: TraceTypeEnum.PV,
    startTime: Date.now(),
    pageUrl: window.location.href,
    refferer: document.referrer,
    uuid: generateUID(),
  };
  callback(monitorData);
}
export function click(handlerOption: HandlerOptionType) {
  const { callback, options } = handlerOption;
  if (!options?.openError)
    return console.info("用户行为监控未开启,请查看init中openBehavior不为false");
  ["mousedown", "touchStart"].forEach((eventType) => {
    window.addEventListener(
      eventType,
      function (e: Event) {
        const target = e.target;
        const element = target as HTMLElement;
        // 用户点击之后统计
        if (element.tagName) {
          const monitorData = {
            kind: TraceKindEnum.BEHAVIOR,
            type: TraceTypeEnum.CLICK,
            eventType,
            startTime: e.timeStamp,
            target: element.tagName,
            innerHTML: element.innerHTML,
            outerHtml: element.outerHTML,
            width: element.offsetWidth,
            height: element.offsetHeight,
            // path: e.composedPath(),
          };
          callback(monitorData);
        }
      },
      true,
    );
  });
}
export function routerChange(handlerOption: HandlerOptionType) {
  const { callback, options } = handlerOption;
  if (!options?.openError)
    return console.info("用户行为监控未开启,请查看init中openBehavior不为false");
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
        startTime: Date.now(),
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
        startTime: Date.now(),
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
    handler: pv,
  };
}

export function handlerClick() {
  return {
    kind: TraceKindEnum.BEHAVIOR,
    handler: click,
  };
}

export function handlerRouter() {
  return {
    kind: TraceKindEnum.BEHAVIOR,
    type: TraceTypeEnum.ROUTERCHANGE,
    handler: routerChange,
  };
}
