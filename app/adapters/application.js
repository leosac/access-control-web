import { defer } from 'rsvp';
import { service } from '@ember/service';
import Adapter from '@ember-data/adapter';

export default class ApplicationAdapter extends Adapter {
    @service('websocket')
    ws;

    findAll(store, type) {
        let def = defer();
        console.log("Try to find all: " + type);
        let p = this.ws.sendJson('get_logs', {});

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
    }

    query(store, type, query) {
        "use strict";
        let def = defer();

        console.log("QUERY MODE" + type);
        console.log(query);
        let p = this.ws.sendJson('get_logs', query);

        p.then((data) => {
                console.log("RESPONSE");
                def.resolve(data);
            },
            () => {
                console.log("FAILURE QUERY");
                def.reject();
            });

        return def.promise;
    }
}
