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
        credentialEvent: store.findAll('audit-credential-event', {reload: true}),
        groupEvent: store.findAll('audit-group-event', {reload: true}),
        scheduleEvent: store.findAll('audit-schedule-event', {reload: true}),
    }).then(function (hash)
    {
        tmpArray = [];
        if (hash.wsapiCallEvent)
            tmpArray = tmpArray.concat(hash.wsapiCallEvent.toArray());
        if (hash.userEvent)
            tmpArray = tmpArray.concat(hash.userEvent.toArray());
        if (hash.credentialEvent)
            tmpArray = tmpArray.concat(hash.credentialEvent.toArray());
        if (hash.scheduleEvent)
            tmpArray = tmpArray.concat(hash.scheduleEvent.toArray());
        if (hash.groupEvent)
            tmpArray = tmpArray.concat(hash.groupEvent.toArray());

        tmpArray.sort(function (a, b)
        {
            return a.get('numericId') < b.get('numericId');
        });
        promise.resolve(tmpArray);
    });

    return promise.promise;
}

/**
 * Find audit of specifics types.
 *
 * Types should match the "type" field returned by leosac, ie
 * "audit-user-event", "audit-wsapicall-event"
 */
function findAudits(store, enableWSAPICall)
{
    "use strict";

    if (enableWSAPICall)
        return findAllAudits(store);

    const promise = Ember.RSVP.defer();
    let tmpArray = [];

    Ember.RSVP.hash({
        userEvent: store.findAll('audit-user-event', {reload: true}),
        credentialEvent: store.findAll('audit-credential-event', {reload: true}),
        groupEvent: store.findAll('audit-group-event', {reload: true}),
        scheduleEvent: store.findAll('audit-schedule-event', {reload: true}),
    }).then(function (hash)
    {
        tmpArray = [];
        if (hash.userEvent)
            tmpArray = tmpArray.concat(hash.userEvent.toArray());
        if (hash.credentialEvent)
            tmpArray = tmpArray.concat(hash.credentialEvent.toArray());
        if (hash.scheduleEvent)
            tmpArray = tmpArray.concat(hash.scheduleEvent.toArray());
        if (hash.groupEvent)
            tmpArray = tmpArray.concat(hash.groupEvent.toArray());


        tmpArray.sort(function (a, b)
        {
            return a.get('numericId') < b.get('numericId');
        });
        promise.resolve(tmpArray);
    });

    return promise.promise;
}

export {findAudits, findAllAudits};
