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
    findGroupByName(partialName)
    {
        const ws = this.get('websocket');
        return new Ember.RSVP.Promise(function (resolve, reject)
        {
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
    findDoorByAlias(partialName)
    {
        const ws = this.get('websocket');
        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            console.log('searching for ' + partialName);
            ws.sendJson('search.door_alias',
                {
                    'partial_name': partialName
                }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }
});
