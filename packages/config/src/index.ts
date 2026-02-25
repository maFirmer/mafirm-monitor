interface Config {
  appId: string;
  appName: string;
  appVersion: string;
  url: string;
  openImgUpload: boolean; // 开启图片上传
  maxReportUploadSize: number; // 批量上传阈值
}

const config: Config = {
  appId: "",
  appName: "",
  appVersion: "",
  url: "xxxx-xxx-xxx",
  openImgUpload: false,
  maxReportUploadSize: 10, // 默认上传数据 > 10 条 才会上传服务器
};

const setConfig = (options: Partial<Config>) => {
  Object.assign(config, options);
};

export { config, setConfig };
