import json
import unittest
from selenium.webdriver.common.keys import Keys
from test_api.config_test import set_browser


class GoogleSearch(unittest.TestCase):
    def setUp(self):
        self.driver = set_browser('google')

    def test_login(self):
        driver = self.driver
        driver.get("http://localhost:4200")

        # username_control = driver.find_element_by_css_selector('#ember433-field')
        # print(username_control)
        username_control = driver.find_element_by_css_selector('.form-horizontal > :nth-child(2) .form-control').text
        password_control = driver.find_element_by_css_selector('.form-horizontal > :nth-child(3) .form-control')
        #        submit_button = driver.find_element_by_css_selector('.ember-application .ember-view .btn-primary')

        # print(password_control.tag_name)
        # #      print(submit_button.tag_name)
        # username_control.send_keys('admin')
        # password_control.send_keys('admin')
        # #     submit_button.click()
        # driver.implicitly_wait(20)
        # .changeInput(`.form - horizontal >: nth - child(2).form - control
        # `, `CSS`, `admin`, `Change
        # input
        # to...
        # "admin"
        # `)
        # .changeInput(`.form - horizontal >: nth - child(3).form - control
        # `, `CSS`, `admin`, `Change
        # input
        # to...
        # "admin"
        # `)
        # .click(`.ember - application.ember - view.btn - primary
        # `, `CSS`, `Click
        # element
        # `)
        # .formSubmit(`.form - horizontal
        # `, `CSS`, `Form
        # submit
        # `)
        # .end();
        # submit_button.send_keys(Keys.ENTER)

        # def tearDown(self):
        #     self.driver.close()


if __name__ == "__main__":
    unittest.main()
