This is a doc that will explain how to launch and edit test using Snaptest, Nightwatch and Selenium.

[Snaptest](https://www.snaptest.io)  
[Nightwatch](http://nightwatchjs.org)  
[Selenium](http://www.seleniumhq.org)


Basically, Snaptest is a software that will help us creating test.  
1. It can catch the action made on a web page, save and export them using the Google Chrome extension 
2. It can run the test through a terminal, if you have the required software and test(obviously).


A. Catch an action, translate it to test, save and export them

First, you will need to add the Snaptest extension to chrome. Link to the extension: 
[Extension](https://chrome.google.com/webstore/detail/snaptest/aeofjocnhdlleichkjbaibdbicpcddhp)  
You will then need to login in the extension. (There is an admin account, usable by the Maintainer of the Leosac Web UI).  
Once you are logged, there is an interface with all the previously recorded test.

To record a test, this is very simple: 
1. Open the Snaptest extension when you are on the page that you want to test
2. Press the record button on the little toolbox that should have appeared : ![Record button](snaptest.png)
3. Just press stop once you have done your actions
4. There is now a test in the repository, you can use it by pressing the play button to use it

To export a test, your account has an API key, save it for later.


B. Run the test through a terminal  

In order to use the previously generated test in a locally, on a terminal, you have the normally everything in hand,
just make sure that you have `snaptest-cli` installed globally (`[sudo] npm install -g snaptest-cli`)

If you want to import the snaptest from the extensions, you should put them in a json format file,
in the test-version repository. Then use this command: `snaptest -r nightwatch -s flat -i test-version/<JSONFILE.json>`


You will then have all the tests in a folder named _snaptests_. To run this tests, use the command:
 `../node_modules/.bin/nightwatch snaptests/tests`.

Please run the test with the english version of application.

If you want to run the test on an other browser than Google chrome,
replace `chrome` with `firefox` in the _nightwatch.json_ file here( only `firefox` and `chrome` supported right now):
```
{
  "test_settings" : {
  * * *
     "desiredCapabilities": {
        "browserName": "<browser name>",
     * * *
     }
  },
}
```

For your information, Snaptest use Nightwatch as an End-to-End Webdriver 
(maybe we will use python or Java if this is supported in the future),
who then use Selenium as a server to run the test locally.


Right  now, we can use snaptest, because it is free, but if in the future it become free, 
we will probably choose an other solution than that.
