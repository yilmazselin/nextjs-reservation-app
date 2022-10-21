const path = require("path");

module.exports = {
  i18n: {
    locales: ["default", "tr", "en"],
    defaultLocale: "tr",
    localeDetection: false,
    localePath: path.resolve("./public/locales"),
  },
};
