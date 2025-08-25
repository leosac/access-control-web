import AuditEntry from 'web/models/audit-entry';
import { belongsTo } from '@ember-data/model';

export default class AuditUserGroupMembershipEvent extends AuditEntry {
    type = 'UserGroupEvent';
    @belongsTo('user')
    targetUser;
    @belongsTo('group')
    targetGroup;
}
