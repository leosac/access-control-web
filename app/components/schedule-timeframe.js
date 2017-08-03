import Ember from 'ember';

export default Ember.Component.extend({
    timeframes: {
        enabledOnMonday: false,
        enabledOnTuesday: false,
        enabledOnWednesday: false,
        enabledOnThursday: false,
        enabledOnFriday: false,
        enabledOnSaturday: false,
        enabledOnSunday: false,
    },
    init()
    {
        this._super(...arguments);
    },
});
