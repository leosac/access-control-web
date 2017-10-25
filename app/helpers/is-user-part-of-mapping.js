import Ember from 'ember';

export function isUserPartOfMapping(params/*, hash*/) {
    const mapping = params[0];
    const user_id = params[1].toString();

    return mapping.hasMany('users').ids().indexOf(user_id) !== -1;

}

export default Ember.Helper.helper(isUserPartOfMapping);
