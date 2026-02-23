export * from "./cache";
export function generateUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function hasSendBeacon() {
  return "sendBeacon" in navigator;
}

/**
 * 深拷贝函数，支持对象、数组、日期、正则表达式以及循环引用
 * @param data 需要克隆的数据
 * @returns 克隆后的新数据
 */
export function deepClone<T>(data: T): T {
  // 使用 WeakMap 缓存已克隆的对象，避免循环引用导致栈溢出
  const clonedCache = new WeakMap<object, any>();

  /**
   * 递归克隆函数
   * @param target 当前需要克隆的目标
   * @returns 克隆后的新对象
   */
  function clone(target: any): any {
    // 处理基本类型和 null
    if (target === null || typeof target !== "object") {
      return target;
    }
    // 如果已经克隆过该对象，直接返回缓存结果
    if (clonedCache.has(target)) {
      return clonedCache.get(target);
    }
    // 处理日期对象
    if (target instanceof Date) {
      return new Date(target);
    }

    // 处理正则表达式对象
    if (target instanceof RegExp) {
      return new RegExp(target);
    }

    // 处理数组
    if (Array.isArray(target)) {
      const clonedArray: any[] = [];
      clonedCache.set(target, clonedArray); // 缓存数组
      for (let i = 0; i < target.length; i++) {
        clonedArray[i] = clone(target[i]); // 递归克隆元素
      }
      return clonedArray;
    }

    // 处理普通对象
    const clonedObject: Record<string, any> = {};
    clonedCache.set(target, clonedObject); // 缓存对象
    for (const key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        clonedObject[key] = clone(target[key]); // 递归克隆属性
      }
    }
    return clonedObject;
  }

  return clone(data);
}
