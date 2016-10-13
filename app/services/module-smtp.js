import Ember from 'ember';

/**
 * A service to interact with Leosac's SMTP module.
 */
export default Ember.Service.extend({
    websocket: Ember.inject.service('websocket'),

    getServersConfig()
    {
        return this.get('websocket').sendJson('module.smtp.getconfig', {}).then((resp) =>
        {
            console.log(resp);
            return resp;
        });
    }

});
