import Ember from 'ember';

export function formatDuration(params)
{
    let duration = params[0]; // assumed in seconds.
    var date = new Date(null);
    date.setSeconds(duration);
    return date.toISOString().substr(11, 8);
}

export default Ember.Helper.helper(formatDuration);
