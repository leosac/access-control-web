import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Controller.extend({
    auditLog: Ember.inject.service('audit-log'),
    wsapicallEnabled: false,
    userEventEnabled: true,
    doorEventEnabled: true,
    groupEventEnabled: true,
    credentialEventEnabled: true,
    scheduleEventEnabled: true,
    openDetailsModal: false,

    // True is data are being fetched
    fetchingData: false,

    // The audit object that is currently being shown
    // in the details modal.
    detailedAudit: null,
    audits: [],
    watch_: Ember.observer('wsapicallEnabled', 'userEventEnabled', 'doorEventEnabled',
        'groupEventEnabled', 'credentialEventEnabled', 'scheduleEventEnabled', function ()
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
        if (this.get('scheduleEventEventEnabled'))
            enabled_types.push('Leosac::Audit::ScheduleEvent');
        if (this.get('groupEventEventEnabled'))
            enabled_types.push('Leosac::Audit::GroupEvent');

        self.set('fetchingData', true);
        this.get('auditLog').findAllByTypes(enabled_types).then((audits) =>
        {
            self.set('audits', audits);
            self.set('fetchingData', false);
        });
    },
    init(){
        this._super(...arguments);
        this.reload();
    }
});
