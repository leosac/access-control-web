import Model from 'ember-data/model';
import Ember from 'ember';
import DS from 'ember-data';

export default Model.extend({
    numericId: Ember.computed('id', function () {
        "use strict";
        return Number(this.get('id'));
    }),
    memberCount: Ember.computed('members', function (){
        return this.get('memberships.length');
    }),
    name: DS.attr('string'),
    memberships: DS.hasMany('user-group-membership', {
        inverse: 'group'
    })
});
