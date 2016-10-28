import DS from 'ember-data';

export default DS.Model.extend({
    status: DS.attr('string'),
    checkpoint: DS.attr('number'),
    accessPoint: DS.belongsTo('evoxs-access-point'),
});
