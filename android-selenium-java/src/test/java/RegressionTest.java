/*
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

import static org.junit.jupiter.api.Assertions.assertEquals;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.options.UiAutomator2Options;
import java.net.MalformedURLException;
import java.net.URL;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class RegressionTest {

  private AndroidDriver driver;

  @BeforeEach
  public void setUp() throws MalformedURLException {
    // Configure UiAutomator2Options for Appium to automate Chrome on an Android emulator
    UiAutomator2Options options = new UiAutomator2Options()
        .setPlatformName("Android")
        .setDeviceName("Android Emulator")
        .setAutomationName("UiAutomator2")
        .withBrowserName("Chrome")
        .setNoReset(true)
        .setUiautomator2ServerInstallTimeout(java.time.Duration.ofMillis(60000));

    // Initialize AndroidDriver, connecting to the Appium server (usually http://127.0.0.1:4723)
    driver = new AndroidDriver(new URL("http://127.0.0.1:4723"), options);
    driver.manage().timeouts().pageLoadTimeout(java.time.Duration.ofSeconds(60));
    driver.manage().timeouts().implicitlyWait(java.time.Duration.ofSeconds(30));
  }

  @AfterEach
  public void tearDown() {
    if (driver != null) {
      driver.quit();
    }
  }

  @Test
  public void verifySetup_shouldBeAbleToNavigateToGoogleCom() {
    // Navigate to a URL
    driver.get("https://www.google.com");
    // Assert that the navigation was successful
    assertEquals("Google", driver.getTitle());
  }

  @Test
  public void ISSUE_REPRODUCTION() {
    // Add test reproducing the issue here.
  }
}
