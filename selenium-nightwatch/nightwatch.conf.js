module.exports = {
  src_folders: ['test.js'],

  test_settings: {
    default: {
      webdriver: {
        start_process: true,
// Let Nightwatch manage driver automatically via selenium-manager or geckodriver auto-download
        cli_args: [
          '--verbose',
          '--log-path=chromedriver.log'
        ],
      },
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: [
            '--headless',
            '--no-sandbox'
          ]
        }
      }
    }
  }
};