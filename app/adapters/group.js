import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
    ws: Ember.inject.service('websocket'),
    flashMessages: Ember.inject.service(),

    findRecord: function (store, type, id, snapshot)
    {
        var def = Ember.RSVP.defer();
        const ws = this.get('ws');
        const self = this;

        var p = ws.sendJson('group_get', {group_id: Number.parseInt(id)});
        p.then(function (data)
            {
                def.resolve(data);
            },
            function (failure)
            {
                self.get('flashMessages').danger(failure.status_string);
                def.reject(failure);
            });

        return def.promise;
    }
});
