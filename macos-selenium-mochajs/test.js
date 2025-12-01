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

const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');
const { install, Browser } = require('@puppeteer/browsers');

describe('DESCRIBE THE ISSUE', function() {
  let driver;

  before(async function() {
    const buildId = fs.readFileSync('.browser', 'utf8').trim();
    const cacheDir = path.resolve(__dirname, '.cache');

    console.log(`Installing Chrome and ChromeDriver version ${buildId}...`);

    const chromeBuild = await install({
      browser: Browser.CHROME,
      buildId: buildId,
      cacheDir: cacheDir
    });

    const chromedriverBuild = await install({
      browser: Browser.CHROMEDRIVER,
      buildId: buildId,
      cacheDir: cacheDir
    });

    console.log(`Chrome installed at: ${chromeBuild.executablePath}`);
    console.log(`ChromeDriver installed at: ${chromedriverBuild.executablePath}`);

    let options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.setBinaryPath(chromeBuild.executablePath);

    let service = new chrome.ServiceBuilder(chromedriverBuild.executablePath)
        .loggingTo('chromedriver.log')
        .enableVerboseLogging();

    driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .setChromeService(service)
        .build();
  });

  after(async function() {
    await driver.quit();
  });

  /**
  * This test is intended to verify the setup is correct.
  */
  it('should be able to navigate to google.com', async function() {
    await driver.get('https://www.google.com');
    const title = await driver.getTitle();
    expect(title).to.equal('Google');
  });

  // Add test reproducing the issue here.
});
