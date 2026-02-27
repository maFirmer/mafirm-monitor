import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import json from "@rollup/plugin-json";
import { uglify } from "rollup-plugin-uglify";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

// 获取当前文件路径并构建 packages 目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packagesDir = path.resolve(__dirname, "packages");
const packageFiles = fs.readdirSync(packagesDir);

const outputConfig = (pkgPath) => {
  return [
    {
      input: `./packages/${pkgPath}/src/index.ts`, // 单入口应为字符串
      output: [
        {
          format: "umd",
          name: pkgPath,
          sourcemap: true,
          file: `./packages/${pkgPath}/dist/index.js`,
        },
        {
          format: "es",
          sourcemap: true,
          file: `./packages/${pkgPath}/dist/index.esm.js`,
        },
        {
          format: "cjs",
          sourcemap: true,
          file: `./packages/${pkgPath}/dist/index.cjs.js`,
        },
        // {
        //   format: "umd",
        //   name: pkgPath,
        //   sourcemap: true,
        //   file: `./packages/${pkgPath}/dist/index.min.js`,
        //   plugins: [uglify()],
        // },
      ],
      plugins: [
        typescript({
          // declaration: true,
          // declarationDir: "dist",
          // sourcemap: true,
        }),
        json(),
      ],
    },
    {
      input: `./packages/${pkgPath}/src/index.ts`,
      output: [
        { file: `./packages/${pkgPath}/dist/index.cjs.d.ts`, format: "cjs" },
        { file: `./packages/${pkgPath}/dist/index.esm.d.ts`, format: "esm" },
        { file: `./packages/${pkgPath}/dist/index.d.ts`, format: "umd" },
        // { file: `./packages/${pkgPath}/dist/index.min.d.ts`, format: "umd" },
      ],
      plugins: [dts()],
    },
  ];
};

export default packageFiles.flatMap((pkgPath) => outputConfig(pkgPath));