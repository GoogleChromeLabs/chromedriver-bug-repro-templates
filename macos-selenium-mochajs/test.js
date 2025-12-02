/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { logger, setupBrowserVersion } = require('./helper.js');
const { Builder } = require('selenium-webdriver');
const { expect } = require('expect');
const chrome = require('selenium-webdriver/chrome');

describe('Selenium ChromeDriver', function () {
  let driver;
  let chromedriverBuild;
  let chromeBuild;

  before(async function () {
    // The chrome and chromedriver installation can take some time.
    // Increase timeout to 5 minutes to allow for installations to complete.
    this.timeout(5 * 60 * 1000);
    // By default, the test uses the latest Chrome version.
    // Replace the empty string with the specific Chromium version if needed,
    // e.g. setupBrowserVersion('144.0.7553.0').
    ({ chromeBuild, chromedriverBuild } = await setupBrowserVersion(''));
  });

  beforeEach(async function () {
    logger.debug(`Launching Chrome at ${chromeBuild.executablePath}`);

    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.setBinaryPath(chromeBuild.executablePath);

    const service = new chrome.ServiceBuilder(chromedriverBuild.executablePath)
      .loggingTo('chromedriver.log')
      .enableVerboseLogging();

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .setChromeService(service)
      .build();
  });

  afterEach(async function () {
    await driver.quit();
  });

  /**
   * This test is intended to verify the setup is correct.
   */
  it('should be able to navigate to google.com', async function () {
    await driver.get('https://www.google.com');
    const title = await driver.getTitle();
    expect(title).toBe('Google');
  });

  it('ISSUE REPRODUCTION', async function () {
    // Add test reproducing the issue here.
  });
});
