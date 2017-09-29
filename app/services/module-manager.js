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

export default Ember.Service.extend({
    ws: Ember.inject.service('websocket'),
    info: Ember.inject.service('leosac-info'),
    store: Ember.inject.service('store'),
    serverModules: [],
    clientModules: [],
    shouldPresentBoth: [],
    onlyPresentServer: [],
    onlyPresentClient: [],

    init() {
      this._super(...arguments);
      this.fetchModule();
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

                let modulesServer = [];
                let i = 0;
                while (response.modules[i])
                {
                    modulesServer.push(response.modules[i]);
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
                let modulesShouldBeLoadedOnBoth = [];
                let modulesShouldBeLoadedOnClient = [];

                modulesClient.forEach(function(module) {
                    if (module[1].leosacProperty.needServer)
                        modulesShouldBeLoadedOnBoth.push(module[0]);
                    else
                        modulesShouldBeLoadedOnClient.push(module[0]);
                });

                //  console.log(modulesShouldBeLoadedOnBoth);
                modulesServer = formatName(modulesServer);
                modulesShouldBeLoadedOnBoth = formatName(modulesShouldBeLoadedOnBoth);
                modulesShouldBeLoadedOnClient = formatName(modulesShouldBeLoadedOnClient);
                let modulesLoadedByBoth = [];

                /**
                 * Now we will fill an array with the module that should be loaded by both,
                 * but are only loaded by the client
                 * @type {[null,null,null]}
                 */

                let modulesNotLoadedByTheServer = modulesShouldBeLoadedOnBoth;
                i = 0;

                while (modulesServer[i]) {
                    let j = 0;
                    while (modulesShouldBeLoadedOnBoth[j]) {
                        if (modulesShouldBeLoadedOnBoth[j] === modulesServer[i]) {
                            modulesLoadedByBoth.push(modulesNotLoadedByTheServer[j]);
                            modulesNotLoadedByTheServer.splice(j, 1);
                        }
                        j++;
                    }
                    i++;
                }
                console.log(modulesServer);
                console.log(modulesShouldBeLoadedOnClient);
                console.log(modulesLoadedByBoth);
                console.log(modulesNotLoadedByTheServer);

                // /**
                //  * At this point, we have three object:
                //  *  - Contain all modules from the server (modulesServer)
                //  *  - Contain all modules from the client (modulesClient)
                //  *  - Contain every module that are present in both the client and the server (presentInBoth)
                //  *
                //  *  Here is function that will remove from the server and client array
                //  *  everything that is in the presentInBoth.
                //  */

                self.set('serverModules', modulesServer);
                self.set('clientModules', modulesShouldBeLoadedOnClient);
                self.set('shouldPresentBoth', modulesLoadedByBoth);
                self.set('onlyPresentClient', modulesNotLoadedByTheServer);
            });
    }
});
