import { helper as buildHelper } from '@ember/component/helper';

// This will return true or false depending if a user is part of a group
export function isUserPartOfMapping(params/*, hash*/) {
    const mapping = params[0];
    const cred_id = params[1].toString();

    return mapping.hasMany('credentials').ids().indexOf(cred_id) !== -1;

}

export default buildHelper(isUserPartOfMapping);
