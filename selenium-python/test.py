import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager


@pytest.fixture
def driver():
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')

    service = ChromeService(
        ChromeDriverManager().install(),
        log_path='chromedriver.log',
        service_args=['--verbose']
    )

    driver = webdriver.Chrome(service=service, options=options)
    yield driver
    driver.quit()


def test_issue_reproduction(driver):
    """
    This test is a template for reproducing a ChromeDriver bug.
    
    Instructions:
    1. Update the test name to reflect the issue you are reproducing.
    2. Add the steps to reproduce the bug inside this test.
    3. Add assertions to check for the expected behavior.
    """
    driver.get("https://www.google.com")
    assert "Google" in driver.title