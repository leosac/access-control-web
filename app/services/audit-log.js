import { next } from '@ember/runloop';
import { defer } from 'rsvp';
import Service, { service } from '@ember/service';

/**
 * A service that provide a few function to retrieve
 * audit log entries.
 */
export default class AuditLogService extends Service {
    @service
    store;
    @service('websocket')
    ws;

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
                this.store.peekAll(type).forEach((audit) => {
                    this.store.unloadRecord(audit);
                });
            });

            // ['audit-user-event', 'audit-wsapicall-event', 'audit-door-event', 'audit-user-group-membership-event',
            //     'audit-schedule-event', 'audit-credential-event', 'audit-group-event', 'audit-update-event',
            //     'audit-zone-event'].forEach((type) => {
            //     self.store.unloadAll(type);
            // });

            progressSetter(40);
            next(() => {

                progressSetter(80);
                this.store.pushPayload(obj);

                next(() => {
                    let tmpArray = [];

                    if (enabled_types.indexOf('Leosac::Audit::UserEvent') !== -1 ||
                        enabled_types.length === 0) {
                        tmpArray = tmpArray.concat(this.store.peekAll('audit-user-event').slice());
                    }

                    if (enabled_types.indexOf('Leosac::Audit::WSAPICall') !== -1 ||
                        enabled_types.length === 0) {
                        tmpArray = tmpArray.concat(this.store.peekAll('audit-wsapicall-event').slice());
                    }

                    if (enabled_types.indexOf('Leosac::Audit::DoorEvent') !== -1 ||
                        enabled_types.length === 0) {
                        tmpArray = tmpArray.concat(this.store.peekAll('audit-door-event').slice());
                    }

                    if (enabled_types.indexOf('Leosac::Audit::ScheduleEvent') !== -1 ||
                        enabled_types.length === 0) {
                        tmpArray = tmpArray.concat(this.store.peekAll('audit-schedule-event').slice());
                    }

                    if (enabled_types.indexOf('Leosac::Audit::CredentialEvent') !== -1 ||
                        enabled_types.length === 0) {
                        tmpArray = tmpArray.concat(this.store.peekAll('audit-credential-event').slice());
                    }

                    if (enabled_types.indexOf('Leosac::Audit::GroupEvent') !== -1 ||
                        enabled_types.length === 0) {
                        tmpArray = tmpArray.concat(this.store.peekAll('audit-group-event').slice());
                    }

                    if (enabled_types.indexOf('Leosac::Audit::UserGroupMembershipEvent') !== -1 ||
                        enabled_types.length === 0) {
                        tmpArray = tmpArray.concat(this.store.peekAll('audit-user-group-membership-event').slice());
                    }

                    if (enabled_types.indexOf('Leosac::Audit::UpdateEvent') !== -1 ||
                        enabled_types.length === 0) {
                        tmpArray = tmpArray.concat(this.store.peekAll('audit-update-event').slice());
                    }

                    if (enabled_types.indexOf('Leosac::Audit::ZoneEvent') !== -1 ||
                        enabled_types.length === 0) {
                        tmpArray = tmpArray.concat(this.store.peekAll('audit-zone-event').slice());
                    }

                    progressSetter(100);
                    next(() => {
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
}
