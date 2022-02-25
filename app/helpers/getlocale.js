import { helper as buildHelper } from '@ember/component/helper';

// This will get the localStorage
export function getlocale(params/*, hash*/) {
    return localStorage[params[0]];
}

export default buildHelper(getlocale);
