import { getOwner } from '@ember/application';
import Service, { service } from '@ember/service';

/**
 * This function will help us manage every module that are in our application,
 */

function formatName(object) {
    let i = 0;

    while (object[i]) {
        object[i] = object[i].toUpperCase();
        object[i] = object[i].replace(/_/g, '');
        i++;
    }
    object.sort();
    return object;
}

/**
 * This function will remove the last point of the path.
 * If you give as entry point: / , which can be a normal situation,
 * it will put "." at the end of the path, but this is an incorrect so we remove it
 *
 * @param path
 * @returns {*}
 */

function removeLastDot(path) {
    if (path.substring(path.length - 1) === ".") {
        path = path.substring(0, path.length - 1);
    }
    return path;
}

/**
 * The input is camelCased, which is not usable as it is. So we dasherize it, and we put the entry point in the routeName
 *
 * @param input
 * @param entryPoint
 * @returns {*}
 */

function formatRouteName(input, entryPoint) {
    input = input.replace(/([A-Z])/g, "-$1").toLowerCase();
    input += entryPoint.replace('/', '.');
    input = removeLastDot(input);
    return input;
}

function formatModuleName(str) {
    return str.replace(/-/g, ' ').toUpperCase();
}

export default Service.extend({
    ws: service('websocket'),
    info: service('leosac-info'),
    store: service('store'),
    serverModules: [],
    clientModules: [],
    wizards: [],
    shouldPresentBoth: [],
    onlyPresentServer: [],
    onlyPresentClient: [],
    nameToBeDisplayed: [],
    modulesInfo: [],
    wizardsInfo: [],

    init() {
        this._super(...arguments);
        this.fetchModule();
    },

    _pushModulesInfos(routeName, displayName, needServer, entryPoint, modelToRoute) {
        routeName = formatRouteName(routeName, entryPoint);
        let moduleInfos = {
            displayName: displayName,
            routeName: routeName,
            needServer: needServer,
            modelToRoute: modelToRoute
        };
        return (moduleInfos);
    },
    _pushWizardInfos(routeName, displayName, needServer, entryPoint, modelToRoute, neededModule) {
        routeName = formatRouteName(routeName, entryPoint);
        let formatedNeededModules = [];
        neededModule.forEach((module) => {
            formatedNeededModules.push(formatModuleName(module));
        });
        let wizardInfos = {
            displayName: displayName,
            routeName: routeName,
            needServer: needServer,
            modelToRoute: modelToRoute,
            neededModule: formatedNeededModules
        };
        return (wizardInfos);
    },
    /**
     * This function is meant to catch every module,
     * and tell if they are loaded in the server, the client, or both.
     */
    fetchModule() {
        let container = getOwner(this).lookup('application:main').engines;
        const ws = this.get('ws');
        const self = this;

        return ws.sendJson('system_overview', {}).then(
            function (response) {
                /**
                 * This will fill an array with every modules loaded by the server
                 * @type {Array}
                 */

                    // Some commented code here, because the server doesn't make any differences
                    // between the loaded by both or only the by the server

                let modulesShouldBeLoadedOnServer = [];
                let modulesShouldBeLoadedOnBothServer = [];
                let i = 0;
                while (response.modules[i]) {
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
                 *
                 * If the leosacProperty.needServer === true, it means that the module need the server too
                 *
                 * If the leosacProperty.isWizard === true, it means that this is a wizard module,
                 *  so it should be considered as a proper module
                 *
                 * @type {Array}
                 */

                let modulesClient = Object.entries(container);
                let modulesShouldBeLoadedOnBothClient = [];
                let modulesShouldBeLoadedOnClient = [];
                let modulesInfo = [];
                let wizardsInfo = [];
                let modulesWizard = [];

                modulesClient.forEach(function (module) {
                    if (module[1].leosacProperty.needServer) {
                        modulesShouldBeLoadedOnBothClient.push(module[0]);
                        modulesInfo.push(self._pushModulesInfos(module[0], module[1].leosacProperty.displayName,
                            true, module[1].leosacProperty.entryPoint, module[1].leosacProperty.modelToRoute));
                    }
                    else {
                        if (module[1].leosacProperty.isWizard === true) {
                            modulesWizard.push(module[0]);
                            wizardsInfo.push(self._pushWizardInfos(module[0], module[1].leosacProperty.displayName,
                                false, module[1].leosacProperty.entryPoint, module[1].leosacProperty.modelToRoute, module[1].leosacProperty.neededModule));
                        }
                        else {
                            modulesShouldBeLoadedOnClient.push(module[0]);
                            modulesInfo.push(self._pushModulesInfos(module[0], module[1].leosacProperty.displayName,
                                false, module[1].leosacProperty.entryPoint, module[1].leosacProperty.modelToRoute));
                        }
                    }
                });

                /**
                 * This will sort the modules by name, ASC
                 */
                modulesInfo.sort(function (a, b) {
                    if (a.routeName >= b.routeName) {
                        return 1;
                    } else if (a.routeName < b.routeName) {
                        return -1;
                    } else {
                        return 0;
                    }
                });

                /**
                 * Here we will reformat the name of each module so that they are serialized:
                 * - upper case
                 * - no underscore
                 *
                 */

                modulesShouldBeLoadedOnServer = formatName(modulesShouldBeLoadedOnServer);
                modulesShouldBeLoadedOnBothServer = formatName(modulesShouldBeLoadedOnBothServer);
                modulesShouldBeLoadedOnClient = formatName(modulesShouldBeLoadedOnClient);
                modulesShouldBeLoadedOnBothClient = formatName(modulesShouldBeLoadedOnBothClient);
                modulesWizard = formatName(modulesWizard);

                let modulesLoadedByBoth = [];

                /**
                 * Now we will fill an array with the module that should be loaded by both,
                 * but are only loaded by the client, and the server afterward
                 */

                let modulesNotLoadedByTheServer = [];
                let modulesNotLoadedByTheClient = [];

                modulesShouldBeLoadedOnBothClient.forEach(function (name) {
                    modulesNotLoadedByTheServer.push(name);
                });
                modulesShouldBeLoadedOnBothServer.forEach(function (name) {
                    modulesNotLoadedByTheClient.push(name);
                });

                i = 0;

                while (modulesShouldBeLoadedOnBothServer[i]) {
                    let j = 0;
                    while (modulesNotLoadedByTheServer[j]) {
                        if (modulesNotLoadedByTheServer[j] === modulesShouldBeLoadedOnBothServer[i]) {
                            modulesLoadedByBoth.push(modulesNotLoadedByTheServer[j]);
                            modulesNotLoadedByTheServer.splice(j, 1);
                        }
                        j++;
                    }
                    i++;
                }

                let modulesNeededByWizard = [];

                for (i = 0; wizardsInfo[i]; i++) {
                    for (let j = 0; wizardsInfo[i].neededModule[j]; j++) {
                        if (modulesNeededByWizard.includes(wizardsInfo[i].neededModule[j]) === false) {
                            modulesNeededByWizard.push(wizardsInfo[i].neededModule[j]);
                        }
                    }
                }

                i = 0;

                let checkOccurrence = 0;
                while (modulesShouldBeLoadedOnBothClient[i]) {
                    let j = 0;
                    while (modulesNotLoadedByTheClient[j]) {
                        if (modulesNotLoadedByTheClient[j] === modulesShouldBeLoadedOnBothClient[i]) {
                            if (modulesNotLoadedByTheClient[j] === modulesLoadedByBoth[checkOccurrence]) {
                                checkOccurrence++;
                            } else {
                                modulesLoadedByBoth.push(modulesNotLoadedByTheClient[j]);
                            }
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
                 * - wizardModules: contain the wizards that are loaded by the client
                 * - modulesNeededByWizard: this is a list of modules needed by the wizards located in the application
                 * - modulesInfo: contain the necessary information about modules that will be used for the route for example
                 * - wizardsInfo: contain the necessary information about wizards
                 * The last two should be displayed as error.
                 */

                self.set('serverModules', modulesShouldBeLoadedOnServer);
                self.set('clientModules', modulesShouldBeLoadedOnClient);
                self.set('clientMatchServer', modulesShouldBeLoadedOnBothClient);
                self.set('shouldPresentBoth', modulesLoadedByBoth);
                self.set('onlyPresentClient', modulesNotLoadedByTheServer);
                self.set('onlyPresentServer', modulesNotLoadedByTheClient);
                self.set('wizardModules');
                self.set('modulesNeededByWizard', modulesNeededByWizard);
                self.set('modulesInfo', modulesInfo);
                self.set('wizardsInfo', wizardsInfo);
            });
    }
});
