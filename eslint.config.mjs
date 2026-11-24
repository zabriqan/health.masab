import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  // The App Router root layout is the shared document head for the full site.
  { rules: { "@next/next/no-page-custom-font": "off" } },
];

export default eslintConfig;
