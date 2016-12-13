import DS from 'ember-data';


/**
 * An event gathered from an EvoXS cylinder.
 *
 * This model is not backed by an adapter. Instead we
 * use the module-evoxs service to retrieve them.
 */
export default DS.Model.extend({
    userId: DS.attr('number'),
    lockId: DS.attr('number'),
    state: DS.attr(),
    eventId: DS.attr('number'),
    // Enum C++ side.
    type: DS.attr('number'),
    edtime: DS.attr('utc'),
});
