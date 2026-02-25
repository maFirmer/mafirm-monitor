import { observeFCP } from "./observeFCP";
import { observeResource } from "./observeResource";
import { observePageshow } from "./observePageshow";
import { observeLCP } from "./observeLCP";
import { observeFP } from "./observeFP";
import {
  SendReportData,
  InitOptions,
  TraceKindEnum,
} from "@mafirm-monitor/types";

const performance = (callbackParams: {
  callback: SendReportData;
  options: InitOptions;
}) => {
  const { callback, options } = callbackParams;

  [observeFCP, observeResource, observePageshow, observeLCP, observeFP].forEach(
    (handle) => {
      handle(callback);
    },
  );
};
export function createPerformance() {
  return {
    kind: TraceKindEnum.PERFORMANCE,
    handler: performance,
  };
}
