import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Controller.extend({
    authSrv: Ember.inject.service('authentication'),
    targetUserId: {},

    canEditProfile: Ember.computed('model.user.version', function ()
    {
        const p = this.get('store').findRecord('user', this.get('authSrv').get('user_id')).then((u) =>
        {
            return u.get('rank') === 'administrator' || u.get('rank') === 'supervisor' || u.get('rank') === 'manager' ||
                this.get('targetUserId') === u.get('id');
        });

        return DS.PromiseObject.create({
            promise: p
        });
    }),
    isProfileLocked: Ember.computed('canEditProfile.content', function ()
    {
        return !this.get('canEditProfile.content');
    }),
    canEditRank: Ember.computed('model.user.version', function ()
    {
        const p = this.get('store').findRecord('user', this.get('authSrv').get('user_id')).then((u) =>
        {
            return u.get('rank') === 'administrator' || u.get('rank') === 'supervisor' || u.get('rank') === 'manager';
        });

        return DS.PromiseObject.create({
            promise: p
        });
    }),
    isRankEditLocked: Ember.computed('canEditRank.content', function ()
    {
        return !this.get('canEditRank.content');
    }),
});
