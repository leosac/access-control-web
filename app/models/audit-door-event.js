import AuditEntry from 'web/models/audit-entry';
import Ember from 'ember';
import DS from 'ember-data';

export default AuditEntry.extend({
    type: 'DoorEvent',
    target: DS.belongsTo('door'),
    before: DS.attr('string'),
    after: DS.attr('string'),
});
