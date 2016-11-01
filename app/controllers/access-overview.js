import Ember from 'ember';

export default Ember.Controller.extend({
    ws: Ember.inject.service('websocket'),

    rawData: null,
    allDoors: Ember.computed('rawData', function ()
    {
        const ids = [];
        if (!this.get('rawData'))
            return ids;

        this.get('rawData').forEach((doorInfo) =>
        {
            ids.push(doorInfo.id);
        });
        return ids;
    }),
    allUsers: Ember.computed('allDoors', function ()
    {
        let userIds = [];

        if (!this.get('rawData'))
            return userIds;

        this.get('rawData').forEach((doorInfo) =>
        {
            doorInfo.user_ids.forEach((uid) =>
            {
                userIds.push(uid);
                userIds.push(1);
            });
        });
        userIds = Array.from(new Set(userIds));

        const userCanAccessDoor = function (userId, door)
        {
            return door.user_ids.indexOf(userId) !== -1;
        };

        let userInfos = [];
        userIds.forEach((uid) =>
        {
            const userData = {user_id: uid, doors: []};
            this.get('rawData').forEach((doorInfo) =>
            {
                if (userCanAccessDoor(uid, doorInfo))
                {
                    userData['doors'].push(true);
                }
                else
                {
                    userData['doors'].push(false);
                }
            });
            userInfos.push(userData);
        });
        return userInfos;
    }),

    reload()
    {
        this.get('ws').sendJson('access_overview', {}).then((data) =>
        {
            console.log(data);
            this.set('rawData', data.data);
        });
    },
    init()
    {
        this._super(...arguments);
        this.reload();
    }
});
