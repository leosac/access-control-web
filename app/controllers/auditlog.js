import { observer } from '@ember/object';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
    auditLog: service('audit-log'),
    wsapicallEnabled: true,
    userEventEnabled: true,
    doorEventEnabled: true,
    groupEventEnabled: true,
    credentialEventEnabled: true,
    scheduleEventEnabled: true,
    userGroupMembershipEventEnabled: true,
    updateEventEnabled: true,
    zoneEventEnabled: true,
    openDetailsModal: false,
    toggleValue: true,

    pageSize: 25,
    currentPage: 1,
    totalPage: 0,
    resultCount: 0,

    // Progress bar while fetching data.
    fetchingData: false,
    progressValue: 0,

    // The audit object that is currently being shown
    // in the details modal.
    detailedAudit: null,
    audits: ArrayProxy.create({content: A([])}),
    // Whenever one of those variable change,
    // thanks to Ember.observer, reload is called
    watch_: observer('wsapicallEnabled', 'userEventEnabled', 'doorEventEnabled',
        'groupEventEnabled', `credentialEventEnabled`, 'scheduleEventEnabled',
        'userGroupMembershipEventEnabled', 'updateEventEnabled', 'zoneEventEnabled',
        'currentPage', 'pageSize', function () {
            this.reload();
        }),
    actions: {
        showDetails(audit) {
            this.set('openDetailsModal', true);
            this.set('detailedAudit', audit);
        },
        refresh() {
            this.reload();
        },
        /**
         *  This is a function that will toggle every event in the audit log
         */
        toggleAll() {
            this.set('toggleValue', this.get('toggleValue') !== true);
            this.set('wsapicallEnabled', this.get('toggleValue'));
            this.set('userEventEnabled', this.get('toggleValue'));
            this.set('doorEventEnabled', this.get('toggleValue'));
            this.set('credentialEventEnabled', this.get('toggleValue'));
            this.set('scheduleEventEnabled', this.get('toggleValue'));
            this.set('groupEventEnabled', this.get('toggleValue'));
            this.set('userGroupMembershipEventEnabled', this.get('toggleValue'));
            this.set('updateEventEnabled', this.get('toggleValue'));
            this.set('zoneEventEnabled', this.get('toggleValue'));
        }
    },
    reload() {
        const self = this;

        const enabled_types = [];
        if (this.get('wsapicallEnabled'))
            enabled_types.push('Leosac::Audit::WSAPICall');
        if (this.get('userEventEnabled'))
            enabled_types.push('Leosac::Audit::UserEvent');
        if (this.get('doorEventEnabled'))
            enabled_types.push('Leosac::Audit::DoorEvent');
        if (this.get('credentialEventEnabled'))
            enabled_types.push('Leosac::Audit::CredentialEvent');
        if (this.get('scheduleEventEnabled'))
            enabled_types.push('Leosac::Audit::ScheduleEvent');
        if (this.get('groupEventEnabled'))
            enabled_types.push('Leosac::Audit::GroupEvent');
        if (this.get('userGroupMembershipEventEnabled'))
            enabled_types.push('Leosac::Audit::UserGroupMembershipEvent');
        if (this.get('updateEventEnabled'))
            enabled_types.push('Leosac::Audit::UpdateEvent');
        if (this.get('zoneEventEnabled'))
            enabled_types.push('Leosac::Audit::ZoneEvent');

        // small hack because we can't put the value of currentPage to a negative value,
        // otherwise, we have to restart the server. This is currently being fixed,
        // but in the mean time,that will fix it

        let currentPage = Number.parseInt(this.get('currentPage')) || 1;
        if (currentPage <= 0 || typeof currentPage !== 'number')
            currentPage = 1;
        const pageSize = Number.parseInt(this.get('pageSize')) || 25;

        const progressSetter = function (v) {
            self.set('progressValue', v);
        };

        self.set('fetchingData', true);
        this.get('auditLog').findAllByTypes(enabled_types,
            currentPage, pageSize, progressSetter).then((result) => {
            self.set('totalPage', result.meta.total_page);
            self.set('resultCount', result.meta.count);
            self.get('audits').set('content', result.data);
            progressSetter(0);
            self.set('fetchingData', false);
        });
    },
    init() {
        this._super(...arguments);
    }
});
