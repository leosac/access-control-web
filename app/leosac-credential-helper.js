import Ember from 'ember';

/**
 * This a function that returns all credentials.
 *
 * This wraps multiple call to store.findAll(). It is needed
 * because calling findAll() on a "base class" doesn't return
 * any of the child object.
 */
function findAllCredentials(store)
{
    "use strict";
    const promise = Ember.RSVP.defer();
    let tmpArray = [];

    Ember.RSVP.hash({
        wiegandCard: store.findAll('wiegand-card', {reload: true}),
        pinCode: store.findAll('pin-code', {reload: true}),
    }).then(function (hash)
    {
        tmpArray = tmpArray.concat(hash.wiegandCard.toArray(),
            hash.pinCode.toArray());
        promise.resolve(tmpArray);
    });

    return promise.promise;
}

export {findAllCredentials};
