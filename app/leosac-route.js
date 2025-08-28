import { getOwner } from '@ember/application';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Route from '@ember/routing/route';
import ENV from 'web/config/environment';
//import config from 'web/config/environement';

/**
 * This is a base route for the application.
 *
 * To extend this base route, do the following:
 * ```
 *   import LeosacRoute from 'web/leosac-route';
 *   export default class extends LeosacRoute {...}
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
 */

export default class LeosacRoute extends Route {
    @service
    intl;
    @service
    router;
    @service('leosac-info')
    globalInfo;
    @service('authentication')
    authSrv;
    
    // A translation key for the title of the page.
    _title = '';
    _requireAuth = false;

    @action
    onLogout() {
        /**
         * This is a small hack that allow us to navigate to login
         *
         * The hack is quite simple, it check if the route name match the current route.
         * if not, then this is an engine.
         */
        if (this.fullRouteName === this.routeName) {
            this.router.transitionTo('login');
        } else {
            transitionToExternal(this, 'login');
        }
    }

    /**
     * An error was raised by a custom component.
     * @param err
     */
    @action
    myError(err) {
        console.error("Global Leosac myError catch", err);
        this.intermediateTransitionTo('ws-error', err);
        return false;
    }
    
    /**
     * An error was raised from a route model() method (or similar).
     * @param err
     */
    @action
    error(err) {
        console.error("Global Leosac error catch", err);
        this.intermediateTransitionTo('ws-error', err);
        return false;
    }
    
    beforeModel() {
        this.intl.setLocale(this.globalInfo.getLocale());

        if (this._title)
        {
            const title = this.intl.t(this._title);
            this.globalInfo.set('current_view_title', title);
            document.title = ENV.APP.appname + ' - ' + title;
        }

        if (this._requireAuth)
        {
            return redirectIfNotAuth(this);
        }
    }

    afterModel() {
        this.intl.setLocale(this.globalInfo.getLocale());
    }
}

function transitionToExternal(route, routeName)
{
    let externalRoute = getOwner(route)._getExternalRoute(routeName);
    route.router.transitionTo(externalRoute);
}

function redirectIfNotAuth(route)
{
    let promise_or_ret = route.authSrv.isLoggedIn();

    if (promise_or_ret === false)
    {
        /**
         * This is a small hack that allow us to navigate to login
         *
         * The hack is quite simple, it check if the route name match the current route.
         * if not, then this is an engine.
         */
        if (route.fullRouteName === route.routeName) {
            route.router.transitionTo('login');
        } else {
            transitionToExternal(route, 'login');
        }
        return ;

    }
    else if (promise_or_ret === true)
    {
        return;
    }

    promise_or_ret.then(() =>
    {
        // success, do nothing and let user reach page
    }, () =>
    {
        if (route.fullRouteName === route.routeName) {
            route.router.transitionTo('login');
        } else {
            transitionToExternal(route, 'login');
        }

    });
    return promise_or_ret;
}
