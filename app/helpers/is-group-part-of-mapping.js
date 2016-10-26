import Ember from 'ember';

export function isUserPartOfMapping(params/*, hash*/) {
    const mapping = params[0];
    const group_id = params[1].toString();

    if (mapping.hasMany('groups').ids().indexOf(group_id) !== -1)
        return true;
    return false;
}

export default Ember.Helper.helper(isUserPartOfMapping);
