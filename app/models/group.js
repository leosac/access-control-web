import { computed } from '@ember/object';
import Model, { attr, hasMany } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const GroupValidations = buildValidations(
    {
        name:
            [
                validator('presence', true),
                validator('ds-error'),
                validator('length',
                    {
                        min: 3,
                        max: 50,
                    })
            ]
    }
);

export default class GroupModel extends Model.extend(GroupValidations) {
    @computed('id')
    numericId() {
        "use strict";
        return Number(this.get('id'));
    }

    @computed('memberships')
    memberCount() {
        return this.get('memberships.length');
    }

    @attr('string')
    name;
    @attr('string')
    description;
    @hasMany('user-group-membership', { inverse: 'group' })
    memberships;
    // This is a fake relationship, because server side it
    // does'nt exist directly.
    @hasMany('schedules')
    schedules;
}
