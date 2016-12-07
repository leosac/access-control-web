import Update from 'web/models/update';
import DS from 'ember-data';
import Ember from 'ember';

export default Update.extend({
    accessPoint: DS.belongsTo('evoxs-access-point'),
});
