import AuditEntry from 'web/models/audit-entry';
import DS from 'ember-data';

export default AuditEntry.extend({
    type: 'ZoneEvent',
    target: DS.belongsTo('zone'),
});
