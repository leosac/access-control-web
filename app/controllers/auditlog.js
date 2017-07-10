import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Controller.extend({
    auditLog: Ember.inject.service('audit-log'),
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
    audits:  Ember.ArrayProxy.create({ content: Ember.A([]) }),
    watch_: Ember.observer('wsapicallEnabled', 'userEventEnabled', 'doorEventEnabled',
        'groupEventEnabled', `credentialEventEnabled`, 'scheduleEventEnabled', 'userGroupMembershipEventEnabled',
        'updateEventEnabled', 'zoneEventEnabled',
        'currentPage', 'pageSize', function ()
        {
            this.reload();
        }),
    actions: {
        showDetails(audit) {
            this.set('openDetailsModal', true);
            this.set('detailedAudit', audit);
        },
        refresh(){
            this.reload();
        }
    },
    reload(){
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

        const currentPage = Number.parseInt(this.get('currentPage')) || 1;
        const pageSize = Number.parseInt(this.get('pageSize')) || 20;
        const progressSetter = function(v)
        {
            self.set('progressValue', v);
        };

        self.set('fetchingData', true);
        console.log(pageSize);
        this.get('auditLog').findAllByTypes(enabled_types,
            currentPage, pageSize, progressSetter).then((result) =>
        {
            self.set('totalPage', result.meta.total_page);
            self.set('resultCount', result.meta.count);
            self.get('audits').set('content', result.data);

            progressSetter(0);
            self.set('fetchingData', false);
        });
    },
    init(){
        this._super(...arguments);
        this.reload();
    }
});
