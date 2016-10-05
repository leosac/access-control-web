import Ember from 'ember';

export default Ember.Component.extend({
    timeframe: {
        enabledOnMonday: false,
        enabledOnTuesday: false,
        enabledOnWednesday: false,
        enabledOnThursday: false,
        enabledOnFriday: false,
        enabledOnSaturday: false,
        enabledOnSunday: false,
        startTime: '',
        endTime: '',
    },
    init()
    {
        this._super(...arguments);
    },
    didRender()
    {
        $('.time_element').timepicki({show_meridian: false,
            max_hour_value:24});
    }
});
