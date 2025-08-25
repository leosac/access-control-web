import { computed } from '@ember/object';
import Model, { attr, belongsTo } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const DoorValidations = buildValidations({
    alias: validator('presence', true)
});


export default class DoorModel extends Model.extend(DoorValidations) {
    @computed('id')
    numericId() {
        "use strict";
        return Number(this.get('id'));
    }

    @attr('string')
    alias;
    @attr('string')
    description;
    @belongsTo('access-point', {inverse: 'door'})
    accessPoint;
}
