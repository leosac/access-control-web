import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
    ws: Ember.inject.service('websocket'),

    findRecord: function (store, type, id)
    {
        const ws = this.get('ws');

        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('access_point.read', {access_point_id: Number.parseInt(id)}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    },
    findAll: function ()
    {
        const ws = this.get('ws');

        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('access_point.read', {access_point_id: 0}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    },
   // createRecord: function (store, type, snapshot)
    //{
        // const data = this.serialize(snapshot);
        // const ws = this.get('ws');
        //
        // return new Ember.RSVP.Promise(function (resolve, reject)
        // {
        //     ws.sendJson('access_point.create', {
        //         attributes: data.data.attributes
        //     }).then((data) => resolve(data),
        //         (failure) => reject(failure));
        // });

    //},
    // updateRecord: function (store, type, snapshot)
    // {
    //     const data = this.serialize(snapshot);
    //     const ws = this.get('ws');
    //
    //     const params = {
    //         access_point_id: Number.parseInt(snapshot.id),
    //         attributes: data.data.attributes
    //     };
    //     return new Ember.RSVP.Promise(function (resolve, reject)
    //     {
    //         ws.sendJson('access_point.update', params).then((data) => resolve(data),
    //             (failure) => reject(failure));
    //     });
    // },
    deleteRecord: function (store, type, snapshot)
    {
        const access_point_id = Number.parseInt(snapshot.id);
        const ws = this.get('ws');

        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('access_point.delete', {access_point_id: access_point_id}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    }
});
