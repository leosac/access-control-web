import AuditEntry from 'web/models/audit-entry';
import DS from 'ember-data';

export default AuditEntry.extend({
    type: 'WSAPICall',
    uuid: DS.attr('string'),
    method: DS.attr('string'),
    description: DS.attr('string'),
});
