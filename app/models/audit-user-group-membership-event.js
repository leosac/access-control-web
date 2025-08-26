import AuditEntry from 'web/models/audit-entry';
import { belongsTo } from '@ember-data/model';

export default class AuditUserGroupMembershipEvent extends AuditEntry {
    type = 'UserGroupEvent';
    @belongsTo('user', { async: true, inverse: null })
    targetUser;
    @belongsTo('group', { async: true, inverse: null })
    targetGroup;
}
