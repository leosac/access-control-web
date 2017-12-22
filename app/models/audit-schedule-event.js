import AuditEntry from 'web/models/audit-entry';
import DS from 'ember-data';

export default AuditEntry.extend({
    type: 'ScheduleEvent',
    target: DS.belongsTo('schedule'),
    before: DS.attr('string'),
    after: DS.attr('string'),
});
