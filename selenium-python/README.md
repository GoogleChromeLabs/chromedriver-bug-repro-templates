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
    python3 -m pip install -r requirements.txt
    python3 -m pytest
    ```

### Running the Test

1.  Install dependencies and run the test:
    ```bash
    python3 -m pip install -r requirements.txt
    python3 -m pytest
    ```

## Customizing the Test

Open `test.py` and modify the `test_issue_reproduction` function to
include the steps required to reproduce your specific issue.

```python
def test_issue_reproduction(driver):
    # Add test reproducing the issue here.
    driver.get("https://example.com")
    # ... assertions and interactions
```

### Advanced Configuration

To customize the test execution (e.g., run with a visible browser UI, change the Chrome version), you can modify the `driver` fixture in `test.py`.

Example of a customized `driver` fixture:
```python
@pytest.fixture
def driver():
    options = webdriver.ChromeOptions()
    # options.add_argument('--headless') # Run with UI
    options.add_argument('--no-sandbox')

    service = ChromeService(
        ChromeDriverManager(version='115').install(), # Pin Chrome version
        log_path='chromedriver.log',
        # service_args=['--verbose'] # Disable verbose logging
    )

    driver = webdriver.Chrome(service=service, options=options)
    yield driver
    driver.quit()
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
