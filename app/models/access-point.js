import Model from 'ember-data/model';
import Ember from 'ember';
import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const AccesPointValidations = buildValidations({
    alias: validator('presence', true)
});

export default Model.extend(AccesPointValidations, {
    numericId: Ember.computed('id', function ()
    {
        "use strict";
        return Number(this.get('id'));
    }),

    alias: DS.attr('string'),
    description: DS.attr('string'),
    controllerModule: DS.attr('string'),
    door: DS.belongsTo('door')
});
