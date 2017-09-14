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
            console.log('searching for ' + partialName);
            ws.sendJson('search.group_name',
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
            console.log('searching for ' + partialName);
            ws.sendJson('search.door_alias',
                {
                    'partial_name': partialName
                }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },

    /**
     * Doesn't work at all, need the backend of this aka
     */
    findZoneByAlias(partialName) {
        const ws = this.get('websocket');
        return new Ember.RSVP.Promise(function (resolve, reject) {
            console.log('searching for ' + partialName);
            ws.sendJson('search.zone_alias',
                {
                    'partial_name': partialName
                }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },

    findAllByAlias(partialName) {
        const ws = this.get('websocket');
        let resultSearch = [];

        let p1 = this.findZoneByAlias(partialName);
        let p2 = this.findDoorByAlias(partialName);
        let p3 = this.findGroupByName(partialName);
        return new Ember.RSVP.Promise(function (resolve, reject) {
            Ember.RSVP.all([p1, p2, p3]).then((data) => {
                data[0].forEach(function (zone) {
                    resultSearch.push({
                        type: 'zone',
                        id: zone.id,
                        nameOrAlias: zone.alias
                    });
                });
                data[1].forEach(function (door) {
                    resultSearch.push({
                        type: 'door',
                        id: door.id,
                        nameOrAlias: door.alias
                    });
                });
                data[2].forEach(function (group) {
                    resultSearch.push({
                        type: 'group',
                        id: group.id,
                        nameOrAlias: group.name
                    });
                });
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
}
,

findScheduleByName(partialName)
{
    const ws = this.get('websocket');
    return new Ember.RSVP.Promise(function (resolve, reject) {
        console.log('searching for ' + partialName);
        ws.sendJson('search.schedule_name',
            {
                'partial_name': partialName
            }).then((data) => resolve(data),
            (failure) => reject(failure));
    });
}
,
})
;
