import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
    ws: Ember.inject.service('websocket'),
    flashMessages: Ember.inject.service(),

    findRecord: function (store, type, id, snapshot)
    {
        const flashMessages = this.get('flashMessages');
        var def = Ember.RSVP.defer();
        const ws = this.get('ws');

        var p = ws.sendJson('membership_get', {membership_id: Number.parseInt(id)});
        p.then(function (data)
            {
                def.resolve(data);
            },
            function (failure)
            {
                flashMessages.danger('Failed to retrieve UserGroupMember #' + id);
                def.reject(failure);
            });

        return def.promise;
    }
});
