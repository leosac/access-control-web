import AuditEntry from 'web/models/audit-entry';
import DS from 'ember-data';

export default AuditEntry.extend({
    type: 'UserGroupEvent',
    targetUser: DS.belongsTo('user'),
    targetGroup: DS.belongsTo('group'),
});
