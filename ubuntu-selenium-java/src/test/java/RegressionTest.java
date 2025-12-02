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

import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.chrome.ChromeDriverService;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.http.ClientConfig;
import java.net.URL;
import java.time.Duration;
import java.util.HashMap;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class RegressionTest {

    @Test
    public void shouldBeAbleToNavigateAfterDeletingNetworkConditions() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--no-sandbox");

        // By default, the test uses the latest stable Chrome version.
        // Replace the "stable" with the specific browser version if needed,
        // e.g. 'canary', '115' or '144.0.7534.0' for example.
        options.setBrowserVersion("144.0.7534.0");

        ChromeDriverService service = new ChromeDriverService.Builder()
                .withLogFile(new java.io.File("chromedriver.log"))
                .withVerbose(true)
                .build();

        WebDriver driver = new ChromeDriver(service, options);

        try {
            // Navigate to a URL
            driver.get("https://www.google.com");

            // Assert that the navigation was successful
            assertEquals("Google", driver.getTitle());
        } finally {
            driver.quit();
        }
    }
}
