# Template for Selenium and Nightwatch

This repository serves as a boilerplate for reproducing ChromeDriver regressions
across platforms using Selenium WebDriver and Nightwatch.

The included GitHub Actions will automatically run the tests on every push and
pull request.

## Your Goal

To use this template, extend the test case in `test.js` with steps that 
demonstrate the issue you are investigating. Your aim should be to create
a reproducible, minimal test case.

## Overview

The test script (`test.js`) performs the following actions:

1.  **WebDriver Initialization**: Configures Nightwatch to use `chromedriver`.
2.  **Test Execution**:
    - The sample test navigates to `https://www.google.com`. You can modify this
      test to add your specific reproduction steps.

## For local testing

- Have the appropriate version of Node.js installed.
- Install the necessary dependencies:
  ```bash
  npm install
  ```
- To run the tests:
  ```bash
  npm test
  ```

## Customizing the Test

Open `test.js` and modify the provided test block to include the steps required to
reproduce your specific issue.

```javascript
it('ISSUE REPRODUCTION', async function (browser) {
  // Add test reproducing the issue here.
  await browser.url('https://example.com');
  // ... assertions and interactions
});
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
