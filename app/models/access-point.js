import { computed } from '@ember/object';
import Model, { attr, belongsTo } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const AccesPointValidations = buildValidations({
    alias: validator('presence', true)
});

export default class AccessPointModel extends Model.extend(AccesPointValidations) {
    @computed('id')
    numericId() {
        "use strict";
        return Number(this.get('id'));
    }

    @attr('string')
    alias;
    @attr('string')
    description;
    @attr('string')
    controllerModule;
    @belongsTo('door')
    door;
}
