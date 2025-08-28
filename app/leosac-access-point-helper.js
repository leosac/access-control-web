import { defer, hash } from 'rsvp';


/**
 * Find an access point no matter its subtype.
 */
function findAccessPoint(store, id)
{
    const promise = defer();

    hash({
        base: store.findRecord('access-point', id),
    }).then(function (hash)
    {
        if (hash.base) {
            promise.resolve(hash.base);
        }
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
    const promise = defer();
    let tmpArray = [];

    hash({
        base: store.findAll('access-point', {reload: true}),
    }).then(function (hash)
    {
        tmpArray = tmpArray.concat(hash.base.slice());
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
    const ap =  store.peekRecord('access-point', apId);
    if (ap) {
        return ap.destroyRecord({}).then((ok) => resolve(ok));
    }
}

export {findAccessPoint, findAllAccessPoints, deleteAccessPoint};
