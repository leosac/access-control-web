import Ember from 'ember';

/**
 * This is a base route for the application.
 *
 * To extend this base route, do the following:
 * ```
 *   import LeosacRoute from '../leosac-route';
 *   export default LeosacRoute.extend({...});
 * ```
 *
 * It provides various utilities that are shared
 * between route.
 *
 * The following property should be overridden:
 *     _title: The title of the route. It will be
 *             displayed as the HTML document title,
 *             as well as in the HTML template.
 *     _requireAuth: If the user is not authenticated,
 *             a direction to the login page will happen.
 *
 * @note In case the subclass implements the beforeModel()
 *       method, it MUST call `this._super()` otherwise this
 *       base route will be useless.
 */
export default Ember.Route.extend({
    globalInfo: Ember.inject.service('leosac-info'),
    _title: 'default',
    _requireAuth: false,
    actions: {
        onLogout()
        {
            "use strict";
            this.transitionTo('login');
        }
    },
    beforeModel()
    {
        "use strict";
        this.get('globalInfo').set('current_view_title', this._title);
        document.title = 'Leosac - ' + this._title;

        if (this._requireAuth)
        {
            return redirectIfNotAuth(this);
        }
    }
});

function redirectIfNotAuth(route)
{
    "use strict";
    var self = route;
    var promise_or_ret = self.get('authSrv').isLoggedIn();

    if (promise_or_ret === false)
    {
        self.transitionTo('login');
        return;
    }
    else if (promise_or_ret === true)
    {
        return;
    }

    promise_or_ret.then(function ()
    {
        // success, do nothing and let user reach page
    }, function ()
    {
        self.transitionTo('login');
    });
    return promise_or_ret;
}