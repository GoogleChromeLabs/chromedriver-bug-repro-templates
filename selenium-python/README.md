# Template for Selenium and Python

This repository provides a template for reproducing any ChromeDriver bug.

The included GitHub Actions will automatically run the tests on every push and
pull request, on the following platforms:
 * [Ubuntu](.github/workflows/ubuntu-selenium-python.yml)

## Your Goal

To use this template, extend the test case `test_issue_reproduction` in
`test.py` with steps that demonstrate the issue you are
investigating. Your aim should be to create a reproducible, minimal test case. Update
the test name accordingly. 

## Overview

The test `test.py` performs the following actions:

1.  **Environment Setup**: Automatically downloads a specific version of Chrome
    (Stable by default) and the matching ChromeDriver binary.
2.  **Test Execution**:
    - The sample test navigates to `https://www.google.com`. You can modify this
      test to add your specific reproduction steps.

## For local testing

- Have Python and pip installed.
- Install dependencies and run the test:
    ```bash
    pip install -r requirements.txt
    python test.py
    ```

### Running the Test

1.  Install dependencies and run the test:
    ```bash
    pip install -r requirements.txt
    python test.py
    ```

## Customizing the Test

Open `test.py` and modify the `run_test` function to
include the steps required to reproduce your specific issue.

```python
def run_test(driver):
    # Add test reproducing the issue here.
    driver.get("https://example.com")
    # ... assertions and interactions
```

### Specifying Chrome Version

To test with a specific Chrome version (e.g., 'canary', '115', or '144.0.7534.0'), you can modify the `if __name__ == "__main__":` block in `test.py` to pass the desired version to the `main` function:

```python
if __name__ == "__main__":
    # Example to run with Chrome Canary
    main(browser_version='canary')
    # Example to run with Chrome version 115
    # main(browser_version='115')
    # For latest stable, call without argument:
    # main()
```

### Advanced Configuration

The `main` function in `test.py` accepts several arguments to customize the test execution:

- `browser_version`: Specify a Chrome version (e.g., `'canary'`, `'115'`).
- `headless`: Set to `False` to run the test with a visible browser UI. Defaults to `True`.
- `verbose`: Set to `False` to disable verbose logging from ChromeDriver. Defaults to `True`.
- `log_path`: Specify the path for the ChromeDriver log file. Defaults to `'chromedriver.log'`.

Example of a customized `main` call in the `if __name__ == "__main__":` block:
```python
if __name__ == "__main__":
    main(
        browser_version='stable',
        headless=False,
        verbose=True,
        log_path='chromedriver.log'
    )
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
