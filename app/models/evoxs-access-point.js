import AccessPoint from 'web/models/access-point';
import Ember from 'ember';
import DS from 'ember-data';

export default AccessPoint.extend({
    lockId: DS.attr('number'),
    checkpoint: DS.attr('number')
});
