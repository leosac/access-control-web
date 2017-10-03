import Ember from 'ember';
import App from '../app';

/**
 * This service will help us manage every module that are in our application,
 */

function formatName(object)
{
    let i = 0;

    while (object[i])
    {
        object[i] = object[i].toUpperCase();
        object[i] = object[i].replace(/_/g, '');
        i++;
    }
    object.sort();
    return object;
}

function formatRouteName(input) {
   return input.replace(/([A-Z])/g, "-$1").toLowerCase();
}

export default Ember.Service.extend({
    ws: Ember.inject.service('websocket'),
    info: Ember.inject.service('leosac-info'),
    store: Ember.inject.service('store'),
    serverModules: [],
    clientModules: [],
    shouldPresentBoth: [],
    onlyPresentServer: [],
    onlyPresentClient: [],
    nameToBeDisplayed: [],
    modulesInfo: [],

    init() {
        this._super(...arguments);
        this.fetchModule();
    },

    _pushModulesInfos(routeName, displayName, needServer)
    {
        routeName = formatRouteName(routeName);
        let moduleInfos = {
            displayName: displayName,
            routeName: routeName,
            needServer: needServer
        };
        return (moduleInfos);
    },

    /**
     * This function is meant to catch every module,
     * and tell if they are loaded in the server, the client, or both.
     */
    fetchModule()
    {
        let container = Ember.getOwner(this).lookup('application:main').engines;
        const ws = this.get('ws');
        const self = this;

        return ws.sendJson('system_overview', {}).then(
            function (response)
            {
                /**
                 * This will fill an array with every modules loaded by the server
                 * @type {Array}
                 */

                    // Some commented code here, because the server doesn't make any differences
                    // between the loaded by both or only the by the server

                let modulesShouldBeLoadedOnServer = [];
                let modulesShouldBeLoadedOnBothServer = [];
                let i = 0;
                while (response.modules[i])
                {
//                    if (response.modules[i].data === 0)
                    modulesShouldBeLoadedOnBothServer.push(response.modules[i]);
//                    else
                    modulesShouldBeLoadedOnServer.push(response.modules[i]);
                    i++;
                }

                /**
                 * This will fill two array with every modules from the client
                 *
                 * In the first one, it will be the modules loaded by the client,
                 * and who need to be loaded by the server
                 *
                 * And the second one, it will be the modules loaded by the client
                 * If the leosacProperty.needServer === true, it means that the module need the server too
                 *
                 * @type {Array}
                 */

                let modulesClient = Object.entries(container);
                let modulesShouldBeLoadedOnBothClient = [];
                let modulesShouldBeLoadedOnClient = [];
                let modulesInfo = [];

                modulesClient.forEach(function(module) {
                    if (module[1].leosacProperty.needServer) {
                        modulesShouldBeLoadedOnBothClient.push(module[0]);
                        modulesInfo.push(self._pushModulesInfos(module[0], module[1].leosacProperty.displayName, true));
                    }
                    else {
                        modulesShouldBeLoadedOnClient.push(module[0]);
                        modulesInfo.push(self._pushModulesInfos(module[0], module[1].leosacProperty.displayName, false));
                    }
                });

                modulesInfo.sort(function(a, b) {
                    if (a.routeName >= b.routeName)
                        return 1;
                    else if (a.routeName < b.routeName)
                        return -1;
                    else
                        return 0;
                });

                /**
                 * Here we will reformat the name of each module so that they are serialized:
                 * - upper case
                 * - no underscore
                 */

                modulesShouldBeLoadedOnServer = formatName(modulesShouldBeLoadedOnServer);
                modulesShouldBeLoadedOnBothServer = formatName(modulesShouldBeLoadedOnBothServer);
                modulesShouldBeLoadedOnClient = formatName(modulesShouldBeLoadedOnClient);
                modulesShouldBeLoadedOnBothClient = formatName(modulesShouldBeLoadedOnBothClient);

                let modulesLoadedByBoth = [];

                /**
                 * Now we will fill an array with the module that should be loaded by both,
                 * but are only loaded by the client, and the server afterward
                 * @type {[null,null,null]}
                 */

                let modulesNotLoadedByTheServer = [];
                let modulesNotLoadedByTheClient = [];

                modulesShouldBeLoadedOnBothClient.forEach(function(name) {
                    modulesNotLoadedByTheServer.push(name);
                });
                modulesShouldBeLoadedOnBothServer.forEach(function(name) {
                    modulesNotLoadedByTheClient.push(name);
                });
                i = 0;

                while (modulesShouldBeLoadedOnBothServer[i])
                {
                    let j = 0;
                    while (modulesNotLoadedByTheServer[j])
                    {
                        if (modulesNotLoadedByTheServer[j] === modulesShouldBeLoadedOnBothServer[i])
                        {
                            modulesLoadedByBoth.push(modulesNotLoadedByTheServer[j]);
                            modulesNotLoadedByTheServer.splice(j, 1);
                        }
                        j++;
                    }
                    i++;
                }



                i = 0;
                let checkOccurrence = 0;
                while (modulesShouldBeLoadedOnBothClient[i])
                {
                    let j = 0;
                    while (modulesNotLoadedByTheClient[j])
                    {
                        if (modulesNotLoadedByTheClient[j] === modulesShouldBeLoadedOnBothClient[i])
                        {
                            if (modulesNotLoadedByTheClient[j] === modulesLoadedByBoth[checkOccurrence]) {
                                checkOccurrence++;
                            }
                            else
                                modulesLoadedByBoth.push(modulesNotLoadedByTheClient[j]);
                            modulesNotLoadedByTheClient.splice(j, 1);
                        }
                        j++;
                    }
                    i++;
                }


                /**
                 * At this point, we have six object:
                 * - modulesServer, which contain every module loaded by the server
                 * - clientModules, which contain every modules that should be loaded by the client
                 * - shouldPresentBoth: which contain the modules that are loaded by the server and the client
                 * - onlyPresentClient: which contain the modules that are not loaded by the server
                 * - onlyPresentServer: which contain the modules that are not loaded by the client
                 * - modulesInfo: contain the necessary information about modules that will be used for the route for example
                 *
                 * The last two should be displayed as error.
                 */

                self.set('serverModules', modulesShouldBeLoadedOnServer);
                self.set('clientModules', modulesShouldBeLoadedOnClient);
                self.set('shouldPresentBoth', modulesLoadedByBoth);
                self.set('onlyPresentClient', modulesNotLoadedByTheServer);
                self.set('onlyPresentServer', modulesNotLoadedByTheClient);
                self.set('modulesInfo', modulesInfo);
            });
    }
});
