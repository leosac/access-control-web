import { helper as buildHelper } from '@ember/component/helper';

export function isUserPartOfMapping(params/*, hash*/) {
    const mapping = params[0];
    const user_id = params[1].toString();

    return mapping.hasMany('users').ids().indexOf(user_id) !== -1;

}

export default buildHelper(isUserPartOfMapping);
