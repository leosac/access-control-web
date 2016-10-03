import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
    // Must set 3 attributes.
    //   + enabled
    //   + startDate
    //   + endDate

    minDate: moment('2000-01-01'),
    maxDate: moment('2100-01-01'),
});
