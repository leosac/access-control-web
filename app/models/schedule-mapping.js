import { computed } from '@ember/object';
import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const MappingValidations = buildValidations({
    alias: validator('presence', true),
});

export default class ScheduleMappingModel extends Model.extend(MappingValidations) {
    @computed('id')
    numericId() {
        "use strict";
        return Number(this.get('id'));
    }

    @attr('string')
    alias;
    @hasMany('user')
    users;
    @hasMany('group')
    groups;
    @hasMany('door')
    doors;
    @hasMany('credential', {polymorphic: true})
    credentials;
    @belongsTo('schedule', {inverse: 'mapping'})
    schedule;
    @attr('number')
    version;
}
