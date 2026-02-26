import fs from "fs";
import path from "path";
import json from "@rollup/plugin-json";
import { uglify } from "rollup-plugin-uglify";
import typescript from "@rollup/plugin-typescript";
const packagesDir = path.resolve(__dirname, "packages");
const packageFiles = fs.readdirSync(packagesDir);
const plugin = [];

const outputConfig = (path: string) => {
  return [
    {
      input: [`./packages/${path}/src/index.ts`],
      output: [
        {
          format: "umd",
          name: "mafirm-monitor",
          sourcemap: true,
          file: `./packages/${path}/dist/index.js`,
        },
        {
          format: "es",
          sourcemap: true,
          file: `./packages/${path}/dist/index.esm.js`,
        },
        {
          format: "cjs",
          sourcemap: true,
          file: `./packages/${path}/dist/index.cjs.js`,
        },
        {
          format: "umd",
          name: "mafirm-monitor",
          sourcemap: true,
          file: `./packages/${path}/dist/index.min.js`,
          plugins: [uglify()],
        },
      ],
      plugins: [
        typescript({
          declaration: true,
          declarationDir: "dist", // 指定声明文件目录
        }),
        ,
        json(),
      ],
    },
  ];
};

export default [...packageFiles.map((path: string) => outputConfig(path))];
