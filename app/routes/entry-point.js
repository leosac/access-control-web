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
    beforeModel: function () {
        /**
         * This will retrieve the url, add the missing slash (/),
         * and then set the leosac address with the new address.
         */
        let rawAddress = this.get('router.url');

        let address = rawAddress.replace('/entry-point/', '');
        let finalAddress = decodeURI(address);
        console.log(finalAddress);

        ENV.APP.leosacAddr = finalAddress;
        this.transitionTo('index');
    }
});
