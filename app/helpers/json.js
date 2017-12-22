import Ember from 'ember';

// stringify a param
export function json(params/*, hash*/) {
  return JSON.stringify(params[0], null, 4);
}

export default Ember.Helper.helper(json);
