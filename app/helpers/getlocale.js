import Ember from 'ember';

export function getlocale(params/*, hash*/) {
    return localStorage[params[0]];
}

export default Ember.Helper.helper(getlocale);
