import { computed } from '@ember/object';
import Model, { attr, belongsTo } from '@ember-data/model';

export default class UserGroupMembershipModel extends Model {
    @computed('id')
    numericId() {
        "use strict";
        return Number(this.get('id'));
    }

    @attr('group-rank')
    rank;
    @attr('date-from-unix-timestamp')
    timestamp;
    @belongsTo('group')
    group;
    @belongsTo('user')
    user;
}
