import Ember from 'ember';
import DS from 'ember-data';
import {findAllAudits} from 'web/leosac-audit-helper';

export default Ember.Controller.extend({
    wsapicallEnabled: true,
    userEventEnabled: true,

    audits_: Ember.computed('userEventEnabled', 'wsapicallEnabled', function ()
    {
        return DS.PromiseObject.create({
            promise: findAllAudits(this.get('store'))
        });
    }),
    audits: Ember.computed('audits_.content', function ()
    {
        return this.get('audits_.content');
    })
});
