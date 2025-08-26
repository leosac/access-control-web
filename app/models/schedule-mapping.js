import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const MappingValidations = buildValidations({
    alias: validator('presence', true),
});

export default class ScheduleMappingModel extends Model.extend(MappingValidations) {
    get numericId() {
        return Number(this.get('id'));
    }

    @attr('string')
    alias;
    @hasMany('user', { async: true, inverse: null })
    users;
    @hasMany('group', { async: true, inverse: null })
    groups;
    @hasMany('door', { async: true, inverse: null })
    doors;
    @hasMany('credential', { async: true, inverse: null, polymorphic: true })
    credentials;
    @belongsTo('schedule', { async: true, inverse: 'mapping' })
    schedule;
    @attr('number')
    version;
}
