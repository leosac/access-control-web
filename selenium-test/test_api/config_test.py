from selenium import webdriver
from urllib import parse


def set_browser(browser_name):
    if browser_name.lower() == 'firefox'.lower():
        return webdriver.Firefox()
    elif (browser_name.lower() == 'google'.lower() or
                  browser_name.lower() == 'google chrome'.lower() or
                  browser_name.lower() == 'chrome'.lower()):
        return webdriver.Chrome()
    else:
        print('Invalid browser, only firefox and chrome are supported')
        return False
