const TIMEOUT = 10000;

module.exports.bindHelpers = function(browser) {

  var oldUrl = browser.url;
  var oldBack = browser.back;

  browser.url = function(baseUrl, pathname, width, height, description) {
    oldUrl(baseUrl + pathname);
    browser.resizeWindow(width, height);
    return this;
  };

  browser.back = function(description) {
    browser.perform(() => comment(description));
    browser.pause(5);
    oldBack();
    return this;
  };

  browser.initNewPage = function(pathname, description) {

    browser.perform(() => comment(description + " (navigating to " + pathname + ")"));

    var attempts = parseInt(TIMEOUT / 1000);
    var currentAttempt = 0;

    function checkForPageLoadWithPathname(pathname) {
      browser.execute(function() {
        return {
          pathname: window.location.pathname,
          readyState: document.readyState
        };
      }, [], function(result) {
        if (result.value.pathname !== pathname || result.value.readyState !== "complete") {
          if (currentAttempt < attempts) {
            currentAttempt++;
            browser.pause(1000);
            checkForPageLoadWithPathname(pathname);
          } else {
            this.assert.ok(false, description)
          }
        }
      });
    }

    checkForPageLoadWithPathname(pathname);

    browser.execute(function() {
      window.alert = function() {};
      window.confirm = function() {
        return true;
      };
    }, []);

    return this;

  };

  browser.executeScript = function(description, script) {
    browser.perform(() => comment(description));
    browser.execute(function(script) {
      eval(script);
    }, [script], function(result) {});

    return this;
  };

  browser.switchToWindow = function(windowIndex, description) {
    browser.perform(() => comment(description));

    browser.windowHandles(function(result) {
      this.switchWindow(result.value[windowIndex]);
    });

    return this;
  };

  browser.scrollWindow = function(x, y, description) {
    browser.perform(() => comment(description));
    browser.execute(function(x, y) {
      window.scrollTo(x, y);
    }, [x, y], function(result) {});

    return this;
  };

  browser.scrollElement = function(selector, x, y, description) {
    browser.perform(() => comment(description));
    browser.elementPresent(selector, null, () => { browser.assert.ok(false, description) });
    browser.execute(function(selector, x, y) {
      (function(el, x, y) {
        el.scrollLeft = x;
        el.scrollTop = y;
      })(document.querySelector(selector), x, y);
    }, [selector, x, y], function(result) {});

    return this;
  };

  browser.scrollWindowToElement = function(selector, description) {
    browser.perform(() => comment(description));
    browser.elementPresent(selector, null, () => { browser.assert.ok(false, description) });
    browser.execute(function(selector, value) {
      (function(el) {
        if (el) {
          var elsScrollY = el.getBoundingClientRect().top + window.scrollY - el.offsetHeight;
          window.scrollTo(0, elsScrollY);
        }
      })(document.querySelector(selector), value);
    }, [selector]);

    return this;
  };

  browser.click = function(selector, description) {
    browser.perform(() => comment(description));
    browser.elementPresent(selector, null, () => { browser.assert.ok(false, description)});
    browser.execute(function(selector) {

      (function(element) {

        function triggerMouseEvent(node, eventType) {
          var clickEvent = document.createEvent('MouseEvents');
          clickEvent.initEvent(eventType, true, true);
          node.dispatchEvent(clickEvent);
        }

        triggerMouseEvent(element, "mouseover");
        triggerMouseEvent(element, "mousedown");
        triggerMouseEvent(element, "mouseup");
        triggerMouseEvent(element, "click");

      })(document.querySelector(selector));

    }, [selector]);

    return this;

  };

  browser.changeInput = function(selector, value, description) {
    browser.perform(() => comment(description));
    browser.elementPresent(selector, null, () => { browser.assert.ok(false, description) });
    browser.execute(function(selector, value) {
      (function(el) {
        if (el) {
          el.value = value;
          el.dispatchEvent(new Event('change', {
            bubbles: true
          }));
          el.dispatchEvent(new Event('input', {
            bubbles: true
          }));
        }
      })(document.querySelector(selector), value);
    }, [selector, value], function(result) {});

    return this;
  };

  browser.inputValueAssert = function(selector, value, description) {

    browser.perform(() => comment(description));
    browser.elementPresent(selector, null, () => { browser.assert.ok(false, description) });

    var attempts = parseInt(TIMEOUT / 1000);
    var currentAttempt = 0;

    function checkforValue(selector, value) {
      browser.execute(function(selector) {
        var el = document.querySelector(selector);
        if (el) {
          if (el.type === 'checkbox' || el.type === 'radio') {
            return el.checked ? "true" : "false";
          } else {
            return el.value;
          }
        } else return null;
      }, [selector], function(result) {
        if (result.value !== value) {
          if (currentAttempt < attempts) {
            currentAttempt++;
            browser.pause(1000);
            checkforValue(selector, value);
          } else {
            this.assert.ok(false, description);
          }
        }
      });
    }

    checkforValue(selector, value);

    return this;

  };

  browser.elementPresent = function(selector, description, onFail) {

    browser.perform(() => comment(description));

    var attempts = parseInt(TIMEOUT / 1000);
    var currentAttempt = 0;

    function checkforEl(selector) {
      browser.execute(function(selector) {
        return !!document.querySelector(selector);
      }, [selector], function(result) {
        if (!result.value && currentAttempt < attempts) {
          currentAttempt++;
          browser.pause(1000);
          checkforEl(selector);
        } else if (!result.value) {
          if (typeof onFail === "function") {
            onFail();
          } else {
            this.assert.ok(false, description);
          }
        }
      });
    }

    checkforEl(selector);

    return this;

  };

  browser.elementNotPresent = function(selector, description) {
    browser.perform(() => comment(description));
    browser.waitForElementNotPresent(selector, TIMEOUT);
    return this;
  };

  browser.focusOnEl = function(selector, description) {
    browser.perform(() => comment(description));
    browser.elementPresent(selector, null, () => { browser.assert.ok(false, description) });

    browser.execute(function(selector) {
      (function(el) {
        var event = new FocusEvent('focus');
        el.dispatchEvent(event);
      })(document.querySelector(selector));
    }, [selector]);

    return this;
  };

  browser.formSubmit = function(selector, description) {
    browser.perform(() => comment(description));
    browser.elementPresent(selector, null, () => { browser.assert.ok(false, description) });
    browser.execute(function(selector) {

      (function(el) {
        var event = new Event('submit');
        el.dispatchEvent(event);
      })(document.querySelector(selector));

    }, [selector]);

    return this;
  };

  browser.blurOffEl = function(selector, description) {
    browser.perform(() => comment(description));
    browser.elementPresent(selector);
    browser.execute(function(selector) {

      (function(el) {
        var event = new FocusEvent('blur');
        el.dispatchEvent(event);
      })(document.querySelector(selector));

    }, [selector]);

    return this;
  };

  browser.getElText = function(selector, onSuccess, description) {
    browser.perform(() => comment(description));
    browser.elementPresent(selector, null, () => { browser.assert.ok(false, description) });

    var attempts = parseInt(TIMEOUT / 1000);
    var currentAttempt = 0;

    function checkforText(selector) {
      browser.execute(function(selector) {
        return (function(element) {
          if (!element) return null;
          var text = "";
          for (var i = 0; i < element.childNodes.length; ++i)
            if (element.childNodes[i].nodeType === 3)
              if (element.childNodes[i].textContent)
                text += element.childNodes[i].textContent;
          text = text.replace(/(\r\n|\n|\r)/gm, "");
          return text.trim();
        })(document.querySelector(selector));
      }, [selector], function(result) {
        if (result.value === "" && currentAttempt < attempts) {
          if (currentAttempt < attempts) {
            currentAttempt++;
            browser.pause(1000);
            checkforText(selector);
          } else {
            this.assert.ok(false, description);
          }
        } else {
          if (typeof onSuccess === "function") onSuccess.call(browser, result.value);
        }
      });
    }

    checkforText(selector);

    return this;

  };

  browser.elTextRegex = function(selector, regex, description) {
    browser.perform(() => comment(description));
    browser.elementPresent(selector, null, () => { browser.assert.ok(false, description) });
    return browser.getElText(selector, function(elsText) {
      var assertRegEx = new RegExp(regex);
      if (!assertRegEx.test(elsText)) {
        this.assert.ok(false, description);
      }
    })
  };

  browser.elTextIs = function(selector, assertText, description) {

    browser.perform(() => comment(description));
    browser.elementPresent(selector, null, () => { browser.assert.ok(false, description) });

    var attempts = parseInt(TIMEOUT / 1000);
    var currentAttempt = 0;

    function checkforText(selector, assertText) {
      browser.getElText(selector, function(elsText) {
        if (elsText !== assertText) {
          if (currentAttempt < attempts) {
            currentAttempt++;
            browser.pause(1000);
            checkforText(selector, assertText);
          } else {
            this.assert.ok(false, description);
          }
        }
      });
    }

    checkforText(selector, assertText);

    return this;

  };

  function comment(description) { if (description) { console.log(`${description}`); } }

};