import DS from 'ember-data';
import Ember from 'ember';

export default DS.Adapter.extend({
    ws: Ember.inject.service('websocket'),

    findAll: function (store, type)
    {
        let def = Ember.RSVP.defer();

        let ws = this.get('ws');
        console.log("Try to find all: " + type);
        let p = ws.sendJson('get_logs', {});

        p.then((data) => {
                "use strict";
                console.log("RESPONSE");
                def.resolve(data);
            },
            () => {
                "use strict";
                console.log("FAILURE");
                def.reject();
            });

        return def.promise;
    },
    query: function (store, type, query)
    {
        "use strict";
        let def = Ember.RSVP.defer();

        let ws = this.get('ws');
        console.log("QUERY MODE" + type);
        console.log(query);
        let p = ws.sendJson('get_logs', query);

        p.then((data) => {
                console.log("RESPONSE");
                def.resolve(data);
            },
            () => {
                console.log("FAILURE QUERY");
                def.reject();
            });

        return def.promise;
    },

});
