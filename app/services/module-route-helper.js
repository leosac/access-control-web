import Service, { inject as service } from '@ember/service';

/**
 * This function will remove the ".list" at the end of a route name
 * 
 */

function removeExcessString(routeName) {
    return routeName.replace('.list', '');
}

export default Service.extend({
    ws: service('websocket'),
    info: service('leosac-info'),
    store: service('store'),
    moduleManager: service('module-manager'),

    setPath(name) {
        let modules = this.get('moduleManager').modulesInfo;
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
});
