import Ember from 'ember';


/**
 * Find a credential no matter its subtype.
 */
function findCredential(store, id)
{
    const promise = Ember.RSVP.defer();

    Ember.RSVP.hash({
        rfidCard: store.find('rfid-card', id),
        pinCode: store.find('pin-code', id),
    }).then(function (hash)
    {
        if (hash.rfidCard)
            promise.resolve(hash.rfidCard);
        else if (hash.pinCode)
            promise.resolve(hash.pinCode);
        promise.reject(null);
    });

    return promise.promise;
}

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
        rfidCard: store.findAll('rfid-card', {reload: true}),
        pinCode: store.findAll('pin-code', {reload: true}),
    }).then(function (hash)
    {
        tmpArray = tmpArray.concat(hash.rfidCard.toArray(),
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
function deleteCredential(store, credentialId, resolve)
{
    let cred = store.peekRecord('rfid-card', credentialId);
    if (!cred)
        cred = store.peekRecord('pin-code', credentialId);
    if (cred)
    {
        return cred.destroyRecord({}).then((ok) => resolve(ok));
    }
}

export {findAllCredentials, findCredential, deleteCredential};
