import Model from 'ember-data/model';
import Ember from 'ember';
import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const DoorValidations = buildValidations({
    alias: validator('presence', true)
});


export default Model.extend(DoorValidations, {
    numericId: Ember.computed('id', function ()
    {
        "use strict";
        return Number(this.get('id'));
    }),

    alias: DS.attr('string'),
    description: DS.attr('string'),
    accessPoint: DS.belongsTo('access-point', {inverse: 'door'})
});
