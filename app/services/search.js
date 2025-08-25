import { Promise, all } from 'rsvp';
import Service, { service } from '@ember/service';

/**
 * This service provides the ability to query the
 * leosac server in order to search for various item.
 *
 * This is especially useful for type-ahead/autocomplete
 * input field.
 *
 * The various method returns a promise.
 */
export default Service.extend({
    websocket: service('websocket'),

    /**
     * Returns a promise that resolves to an array of {id,name}
     * for each group that matched.
     */
    findGroupByName(partialName) {
        const ws = this.get('websocket');

        return new Promise(function (resolve, reject) {
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

        return new Promise(function (resolve, reject) {
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

        return new Promise(function (resolve, reject) {
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

        return new Promise(function (resolve, reject) {
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
        const ws = this.get('websocket');

        return new Promise(function (resolve, reject) {
            ws.sendJson('search.zone_alias',
                {
                    'partial_name': partialName
                }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },

    /**
     * Return a promise that resolve to an array of {id, alias, type}
     * The type is needed because it is pincode or rfidcard, which are to complete separate thing
     * for each credential that matched
     */
    findCredentialByAlias(partialName) {
        const ws = this.get('websocket');

        return new Promise(function (resolve, reject) {
            ws.sendJson('search.credential_alias',
                {
                    'partial_name': partialName
                }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },

    /**
     * Return a promise that resolve to an array of {id, name, device-class, type}
     * device-class is a number between 0 and 4 (unknown, gpio, rfidreader, buzzer, led)
     * type is the name of the device type (eg 'piface-digital' or 'wiegand')
     * for each device that matched
     */
    findDeviceByAlias(partialName) {
        const ws = this.get('websocket');

        return new Promise(function (resolve, reject) {
            ws.sendJson('search.hardware_name',
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
     * Then we use Promise all() that will wait that our promise are resolved,
     *
     * And  then we fill the object that will be used by the global research field for example
     */
    findAllByAlias(partialName) {
        let resultSearch = [];

        let promiseZone = this.findZoneByAlias(partialName);
        let promiseDoor = this.findDoorByAlias(partialName);
        let promiseGroup = this.findGroupByName(partialName);
        let promiseSchedule = this.findScheduleByName(partialName);
        let promiseUser = this.findUserByUsername(partialName);
        let promiseCredential = this.findCredentialByAlias(partialName);
        let promiseDevice = this.findDeviceByAlias(partialName);

        return new Promise(function (resolve) {
            all([promiseZone,
                promiseDoor,
                promiseGroup,
                promiseSchedule,
                promiseUser,
                promiseCredential,
                promiseDevice]).then((data) => {
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
                    data[5].forEach(function (credential) {
                        if (credential.type === 'pincode') {
                            resultSearch.push({
                                type: 'pin-code',
                                id: credential.id,
                                nameOrAlias: credential.alias
                            });
                        } else {
                            resultSearch.push({
                                type: 'rfid-card',
                                id: credential.id,
                                nameOrAlias: credential.alias
                            });
                        }
                    });
                }
                if (data[6]) {
                    data[6].forEach((device) => {
                        resultSearch.push({
                            type: device.type,
                            id: device.id,
                            nameOrAlias: device.name
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
     *
     * EVOXS will be removed
     * leosac-builtin-access-point is a generic access point, it is builtin
     */
    listAccessPointModuleNames()
    {
        return ['EVOXS', 'LEOSAC-BUILTIN-ACCESS-POINT'];
    },

    /**
     * @see findDoorByAlias.
     */
    findAccessPointByAlias(partialName)
    {
        const ws = this.get('websocket');

        return new Promise(function (resolve, reject) {
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
