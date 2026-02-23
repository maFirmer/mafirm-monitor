import { deepClone } from "./index";

const reportCache: any[] = [];
export function getReportCache() {
  return deepClone(reportCache);
}

export function addReportCache(data) {
  reportCache.push(data);
}

export function clearReportCache() {
  reportCache.length = 0;
}
