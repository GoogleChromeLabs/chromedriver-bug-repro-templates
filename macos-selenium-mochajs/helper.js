const path = require('path');
const winston = require('winston');
const {
  install,
  Browser,
  resolveBuildId,
  detectBrowserPlatform,
  ChromeReleaseChannel,
} = require('@puppeteer/browsers');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});

async function setupBrowserVersion(BROWSER_VERSION) {
  const resolvedBrowserVersion =
    BROWSER_VERSION ||
    (await resolveBuildId(
      Browser.CHROME,
      detectBrowserPlatform(),
      ChromeReleaseChannel.CANARY,
    ));

  const cacheDir = path.resolve(__dirname, '.cache');

  logger.debug(`Chrome version: ${resolvedBrowserVersion}`);

  chromeBuild = await install({
    browser: Browser.CHROME,
    buildId: resolvedBrowserVersion,
    cacheDir: cacheDir,
  });

  chromedriverBuild = await install({
    browser: Browser.CHROMEDRIVER,
    buildId: resolvedBrowserVersion,
    cacheDir: cacheDir,
  });

  logger.debug(`Chrome installed at: ${chromeBuild.executablePath}`);
  logger.debug(
    `ChromeDriver installed at: ${chromedriverBuild.executablePath}`,
  );

  return { chromeBuild, chromedriverBuild };
}

module.exports = {
  logger,
  setupBrowserVersion,
};
