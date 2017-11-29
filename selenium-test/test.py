import unittest
from selenium.webdriver.common.keys import Keys
from test_api.config_test import set_browser


class GoogleSearch(unittest.TestCase):
    def setUp(self):
        self.driver = set_browser('firefox')

    def test_search_in_google(self):
        driver = self.driver
        driver.get("http://localhost:4200")
        elem = driver.find_element_by_name("q")
        elem.send_keys("leosac")
        elem.send_keys(Keys.ENTER)

    # def tearDown(self):
    #     self.driver.close()


if __name__ == "__main__":
    unittest.main()
