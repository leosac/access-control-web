import Ember from 'ember';
import DS from 'ember-data';
import {findAudits, findAllAudits} from 'web/leosac-audit-helper';

export default Ember.Controller.extend({
    wsapicallEnabled: true,
    userEventEnabled: true,

    audits_: Ember.computed('userEventEnabled', 'wsapicallEnabled', function ()
    {
        return DS.PromiseObject.create({
            promise: findAudits(this.get('store'), this.get('wsapicallEnabled'))
        });
    }),
    audits: Ember.computed('audits_.content', function ()
    {
        return this.get('audits_.content');
    })
});
