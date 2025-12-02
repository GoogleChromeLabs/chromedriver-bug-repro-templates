# Template for Selenium, MochaJS

This repository serves as a boilerplate for reproducing ChromeDriver regressions
across platforms using Selenium WebDriver and MochaJS.

Its primary purpose is to provide a standardized, isolated environment where you can
quickly set up and verify a specific ChromeDriver bug, making it easier to share and
debug.

## Your Goal

To use this template, you are expected to extend the `ISSUE REPRODUCTION` test case
in `test.js` with the precise steps that demonstrate the ChromeDriver regression you
are investigating. The aim is to create a reproducible test case that reliably fails
when the bug is present and passes when it's resolved.

## Overview

The test script (`test.js`) performs the following actions:

1.  **Environment Setup**: Automatically downloads a specific version of Chrome
    (Canary by default) and the matching ChromeDriver binary into a local `.cache`
    directory using `@puppeteer/browsers`.
2.  **WebDriver Initialization**: Configures Selenium to use the downloaded binaries
    explicitly, ensuring version compatibility.
3.  **Test Execution**:
    - Navigates to `https://www.google.com` to verify the setup.
    - Includes a placeholder test case (`ISSUE REPRODUCTION`) where you can add your
      specific reproduction steps.

## Prerequisites

- Node.js installed.

## Installation

Install the necessary dependencies:

```bash
npm install
```

## Running the Tests

To run the tests with the default configuration (latest Chrome Canary):

```bash
npm test
```

### Targeting a Specific Chrome Version

You can specify a particular version of Chrome/ChromeDriver using the
`BROWSER_VERSION` environment variable. This is useful for testing against a specific
build or regression testing.

```bash
# Example: Targeting a specific build ID
BROWSER_VERSION=144.0.7557.0 npm test
```

If `BROWSER_VERSION` is not provided, the script automatically resolves and downloads
the latest build from the Chrome Canary channel.

## Logging and Debugging

### Test Output Logs

The test runner uses `winston` for logging info about the setup process (e.g., binary
locations). You can control the verbosity using the `LOG_LEVEL` environment variable.

- **Standard Output:** `npm test`
- **Debug Output:** `LOG_LEVEL=debug npm test`

### ChromeDriver Logs

Verbose logging for ChromeDriver is enabled by default. Logs are captured and saved
to individual files within the **`logs/`** directory, with each filename timestamped
(e.g., `logs/chromedriver-2025-12-02T10:00:00.000Z.log`). This ensures that logs are
preserved across multiple test runs and are crucial for debugging WebDriver issues.

## Customizing the Test

Open `test.js` and modify the `ISSUE REPRODUCTION` test block to include the steps
required to reproduce your specific issue.

```javascript
it('ISSUE REPRODUCTION', async function () {
  // Add test reproducing the issue here.
  await driver.get('https://example.com');
  // ... assertions and interactions
});
```

## GitHub Actions

The included GitHub Actions workflow in
`.github/workflows/macos-selenium-mochajs.yml` will automatically run the tests on
every push and pull request.

## Automating Triage with Gemini CLI

The Gemini CLI can be used to automate the bug triaging process using the template defined in GEMINI.md.

### Prerequisits

Consult internal documentation for exact MCP servers required to access Buganizer.

### Execution

Run gemini cli and prompt
```
Triage chromedriver bug <BUG_ID>
```
