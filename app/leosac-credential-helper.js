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

/**
 * Find the credential with id `credentialId` and delete it.
 *
 * The concrete type of the credential doesn't matter, this function
 * will search for all.
 */
function deleteCredential(store, credentialId, resolve, reject)
{
    let cred = store.peekRecord('wiegand-card', credentialId);
    if (!cred)
        cred = store.peekRecord('pin-code', credentialId);
    if (cred)
    {
        cred.destroyRecord({}).then((ok) => resolve(ok),
            (ko) => reject(ko));
    }
}

export {findAllCredentials, deleteCredential};
