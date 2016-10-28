import Ember from 'ember';

export function booleanToColoredYesNo(params/*, hash*/) {
  const value = params[0];

    if (value === undefined)
        return 'N/A';
    if (value === false)
        return '<strong><span style="color: darkred;">No</span></strong>';
    if (value === true)
        return '<strong><span style="color: green;">Yes</span></strong>';
}

export default Ember.Helper.helper(booleanToColoredYesNo);
