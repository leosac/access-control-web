import Ember from 'ember';

export function json(params/*, hash*/) {
  return JSON.stringify(params[0], undefined, '\t');
}

export default Ember.Helper.helper(json);
