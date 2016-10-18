import AuditEntry from 'web/models/audit-entry';
import Ember from 'ember';
import DS from 'ember-data';

export default AuditEntry.extend({
    type: 'UserEvent',
    target: DS.belongsTo('user'),
    before: DS.attr('string'),
    after: DS.attr('string'),
});
