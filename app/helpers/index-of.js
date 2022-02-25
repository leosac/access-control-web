import { helper as buildHelper } from '@ember/component/helper';

export function indexOf(params/*, hash*/) {
    const obj = params[0];
    const idx = params[1];

    return obj[idx];
}

export default buildHelper(indexOf);
