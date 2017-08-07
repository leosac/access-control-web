import Ember from 'ember';
import moment from 'moment';
import DS from 'ember-data';

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
        endTime: '' //DS.attr('H:mm')
    },
    init()
    {
        this._super(...arguments);
    },
});
