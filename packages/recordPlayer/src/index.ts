import { record } from "@rrweb/record";
import { eventWithTime } from "@rrweb/types";
import { Replayer } from "@rrweb/replay";
import { TraceKindEnum } from "@mafirm-monitor/types";
import "@rrweb/replay/dist/style.css";

let stopRecord: undefined | (() => void);
const behaviorEvents: eventWithTime[] = [];
const handleRecordPlay = () => {
  const handleStartRecord = () => {
    stopRecord = record({
      emit: (event: eventWithTime) => {
        behaviorEvents.push(event);
      },
    });
  };

  const handleStopRecord = () => {
    if (!stopRecord) return;
    stopRecord();
  };

  const handleRePlayer = () => {
    if (!behaviorEvents.length) return;
    let replayerRoot = document.querySelector("#mafirm-replay-root");
    const replayer = new Replayer(behaviorEvents, {
      root: replayerRoot ?? document.body,
    });
    replayer.play();
  };

  return {
    recordStart: handleStartRecord,
    recordStop: handleStopRecord,
    recordPlay: handleRePlayer,
  };
};

//  为了统一错误监控传参格式相同
function createPlugin() {
  return {
    kind: TraceKindEnum.RECORD,
    handler: handleRecordPlay,
  };
}
export function createPerformance() {
  return {
    kind: TraceKindEnum.RECORD,
    handler: createPlugin,
  };
}
