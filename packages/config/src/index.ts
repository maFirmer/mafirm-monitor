interface Config {
  appId: string;
  appName: string;
  appVersion: string;
  url: string;
  openImgUpload: boolean; // 开启图片上传
  maxReportUploadSize: number; // 批量上传阈值
  openBehavior: boolean;
  openError: boolean;
  openPerformance: boolean;
  openRecord: boolean;
}

const config: Config = {
  appId: "",
  appName: "",
  appVersion: "",
  url: "xxxx-xxx-xxx",
  openImgUpload: false,
  maxReportUploadSize: 10, // 默认上传数据 > 10 条 才会上传服务器
  openBehavior: true, // 启用用户行为监控
  openError: true, // 启用错误监控
  openPerformance: true,
  openRecord: false,
};

const setConfig = (options: Partial<Config>) => {
  Object.assign(config, options);
};

export { config, setConfig };
