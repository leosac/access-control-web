import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import DS from 'ember-data';

export default Controller.extend({
    authSrv: service('authentication'),
    store: service(),
    targetUserId: {},

    canEditProfile: computed('model.user.version', function ()
    {
        const p = this.store.findRecord('user', this.authSrv.get('user_id')).then((u) =>
        {
            return u.get('rank') === 'administrator' || u.get('rank') === 'supervisor' || u.get('rank') === 'manager' ||
                this.get('targetUserId') === u.get('id');
        });

        return DS.PromiseObject.create({
            promise: p
        });
    }),
    isProfileLocked: computed('canEditProfile.content', function ()
    {
        return !this.get('canEditProfile.content');
    }),
    canEditRank: computed('model.user.version', function ()
    {
        const p = this.store.findRecord('user', this.authSrv.get('user_id')).then((u) =>
        {
            return u.get('rank') === 'administrator' || u.get('rank') === 'supervisor' || u.get('rank') === 'manager';
        });

        return DS.PromiseObject.create({
            promise: p
        });
    }),
    isRankEditLocked: computed('canEditRank.content', function ()
    {
        return !this.get('canEditRank.content');
    }),
});
