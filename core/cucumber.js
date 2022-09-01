module.exports = {
    default: [
        "--require-module ts-node/register",
        "--require __acceptance_tests__/hooks/**/*.ts",
        "-r __acceptance_tests__/features/**/*.ts",
        "__acceptance_tests__/features/**/*.feature",
        "--publish-quiet",
        "format: ['html:cucumber-report.html']",
    ].join(" "),
};