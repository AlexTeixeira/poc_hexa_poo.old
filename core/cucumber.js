module.exports = {
    default: [
        "-r __acceptance_tests__/features/**/*.ts",
        "__acceptance_tests__/features/**/*.feature",
        "--require-module ts-node/register",
        "--publish-quiet",
        "format: ['html:cucumber-report.html']",
    ].join(" "),
};