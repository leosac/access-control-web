import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
    numericId: Ember.computed('id', function ()
    {
        "use strict";
        return Number(this.get('id'));
    }),

    alias: DS.attr('string'),
    users: DS.hasMany('user', {async: true}),
    groups: DS.hasMany('group'),
    credentials: DS.hasMany('credential', {polymorphic: true}),
    version: DS.attr('number')
});
