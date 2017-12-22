import Ember from 'ember';
import ENV from 'web/config/environment';
//this will get the env from the config/environment
export function getenv(params/*, hash*/) {
  return ENV.APP[params[0]];
}

export default Ember.Helper.helper(getenv);
