module.exports = {
  src_folders: ['test.js'],

  test_settings: {
    default: {
      webdriver: {
        start_process: true,
        port: 9515, // Default ChromeDriver port
        server_path: require('chromedriver').path,
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