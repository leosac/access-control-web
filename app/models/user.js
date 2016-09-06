import Model from 'ember-data/model';
import Ember from 'ember';
import DS from 'ember-data';

export default Model.extend({
    numericId: Ember.computed('id', function ()
    {
        "use strict";
        return Number(this.get('id'));
    }),
    username: DS.attr('string'),
    firstname: DS.attr('string'),
    lastname: DS.attr('string'),
    email: DS.attr('string'),
    memberships: DS.hasMany('user-group-membership', {
        inverse: 'user'
    })
});
