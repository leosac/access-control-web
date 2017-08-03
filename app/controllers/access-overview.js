import Ember from 'ember';

export default Ember.Controller.extend({
    ws: Ember.inject.service('websocket'),

    // JSON as returned by the `access_overview` Leosac WS call.
    rawData: null,
    allDoors: Ember.computed('rawData', function ()
    {
        const doors = [];
        if (!this.get('rawData'))
            return doors;

        this.get('rawData').forEach((doorInfo) =>
        {
            doors.push(this.get('store').find('door', doorInfo.door_id));
        });
        return doors;
    }),
    userDoorInfo: Ember.computed('allDoors', function ()
    {
        let userIds = [];

        if (!this.get('rawData'))
            return userIds;

        this.get('rawData').forEach((doorInfo) =>
        {
            doorInfo.user_ids.forEach((uid) =>
            {
                userIds.push(uid);
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
            const userData = {user: this.get('store').find('user', uid), doors: []};
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
            this.set('rawData', data);
        });
    },
    init()
    {
        this._super(...arguments);
        this.reload();
    }
});
