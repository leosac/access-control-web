import Ember from 'ember';

export function indexOf(params/*, hash*/) {
    const obj = params[0];
    const idx = params[1];

    return obj[idx];
}

export default Ember.Helper.helper(indexOf);
