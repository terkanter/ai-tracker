const config = require("@workspace/ui/tailwind.config");

module.exports = {
  ...config,
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
};
