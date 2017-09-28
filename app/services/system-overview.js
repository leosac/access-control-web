import Ember from 'ember';

/**
 * This service collects system information
 * from the Leosac service.
 *
 * May need to be merged with leosac-info service. Not
 * sure what is best for now.
 */
export default Ember.Service.extend({
    websocket: Ember.inject.service('websocket'),
    flashMessages: Ember.inject.service(),
    moduleManager: Ember.inject.service('module-manager'),
    instance_name: "",
    config_version: false,
    uptime: false,
    enabledModules: [],
    loadedEngines: [],

    update()
    {
        "use strict";
        let self = this;
        let ws = self.get('websocket');
        self.set('loadedEngines', self.get('moduleManager').fetchModule());
        console.log("ENABLED ENGINES " + self.get('loadedEngines'));
        return ws.sendJson('system_overview', {}).then(
            function (response)
            {
                self.set('config_version', response.config_version);
                self.set('instance_name', response.instance_name);
                self.set('uptime', response.uptime);
                let modules = [];
                let i = 0;
                while (response.modules[i])
                {
                    if (i === 0)
                        modules.push(response.modules[i]);
                    else
                        modules.push(' ' + response.modules[i]);
                    i++;
                }
                self.set('enabledModules', modules);
            }
        );
    }
});
