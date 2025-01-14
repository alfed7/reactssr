import pkg from "./package.json" with { type: "json" };

import { babel } from "@rollup/plugin-babel";
//import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const production = !process.env.ROLLUP_WATCH;
process.env.NODE_ENV = production ? 'production' : '';
const extensions = [".js", ".jsx", ".ts", ".tsx"];
const external = [
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.dependencies || {}),
  "@babel/runtime",
  "react/jsx-runtime",
  "react-router-dom/server",
  "react-dom/server"
];

const pathsToWatch =[ 'src/**' ];

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        exports: "named",
        sourcemap: !production,
      },
      {
        file: pkg.module,
        format: "es",
        exports: "named",
        sourcemap: !production,
      },
    ],
    external,
    plugins: [
      // typescript({
      //   exclude: ["**/*.test.ts?(x)"],
      //   sourceMap: !production, inlineSources: !production
      // }),
      resolve({
        extensions,
      }),
      commonjs(),
      babel({
        exclude: /^(.+\/)?node_modules\/.+$/,
        extensions,
        babelHelpers: "runtime",
        sourcemap: !production,
      }),
      production && terser(),
    ],
    watch: {
      paths: pathsToWatch
    }
  }
];
