module.exports = {
  "framework": "qunit",
  "test_page": "tests/index.html?hidepassed",
  "disable_watching": true,
  "launch_in_ci": [
    "LocalChrome"
  ],
  "launch_in_dev": [
    "LocalChrome",
    "Chrome"
  ],
  "launchers": {
    "LocalChrome": {
      "exe": "node",
      "args": [
        'tests/run-chrome.js',
        '--disable-gpu',
        '--headless',
        '--remote-debugging-port=9222',
        '--window-size=1440,900'
      ],
      "protocol": "browser"
    },
  }
};
