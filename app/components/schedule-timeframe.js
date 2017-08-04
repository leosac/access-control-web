import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
    timeframe: {
        enabledOnMonday: false,
        enabledOnTuesday: false,
        enabledOnWednesday: false,
        enabledOnThursday: false,
        enabledOnFriday: false,
        enabledOnSaturday: false,
        enabledOnSunday: false,
        startTime: moment().format('H:mm'),
        endTime: ''
    },
    init()
    {
        this._super(...arguments);
    },
});
