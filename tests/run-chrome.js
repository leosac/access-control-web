const { executablePath } = require("puppeteer");
const { execFileSync } = require("child_process");

let exePath = executablePath();
let args = process.argv.slice(2);
execFileSync(exePath, args);