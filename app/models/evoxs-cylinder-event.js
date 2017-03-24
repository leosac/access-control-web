import DS from 'ember-data';


/**
 * An event gathered from an EvoXS cylinder.
 *
 * This model is not backed by an adapter. Instead we
 * use the module-evoxs service to retrieve them.
 */
export default DS.Model.extend({
    accessPoint: DS.belongsTo('evoxs-access-point'),
    lockId: DS.attr('number'),
    roomNumber: DS.attr('number'),
    cardId: DS.attr('string'),

    // Enum C++ side -- Leosac serialize this to string.
    type: DS.attr('string'),
    time: DS.attr('utc'),
});
