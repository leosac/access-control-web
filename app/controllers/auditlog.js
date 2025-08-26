import { action, observer } from '@ember/object';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';
import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class AuditLogController extends Controller {
    @service('audit-log')
    auditLog;
    wsapicallEnabled = true;
    userEventEnabled = true;
    doorEventEnabled = true;
    groupEventEnabled = true;
    credentialEventEnabled = true;
    scheduleEventEnabled = true;
    userGroupMembershipEventEnabled = true;
    updateEventEnabled = true;
    zoneEventEnabled = true;
    openDetailsModal = false;
    toggleValue = true;

    pageSize = 25;
    currentPage = 1;
    totalPage = 0;
    resultCount = 0;

    // Progress bar while fetching data.
    fetchingData = false;
    progressValue = 0;

    // The audit object that is currently being shown
    // in the details modal.
    detailedAudit = null;
    audits = ArrayProxy.create({content: A([])});
    // Whenever one of those variable change,
    // thanks to Ember.observer, reload is called
    @observer('wsapicallEnabled', 'userEventEnabled', 'doorEventEnabled',
        'groupEventEnabled', `credentialEventEnabled`, 'scheduleEventEnabled',
        'userGroupMembershipEventEnabled', 'updateEventEnabled', 'zoneEventEnabled',
        'currentPage', 'pageSize', function () {
            console.log('TODO: this.reload()');
        })
    watch_;

    @action
    showDetails(audit) {
        this.openDetailsModal = true;
        this.detailedAudit = audit;
    }

    @action
    refresh() {
        this.reload();
    }

    /**
     *  This is a function that will toggle every event in the audit log
     */
    @action
    toggleAll() {
        this.toggleValue = this.toggleValue !== true;
        this.wsapicallEnabled = this.toggleValue;
        this.userEventEnabled = this.toggleValue;
        this.doorEventEnabled = this.toggleValue;
        this.credentialEventEnabled = this.toggleValue;
        this.scheduleEventEnabled = this.toggleValue;
        this.groupEventEnabled = this.toggleValue;
        this.userGroupMembershipEventEnabled = this.toggleValue;
        this.updateEventEnabled = this.toggleValue;
        this.zoneEventEnabled = this.toggleValue;
    }
    
    reload() {
        const enabled_types = [];
        if (this.wsapicallEnabled) {
            enabled_types.push('Leosac::Audit::WSAPICall');
        }
        if (this.userEventEnabled) {
            enabled_types.push('Leosac::Audit::UserEvent');
        }
        if (this.doorEventEnabled) {
            enabled_types.push('Leosac::Audit::DoorEvent');
        }
        if (this.credentialEventEnabled) {
            enabled_types.push('Leosac::Audit::CredentialEvent');
        }
        if (this.scheduleEventEnabled) {
            enabled_types.push('Leosac::Audit::ScheduleEvent');
        }
        if (this.groupEventEnabled) {
            enabled_types.push('Leosac::Audit::GroupEvent');
        }
        if (this.userGroupMembershipEventEnabled) {
            enabled_types.push('Leosac::Audit::UserGroupMembershipEvent');
        }
        if (this.updateEventEnabled) {
            enabled_types.push('Leosac::Audit::UpdateEvent');
        }
        if (this.zoneEventEnabled) {
            enabled_types.push('Leosac::Audit::ZoneEvent');
        }

        // small hack because we can't put the value of currentPage to a negative value,
        // otherwise, we have to restart the server. This is currently being fixed,
        // but in the mean time,that will fix it

        let currentPage = Number.parseInt(this.currentPage) || 1;
        if (currentPage <= 0 || typeof currentPage !== 'number') {
            currentPage = 1;
        }
        const pageSize = Number.parseInt(this.pageSize) || 25;

        const progressSetter = (v) => {
            this.progressValue = v;
        };

        this.fetchingData = true;
        this.auditLog.findAllByTypes(enabled_types,
            currentPage, pageSize, progressSetter).then((result) => {
            this.totalPage = result.meta.total_page;
            this.resultCount = result.meta.count;
            this.audits.content = result.data;
            progressSetter(0);
            this.fetchingData = false;
        });
    }
}
