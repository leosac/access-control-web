import AuditEntry from 'web/models/audit-entry';
import Ember from 'ember';
import DS from 'ember-data';

export default AuditEntry.extend({
    type: 'UpdateEvent',
    target: DS.belongsTo('update'),
});
