 const TIMEOUT = 10000;
 const random = "" + parseInt(Math.random() * 1000000);
 const random1 = "" + parseInt(Math.random() * 1000000);
 const random2 = "" + parseInt(Math.random() * 1000000);
 const random3 = "" + parseInt(Math.random() * 1000000);


 module.exports = {
   "A test test": function(browser) {

     require('../../snaptest-nw-driver.js').bindHelpers(browser);
     require('../../components.js').bindComponents(browser);

     var baseUrl = browser.launchUrl || "http://www-dashboard.hologram.io";

     browser
       .url(baseUrl, "/", 899, 728, `Load page... "http://www-dashboard.hologram.io/"`)
       .click("body > div", `Click element`)
       .click("body > div", `Click element`)
       .click("body > div", `Click element`)
       .click("body > div", `Click element`)
       .click("body > div", `Click element`)
       .end();
   }
 };