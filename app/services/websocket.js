import Ember from 'ember';

export default Ember.Service.extend({
  ws: null,
  callback: [],
  beforeOpen: [],
  store: Ember.inject.service(),

  init()
   {
    "use strict";
    console.log('Service is initializing ...');

    var ws = this.get('ws');
    ws = new WebSocket('ws://localhost:8888/websocket');
    var self = this;

    ws.onopen = function ()
    {
      console.log('WS opened');

      // Process item that were queued before the connection
      // was ready.
      var queue = self.get('beforeOpen');
      if (queue.length > 0)
      {
        queue.forEach(function (payload)
        {
          ws.send(JSON.stringify(payload));
        });
        queue = [];
      }
      self.set('beforeOpen', queue);
    };

    ws.onmessage = function (event)
    {
      var obj = JSON.parse(event.data);
      var cb = self.get('callback')[obj.uuid];
      // If we didn't find a callback, it means its opportunistic message
      // from server
      if (!cb)
      {
        // Naive attempt to push to store. Would work if data
        // is JSONAPI compatible.

        // Will need more protocol handling tho.
        self.get('store').push(obj.content);
      }
      else
      {
        cb.success(obj.content);
        delete self.get('callback')[obj.uuid];
      }
    };

    ws.onclose = function (event)
    {
      console.log('WS was closed');
    };
    this.set('ws', ws);


    var timeout_request = function ()
    {
      self.get('callback').forEach(function (c)
      {
        var time_diff = new Date() - c.timestamp;
        if (time_diff > 10000)
        {
          c.error("TIMEOUT");
        }
      });
      Ember.run.later(timeout_request, 5000);
    };

    // Setup timer to check for timeout
    Ember.run.later(function ()
    {
      timeout_request();
    }, 5000);

  },

  /**
   * Generate a GUID.
   *
   * @returns {string}
   */
  guid() {
    function s4()
    {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  },

  sendJson(cmd, request_content)
  {
    "use strict";

    var queue = this.get('beforeOpen');
    var ws = this.get('ws');
    var callback = this.get('callback');
    var request = {
      uuid: this.guid(),
      cmd: cmd,
      content: request_content
    };

    if (ws.readyState === 1)
    {
      ws.send(JSON.stringify(request));
    }
    else
    {
      queue.push(request);
    }

    return new Ember.RSVP.Promise(function (resolve, reject)
    {
      var on_success = function (data)
      {
        Ember.run(null, resolve, data);
      };
      var on_error = function (why)
      {
        Ember.run(null, reject, why);
      };
      var cb = {
        timestamp: new Date(),
        success: on_success,
        error: on_error
      };
      callback[request.uuid] = cb;
    });
  }
});
