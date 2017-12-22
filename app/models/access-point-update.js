import Update from 'web/models/update';
import DS from 'ember-data';

export default Update.extend({
    accessPoint: DS.belongsTo('access-point', {
        polymorphic: true
    }),
});
