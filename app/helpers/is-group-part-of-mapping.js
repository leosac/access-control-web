import Ember from 'ember';

export function isUserPartOfMapping(params/*, hash*/) {
    const mapping = params[0];
    const group_id = params[1].toString();

    return mapping.hasMany('groups').ids().indexOf(group_id) !== -1;

}

export default Ember.Helper.helper(isUserPartOfMapping);
