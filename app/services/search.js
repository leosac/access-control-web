import Ember from 'ember';

/**
 * This service provides the ability to query the
 * leosac server in order to search for various item.
 *
 * This is especially useful for type-ahead/autocomplete
 * input field.
 *
 * The various method returns a promise.
 */
export default Ember.Service.extend({
    websocket: Ember.inject.service('websocket'),

    /**
     * Returns a promise that resolves to an array of {id,name}
     * for each group that matched.
     */
    findGroupByName(partialName) {
        const ws = this.get('websocket');

        return new Ember.RSVP.Promise(function (resolve, reject) {
            ws.sendJson('search.group_name',
                {
                    'partial_name': partialName
                }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },

    /**
     * Returns a promise that resolves to an array of {id,name}
     * for each schedule that matched.
     */
    findScheduleByName(partialName)
    {
        const ws = this.get('websocket');

        return new Ember.RSVP.Promise(function (resolve, reject) {
            ws.sendJson('search.schedule_name',
                {
                    'partial_name': partialName
                }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },

    /**
     * Returns a promise that resolves to an array of {id,alias}
     * for each door that matched.
     */
    findDoorByAlias(partialName) {
        const ws = this.get('websocket');

        return new Ember.RSVP.Promise(function (resolve, reject) {
            ws.sendJson('search.door_alias',
                {
                    'partial_name': partialName
                }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },

    /**
     * Return a promise that resolve to an array of {id, name}
     * for each user that matched
     */
    findUserByUsername(partialName) {
        const ws = this.get('websocket');

        return new Ember.RSVP.Promise(function (resolve, reject) {
            ws.sendJson('search.user_username',
                {
                    'partial_name': partialName
                }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },

    /**
     * Return a promise that resolve to an array of {id, alias}
     * for each zone that matched
     */
    findZoneByAlias(partialName) {
        const ws = this.get('websocket')

        return new Ember.RSVP.Promise(function (resolve, reject) {
            ws.sendJson('search.zone_alias',
                {
                    'partial_name': partialName
                }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },

    /**
     * Return a promise that resolve to an array of {type, id, nameOrAlias}
     * for each zone, door, group, schedule and user in our DB that matched
     *
     * Firstly, we call all our promise that need to be resolved
     *
     * Then we use Promise all() that will wait that all our promise are resolved,
     *
     * And  then we fill the object that will be sent to the application
     */
    findAllByAlias(partialName) {
        let resultSearch = [];

        let promiseZone = this.findZoneByAlias(partialName);
        let promiseDoor = this.findDoorByAlias(partialName);
        let promiseGroup = this.findGroupByName(partialName);
        let promiseSchedule = this.findScheduleByName(partialName);
        let promiseUser = this.findUserByUsername(partialName);
//        let promiseCredentiall = this.findCredentialByAlias(partialName);

        return new Ember.RSVP.Promise(function (resolve, reject) {
            Ember.RSVP.all([promiseZone,
                promiseDoor,
                promiseGroup,
                promiseSchedule,
                promiseUser
            ]).then((data) => {
                if (data[0]) {
                    data[0].forEach(function (zone) {
                        resultSearch.push({
                            type: 'zone',
                            id: zone.id,
                            nameOrAlias: zone.alias
                        });
                    });
                }
                if (data[1]) {
                    data[1].forEach(function (door) {
                        resultSearch.push({
                            type: 'door',
                            id: door.id,
                            nameOrAlias: door.alias
                        });
                    });
                }
                if (data[2]) {
                    data[2].forEach(function (group) {
                        resultSearch.push({
                            type: 'group',
                            id: group.id,
                            nameOrAlias: group.name
                        });
                    });
                }
                if (data[3]) {
                    data[3].forEach(function (schedule) {
                        resultSearch.push({
                            type: 'schedule',
                            id: schedule.id,
                            nameOrAlias: schedule.name
                        });
                    });
                }
                if (data[4]) {
                    data[4].forEach(function (user) {
                        resultSearch.push({
                            type: 'user',
                            id: user.id,
                            nameOrAlias: user.username
                        });
                    });
                }
                if (data[5]) {
                    data[5].forEach(function (credentials) {
                        if (credentials.type === 'pincode')
                            resultSearch.push({
                                type: 'pincode',
                                id: pincode.id,
                                nameOrAlias: pincode.alias
                            });
                        else
                            resultSearch.push({
                                type: 'rfidcard',
                                id: rfidcard.id,
                                nameOrAlias: rfidcard.alias
                            });
                    });
                }
                resolve(resultSearch);
            });
        });
    },

    /**
     * Returns a list of enabled AccessPoint modules.
     * Currently this list is hardcoded client side.
     */
    listAccessPointModuleNames()
    {
        return ['EVOXS'];
    }
    ,

    /**
     * @see findDoorByAlias.
     */
    findAccessPointByAlias(partialName)
    {
        const ws = this.get('websocket');

        return new Ember.RSVP.Promise(function (resolve, reject) {
            console.log('searching for ' + partialName);
            ws.sendJson('search.access_point_alias',
                {
                    'partial_name': partialName
                }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },
})
;