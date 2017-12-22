import AuditEntry from 'web/models/audit-entry';
import DS from 'ember-data';

export default AuditEntry.extend({
    type: 'CredentialEvent',
    target: DS.belongsTo('credential'),
    before: DS.attr('string'),
    after: DS.attr('string'),
});
