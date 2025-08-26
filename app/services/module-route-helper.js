import Service, { service } from '@ember/service';

/**
 * This function will remove the ".list" at the end of a route name
 * 
 */

function removeExcessString(routeName) {
    return routeName.replace('.list', '');
}

export default class ModuleRouteHelperService extends Service {
    @service('websocket')
    ws;
    @service('leosac-info')
    info;
    @service
    store;
    @service('module-manager')
    moduleManager;

    setPath(name) {
        let modules = this.moduleManager.modulesInfo;
        let str = '';
        modules.forEach((module) => {
            let arrayOfKeys = Object.keys(module.modelToRoute);
            arrayOfKeys.forEach((model) => {
                if (module.modelToRoute[model].indexOf(name) > -1) {
                    str = removeExcessString(module.routeName);
                    str += '.' + module.modelToRoute[model];
                    return str;
                }
            });
        });
        return str;
    }
}
