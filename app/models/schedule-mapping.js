import { computed } from '@ember/object';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const MappingValidations = buildValidations({
    alias: validator('presence', true),
});

export default DS.Model.extend(MappingValidations, {
    numericId: computed('id', function ()
    {
        "use strict";
        return Number(this.get('id'));
    }),

    alias: DS.attr('string'),
    users: DS.hasMany('user'),
    groups: DS.hasMany('group'),
    doors: DS.hasMany('door'),
    credentials: DS.hasMany('credential', {polymorphic: true}),
    schedule: DS.belongsTo('schedule', {inverse: 'mapping'}),
    version: DS.attr('number')
});
