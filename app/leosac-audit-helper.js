import Ember from 'ember';

/**
 * This a function that returns all audit entries.
 *
 * Similar to findAllCredentials
 */
function findAllAudits(store)
{
    "use strict";
    const promise = Ember.RSVP.defer();
    let tmpArray = [];

    Ember.RSVP.hash({
        wsapiCallEvent: store.findAll('audit-wsapicall-event', {reload: true}),
        userEvent: store.findAll('audit-user-event', {reload: true}),
    }).then(function (hash)
    {
        tmpArray = tmpArray.concat(hash.wsapiCallEvent.toArray(),
            hash.userEvent.toArray());
        tmpArray.sort(function (a, b) {
            return a.get('numericId') < b.get('numericId');
        });
        promise.resolve(tmpArray);
    });

    return promise.promise;
}

//function findAudits(store, )

export {findAllAudits};
