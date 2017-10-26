import Ember from 'ember';

export default Ember.Service.extend({
    ws: Ember.inject.service('websocket'),
    info: Ember.inject.service('leosac-info'),
    store: Ember.inject.service('store'),
    moduleManager: Ember.inject.service('module-manager'),

    setPath(name) {
        let modules = this.get('moduleManager').modulesInfo;
        let str = '';
        modules.forEach((module) => {
             if (module.routeName.indexOf(name) > -1)
             {

                 console.log(str);
                 return str;
             }
        });
        return str;
    }
});
