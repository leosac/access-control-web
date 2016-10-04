import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
    // Must set 3 attributes.
    //   + enabled
    //   + startDate
    //   + endDate

    // Optionally, `disabled` can be set to true so the
    // control is not usable.
    minDate: moment('2000-01-01'),
    maxDate: moment('2100-01-01'),
});
