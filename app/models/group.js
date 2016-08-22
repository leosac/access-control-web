import Model from 'ember-data/model';
import Ember from 'ember';
import DS from 'ember-data';
// import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
    numericId: Ember.computed('id', function () {
        "use strict";
        return Number(this.get('id'));
    }),
    name: DS.attr('string'),
    members: DS.hasMany('user')
});
