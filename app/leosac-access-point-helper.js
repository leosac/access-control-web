import Ember from 'ember';


/**
 * Find an access point no matter its subtype.
 */
function findAccessPoint(store, id)
{
    const promise = Ember.RSVP.defer();

    Ember.RSVP.hash({
        evoxs: store.find('evoxs-access-point', id),
        base: store.find('access-point', id),
    }).then(function (hash)
    {
        if (hash.evoxs)
            promise.resolve(hash.evoxs);
        else if (hash.base)
            promise.resolve(hash.base);
        promise.reject(null);
    });

    return promise.promise;
}

/**
 * This a function that returns all access point.
 *
 * This wraps multiple call to store.findAll(). It is needed
 * because calling findAll() on a "base class" doesn't return
 * any of the child object.
 */
function findAllAccessPoints(store)
{
    "use strict";
    const promise = Ember.RSVP.defer();
    let tmpArray = [];

    Ember.RSVP.hash({
        base: store.findAll('access-point', {reload: true}),
    }).then(function (hash)
    {
        tmpArray = tmpArray.concat(hash.base.toArray());
        promise.resolve(tmpArray);
    });
    return promise.promise;
}

/**
 * Find the access point with id `apId` and delete it.
 *
 * The concrete type of the access point doesn't matter, this function
 * will search for all.
 */
function deleteAccessPoint(store, apId, resolve)
{
    let ap = store.peekRecord('evoxs-access-point', apId);
    if (!ap)
        ap = store.peekRecord('access-point', apId);
    if (ap)
    {
        return ap.destroyRecord({}).then((ok) => resolve(ok));
    }
}

export {findAccessPoint, findAllAccessPoints, deleteAccessPoint};
