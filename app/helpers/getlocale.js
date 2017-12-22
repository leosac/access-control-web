import Ember from 'ember';

// This will get the localStorage
export function getlocale(params/*, hash*/) {
    return localStorage[params[0]];
}

export default Ember.Helper.helper(getlocale);
