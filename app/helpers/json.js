import { helper as buildHelper } from '@ember/component/helper';

// stringify a param
export function json(params/*, hash*/) {
  return JSON.stringify(params[0], null, 4);
}

export default buildHelper(json);
