import { computed } from '@ember/object';
import Model, { attr, hasMany } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const UserValidations = buildValidations(
    {
        username: validator('presence', true),
        firstname:  validator('presence', true),
        lastname:  validator('presence', true),
        email: [
            validator('presence', true),
            validator('format', { type: 'email' })
        ],
    }
);

export default class UserModel extends Model.extend(UserValidations) {
    @computed('id')
    numericId() {
        "use strict";
        return Number(this.get('id'));
    }

    @attr('string')
    username;
    @attr('string')
    firstname;
    @attr('string')
    lastname;
    @attr('string')
    email;
    @attr('string')
    password;
    @attr('user-rank')
    rank;
    @hasMany('user-group-membership', { inverse: 'user' })
    memberships;
    @hasMany('credential', { inverse: 'owner', polymorphic: true, })
    credentials;

    // This is a fake relationship, because server side it
    // does'nt exist directly.
    @hasMany('schedules')
    schedules;
    // Validity information
    @attr('boolean')
    validityEnabled;
    @attr('utc')
    validityStart;
    @attr('utc')
    validityEnd;

    // The ODB version.
    @attr('number')
    version;
}
