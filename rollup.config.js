import ts from "rollup-plugin-typescript2";
import vue from "rollup-plugin-vue";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
// import commonjs from "rollup-plugin-commonjs";
import commonjs from "@rollup/plugin-commonjs";
// import autoNamedExports from "rollup-plugin-auto-named-exports";
import postcss from "rollup-plugin-postcss";
import pkg from "./package.json";

function createEntry(options) {
  const config = {
    input: "./src/index.ts",
    external: ["vue"],
    output: {
      name: "UiComponents",
      file: options.file,
      format: options.format,
      exports: "named",
      globals: {
        vue: "Vue",
      },
    },
    plugins: [
      vue({
        preprocessStyles: true,
      }),
      postcss(),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      ts({
        module: "esnext",
        check: options.format === "es",
        tsconfigOverride: {
          compilerOptions: {
            declaration: options.format === "es",
          },
        },
      }),
    ],
  };

  return config;
}

export default [
  createEntry({ format: "es", file: pkg.module }),
  createEntry({ format: "cjs", file: pkg.main }),
];
