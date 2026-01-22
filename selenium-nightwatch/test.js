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

describe('Selenium ChromeDriver', function () {
  /**
   * This test is intended to verify the setup is correct.
   */
  it('should be able to navigate to google.com', async function (browser) {
    await browser.url('https://www.google.com');
    await browser.assert.titleEquals('Google');
  });

  it('ISSUE REPRODUCTION', async function (browser) {
    // Add test reproducing the issue here.
  });
});