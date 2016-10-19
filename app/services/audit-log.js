import Ember from 'ember';

/**
 * A service that provide a few function to retrieve
 * audit log entries.
 */
export default Ember.Service.extend({
    store: Ember.inject.service(),
    ws: Ember.inject.service('websocket'),

    /**
     *
     * @param enabled_types
     * @returns {promise.promise}
     */
    findAllByTypes(enabled_types)
    {
        const promise = Ember.RSVP.defer();

        this.get('ws').sendJson('audit.get', {enabled_type: enabled_types}).then(
            (obj) =>
            {
                this.get('store').pushPayload(obj);
                let tmpArray = [];

                if (enabled_types.indexOf('Leosac::Audit::UserEvent') !== -1)
                    tmpArray = tmpArray.concat(this.get('store').peekAll('audit-user-event').toArray());

                if (enabled_types.indexOf('Leosac::Audit::WSAPICall') !== -1)
                    tmpArray = tmpArray.concat(this.get('store').peekAll('audit-wsapicall-event').toArray());

                if (enabled_types.indexOf('Leosac::Audit::DoorEvent') !== -1)
                    tmpArray = tmpArray.concat(this.get('store').peekAll('audit-door-event').toArray());

                if (enabled_types.indexOf('Leosac::Audit::ScheduleEvent') !== -1)
                    tmpArray = tmpArray.concat(this.get('store').peekAll('audit-schedule-event').toArray());

                if (enabled_types.indexOf('Leosac::Audit::CredentialEvent') !== -1)
                    tmpArray = tmpArray.concat(this.get('store').peekAll('audit-credential-event').toArray());

                if (enabled_types.indexOf('Leosac::Audit::GroupEvent') !== -1)
                    tmpArray = tmpArray.concat(this.get('store').peekAll('audit-group-event').toArray());

                tmpArray = tmpArray.sort(function (a, b)
                {
                    return b.get('numericId') - a.get('numericId');
                });
                promise.resolve(tmpArray);
            },
            (fail) => promise.reject(fail)
        );

        return promise.promise;
    }
});
