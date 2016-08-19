import Ember from 'ember';

/**
 * This service store global information about the
 * Leosac we are connecting too.
 */
export default Ember.Service.extend({
    websocket: Ember.inject.service('websocket'),

    /**
     * The version number of the Leosac server.
     */
    version: "0.0.0",

    /**
     * This title of the current view.
     * Not sure this is the best way to manage this...
     */
    current_view_title: "Default",

    init()
    {
        "use strict";

        var self = this;
        var ws = self.get('websocket');
        ws.sendJson('get_leosac_version', {}).then(
            function (response)
            {
                self.set('version', response.version);
            },
            function (failure)
            {
                self.set('version', 'UNKNOWN');
            }
        );
    }
});
