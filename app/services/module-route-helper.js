import Ember from 'ember';

/**
 * This function will remove the ".list" at the end of a route name
 * 
 */

function removeExcessString(routeName) {
    return routeName.replace('.list', '');
}

export default Ember.Service.extend({
    ws: Ember.inject.service('websocket'),
    info: Ember.inject.service('leosac-info'),
    store: Ember.inject.service('store'),
    moduleManager: Ember.inject.service('module-manager'),

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
