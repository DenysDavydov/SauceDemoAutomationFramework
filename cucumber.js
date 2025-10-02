export default {
  features: ["features/**/*.feature"],
  requireModule: ["ts-node/register"],
  require: ["dist/src/step-definitions/**/*.js"],
  publishQuiet: true,
  parallel: 1,
  format: ['html:cucumber-report.html']
};