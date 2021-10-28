import ts from "rollup-plugin-typescript2";
import vue from "rollup-plugin-vue";
// import css from "rollup-plugin-css-only";
import postcss from "rollup-plugin-postcss";
import pkg from "./package.json";

function createEntry(options) {
  const config = {
    input: "./src/components/Button/Button.vue",
    external: ["vue"],
    output: {
      name: "UiComponents",
      file: options.file,
      format: options.format,
      exports: "default",
      globals: {
        vue: "Vue",
      },
    },
    plugins: [
      ts({
        check: options.format === "es",
        tsconfigOverride: {
          compilerOptions: {
            declaration: options.format === "es",
          },
        },
      }),
      vue({
        preprocessStyles: true,
      }),
      postcss(),
    ],
  };

  return config;
}

export default [
  createEntry({ format: "es", file: pkg.module }),
  createEntry({ format: "cjs", file: pkg.main }),
];
