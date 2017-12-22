import Ember from 'ember';

/**
 * This route is a bit odd as you can see. The template is empty,
 * it doesn't require an authentication token, it doesn't have a title.
 *
 * When browsing the application from leosac.com, it is asked to fill a form,
 * in which there is a field: leosac Address
 * This leosac Address is the address that the application use to find the backend.
 *
 * The thing with the websocket allow the user to reenter the address if it fails:
 * 1 if it is an invalid formt
 * 2 if there is no server with this address
 *
 */

export default Ember.Route.extend({
    websocket: Ember.inject.service('websocket'),
    model(params) {
        "use strict";
        localStorage.leosacAddr = params.entry_point_address;
        let ws = new WebSocket(localStorage.leosacAddr + '/websocket');
        let ok = false;
        ws.onopen = () => {
            ok = true;
            ws.close();
        };
        ws.onclose = () =>
        {
            if (!ok) {
                alert('Error: there is no server with the following address: ' + params.entry_point_address);
                window.location.replace("http://127.0.0.1:5000/browse");
            }
        };
        this.transitionTo('login');
    },
    beforeModel() {
        "use strict";
        /**
         * This will retrieve the url, add the missing slash (/),
         * and then set the leosac address with the new address.
         */
        return this._super();
    }
});
