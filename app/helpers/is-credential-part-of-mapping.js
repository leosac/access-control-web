import Ember from 'ember';

export function isUserPartOfMapping(params/*, hash*/) {
    const mapping = params[0];
    const cred_id = params[1].toString();

    if (mapping.hasMany('credentials').ids().indexOf(cred_id) !== -1)
        return true;
    return false;
}

export default Ember.Helper.helper(isUserPartOfMapping);
