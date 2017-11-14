import LeosacRoute from 'web/leosac-route';
import Ember from 'ember';
import ENV from 'web/config/environment';

/**
 * This route is a bit odd as you can see. The template is empty,
 * it doesn't require an authentication token, it doesn't have a title.
 *
 * When browsing the application from leosac.com, it is asked to fill a form,
 * in which there is a field: leosac Address
 * This leosac Address is the address that the application use to find the backend.
 */

export default Ember.Route.extend({
    beforeModel() {
        /**
         * This will retrieve the url, add the missing slash (/),
         * and then set the leosac address with the new address.
         */
        let rawAddress = this.get('router.url');
        let address = rawAddress.replace('/entry-point/', '');
        if (address.substring(0, 3) === 'ws:')
            address = address.substr(0, 3) + '/' + address.substr(3);
        else if (address.substring(0, 4) === 'wss:')
            address = address.substr(0, 4) + '/' + address.substr(4);
        ENV.APP.leosacAddr = address;
        this.transitionTo('index');
    }
});
