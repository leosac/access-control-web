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
     * @param page
     * @param pageSize
     * @param progressSetter
     * @returns {promise.promise}
     */
    findAllByTypes(enabled_types, page, pageSize, progressSetter)
    {
        const promise = Ember.RSVP.defer();
        const self = this;

        progressSetter(10);
        this.get('ws').sendJson('audit.get', {
            enabled_type: enabled_types,
            p: page,
            ps: pageSize
        }).then((obj) => {
            // Normally, we should use unloadAll, but since the ember-data 2.14 release, there is a known issue with it.
            // Instead, we enumerate every audit in order to clear the store.
            ['audit-user-event', 'audit-wsapicall-event', 'audit-door-event', 'audit-user-group-membership-event',
                'audit-schedule-event', 'audit-credential-event', 'audit-group-event', 'audit-update-event',
                'audit-zone-event'].forEach((type) => {
                self.get('store').peekAll(type).forEach((audit) => {
                    self.get('store').unloadRecord(audit);
                });
            });

            // ['audit-user-event', 'audit-wsapicall-event', 'audit-door-event', 'audit-user-group-membership-event',
            //     'audit-schedule-event', 'audit-credential-event', 'audit-group-event', 'audit-update-event',
            //     'audit-zone-event'].forEach((type) => {
            //     self.get('store').unloadAll(type);
            // });

            progressSetter(40);
            Ember.run.next(function () {

                progressSetter(80);
                self.get('store').pushPayload(obj);

                Ember.run.next(function () {
                    let tmpArray = [];

                    if (enabled_types.indexOf('Leosac::Audit::UserEvent') !== -1 ||
                        enabled_types.length === 0)
                        tmpArray = tmpArray.concat(self.get('store').peekAll('audit-user-event').toArray());

                    if (enabled_types.indexOf('Leosac::Audit::WSAPICall') !== -1 ||
                        enabled_types.length === 0)
                        tmpArray = tmpArray.concat(self.get('store').peekAll('audit-wsapicall-event').toArray());

                    if (enabled_types.indexOf('Leosac::Audit::DoorEvent') !== -1 ||
                        enabled_types.length === 0)
                        tmpArray = tmpArray.concat(self.get('store').peekAll('audit-door-event').toArray());

                    if (enabled_types.indexOf('Leosac::Audit::ScheduleEvent') !== -1 ||
                        enabled_types.length === 0)
                        tmpArray = tmpArray.concat(self.get('store').peekAll('audit-schedule-event').toArray());

                    if (enabled_types.indexOf('Leosac::Audit::CredentialEvent') !== -1 ||
                        enabled_types.length === 0)
                        tmpArray = tmpArray.concat(self.get('store').peekAll('audit-credential-event').toArray());

                    if (enabled_types.indexOf('Leosac::Audit::GroupEvent') !== -1 ||
                        enabled_types.length === 0)
                        tmpArray = tmpArray.concat(self.get('store').peekAll('audit-group-event').toArray());

                    if (enabled_types.indexOf('Leosac::Audit::UserGroupMembershipEvent') !== -1 ||
                        enabled_types.length === 0)
                        tmpArray = tmpArray.concat(self.get('store').peekAll('audit-user-group-membership-event').toArray());

                    if (enabled_types.indexOf('Leosac::Audit::UpdateEvent') !== -1 ||
                        enabled_types.length === 0)
                        tmpArray = tmpArray.concat(self.get('store').peekAll('audit-update-event').toArray());

                    if (enabled_types.indexOf('Leosac::Audit::ZoneEvent') !== -1 ||
                        enabled_types.length === 0)
                        tmpArray = tmpArray.concat(self.get('store').peekAll('audit-zone-event').toArray());

                    progressSetter(100);
                    Ember.run.next(function () {
                        tmpArray.sort(function (a, b) {
                            return b.get('numericId') - a.get('numericId');
                        });
                        promise.resolve({data: tmpArray, meta: obj.meta});
                    });
                });
            });
        }, (fail) => promise.reject(fail));
        return promise.promise;
    }
});
