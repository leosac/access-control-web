import Model, { attr, belongsTo } from '@ember-data/model';

export default class UserGroupMembershipModel extends Model {
    get numericId() {
        return Number(this.get('id'));
    }

    @attr('group-rank')
    rank;
    @attr('date-from-unix-timestamp')
    timestamp;
    @belongsTo('group', { async: true, inverse: null })
    group;
    @belongsTo('user', { async: true, inverse: null })
    user;
}
