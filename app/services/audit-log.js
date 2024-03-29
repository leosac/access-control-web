import { next } from '@ember/runloop';
import { defer } from 'rsvp';
import Service, { inject as service } from '@ember/service';

/**
 * A service that provide a few function to retrieve
 * audit log entries.
 */
export default Service.extend({
    store: service(),
    ws: service('websocket'),

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
        const promise = defer();
        const self = this;

        progressSetter(10);
        this.ws.sendJson('audit.get', {
            enabled_type: enabled_types,
            p: page,
            ps: pageSize
        }).then((obj) => {
            // Normally, we should use unloadAll, but since the ember-data 2.14 release, there is a known issue with it.
            // https://github.com/emberjs/data/issues/5175
            // https://github.com/emberjs/data/issues/5167
            // https://github.com/emberjs/data/issues/5111
            // Instead, we enumerate every audit in order to clear the store.
            ['audit-user-event', 'audit-wsapicall-event', 'audit-door-event', 'audit-user-group-membership-event',
                'audit-schedule-event', 'audit-credential-event', 'audit-group-event', 'audit-update-event',
                'audit-zone-event'].forEach((type) => {
                self.store.peekAll(type).forEach((audit) => {
                    self.store.unloadRecord(audit);
                });
            });

            // ['audit-user-event', 'audit-wsapicall-event', 'audit-door-event', 'audit-user-group-membership-event',
            //     'audit-schedule-event', 'audit-credential-event', 'audit-group-event', 'audit-update-event',
            //     'audit-zone-event'].forEach((type) => {
            //     self.store.unloadAll(type);
            // });

            progressSetter(40);
            next(function () {

                progressSetter(80);
                self.store.pushPayload(obj);

                next(function () {
                    let tmpArray = [];

                    if (enabled_types.indexOf('Leosac::Audit::UserEvent') !== -1 ||
                        enabled_types.length === 0) {
                        tmpArray = tmpArray.concat(self.store.peekAll('audit-user-event').toArray());
                    }

                    if (enabled_types.indexOf('Leosac::Audit::WSAPICall') !== -1 ||
                        enabled_types.length === 0) {
                        tmpArray = tmpArray.concat(self.store.peekAll('audit-wsapicall-event').toArray());
                    }

                    if (enabled_types.indexOf('Leosac::Audit::DoorEvent') !== -1 ||
                        enabled_types.length === 0) {
                        tmpArray = tmpArray.concat(self.store.peekAll('audit-door-event').toArray());
                    }

                    if (enabled_types.indexOf('Leosac::Audit::ScheduleEvent') !== -1 ||
                        enabled_types.length === 0) {
                        tmpArray = tmpArray.concat(self.store.peekAll('audit-schedule-event').toArray());
                    }

                    if (enabled_types.indexOf('Leosac::Audit::CredentialEvent') !== -1 ||
                        enabled_types.length === 0) {
                        tmpArray = tmpArray.concat(self.store.peekAll('audit-credential-event').toArray());
                    }

                    if (enabled_types.indexOf('Leosac::Audit::GroupEvent') !== -1 ||
                        enabled_types.length === 0) {
                        tmpArray = tmpArray.concat(self.store.peekAll('audit-group-event').toArray());
                    }

                    if (enabled_types.indexOf('Leosac::Audit::UserGroupMembershipEvent') !== -1 ||
                        enabled_types.length === 0) {
                        tmpArray = tmpArray.concat(self.store.peekAll('audit-user-group-membership-event').toArray());
                    }

                    if (enabled_types.indexOf('Leosac::Audit::UpdateEvent') !== -1 ||
                        enabled_types.length === 0) {
                        tmpArray = tmpArray.concat(self.store.peekAll('audit-update-event').toArray());
                    }

                    if (enabled_types.indexOf('Leosac::Audit::ZoneEvent') !== -1 ||
                        enabled_types.length === 0) {
                        tmpArray = tmpArray.concat(self.store.peekAll('audit-zone-event').toArray());
                    }

                    progressSetter(100);
                    next(function () {
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
