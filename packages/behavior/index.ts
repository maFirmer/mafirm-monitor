import { generateUID } from "@mafirm-monitor/utils";
import { TraceKindEnum, TraceTypeEnum } from "@mafirm-monitor/types";
export function pv() {
  const monitorData = {
    kind: TraceKindEnum.BEHAVIOR,
    type: TraceTypeEnum.PV,
    startTime: performance.now(),
    pageUrl: window.location.href,
    refferer: document.referrer,
    uuid: generateUID(),
  };
}
export function behaviorClick() {
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
      }
    });
  });
}
export function routerChange() {
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
      from = to;
    },
    true,
  );
}

export default function behavior() {
  pv();
  behaviorClick();
  routerChange();
}
