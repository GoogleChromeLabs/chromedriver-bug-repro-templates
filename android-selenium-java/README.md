# Template for Appium and Java on Android

This repository provides a template for reproducing ChromeDriver bugs on Android.

The included GitHub Actions will automatically run the tests on every push and
pull request, on the following platforms:
 * [Android Emulator](.github/workflows/appium-android-java.yml)

## Your Goal

To use this template, extend the test case `ISSUE_REPRODUCTION` in
`src/test/java/RegressionTest.java` with steps that demonstrate the issue you are
investigating. Your aim should be to create a reproducible, minimal test case. Update
the test name accordingly. 

## Overview

The test `src/test/java/RegressionTest.java` performs the following actions:

1.  **Environment Setup**: Automatically sets up an Android emulator and an Appium server.
2.  **Test Execution**: Instantiates an `AndroidDriver` to control Chrome on the emulator.
    - The sample test navigates to `https://www.google.com`. You can modify this
      test to add your specific reproduction steps.

## Local Testing

### Prerequisites

To run these tests locally, you need the following installed and configured:

1.  **Java Development Kit (JDK)**: Version 21 or higher.
2.  **Maven**: For building and running the project.
3.  **Node.js & NPM**: Required to run Appium.
4.  **Appium**: Install globally via:
    ```bash
    npm install -g appium
    ```
5.  **UiAutomator2 Driver**: Install via:
    ```bash
    appium driver install uiautomator2
    ```
6.  **Android SDK**: Ensure `ANDROID_HOME` is set and `platform-tools` are in your `PATH`.
7.  **Android Emulator or Physical Device**:
    *   The device must have **Chrome** installed.
    *   Verify connectivity with `adb devices`.

### Running the Tests

1.  **Start your Android device/emulator**.
2.  **Start the Appium server** in a separate terminal:
    ```bash
    appium --allow-insecure uiautomator2:chromedriver_autodownload
    ```
3.  **Run the Maven tests**:
    ```bash
    mvn test
    ```

## Customizing the Test

Open `src/test/java/RegressionTest.java` and modify the provided test block to
include the steps required to reproduce your specific issue. Rename the test
accordingly.

```java
@Test
public void ISSUE_REPRODUCTION() {
  // Add test reproducing the issue here.
  driver.get("https://example.com");
  // ... assertions and interactions
}
```

## Automating Triage with Gemini CLI

The Gemini CLI can be used to automate the bug triaging process using the template
defined in GEMINI.md.

### Prerequisits

For Google internal users, consult internal documentation for exact MCP servers
required to access issue reports.

### Execution

Run gemini cli and prompt
```
Triage chromedriver bug <BUG_ID>
```
