import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import DS from 'ember-data';

export default class extends Controller {
    @service('authentication')
    authSrv;
    @service
    store;
    @service
    flashMessages;

    targetUserId = {};

    @computed('model.user.version')
    canEditProfile() {
        const p = this.store.findRecord('user', this.authSrv.get('user_id')).then((u) =>
        {
            return u.get('rank') === 'administrator' || u.get('rank') === 'supervisor' || u.get('rank') === 'manager' ||
                this.get('targetUserId') === u.get('id');
        });

        return DS.PromiseObject.create({
            promise: p
        });
    }

    @computed('canEditProfile.content')
    isProfileLocked() {
        return !this.get('canEditProfile.content');
    }

    @computed('model.user.version')
    canEditRank() {
        const p = this.store.findRecord('user', this.authSrv.get('user_id')).then((u) =>
        {
            return u.get('rank') === 'administrator' || u.get('rank') === 'supervisor' || u.get('rank') === 'manager';
        });

        return DS.PromiseObject.create({
            promise: p
        });
    }
    
    @computed('canEditRank.content')
    isRankEditLocked() {
        return !this.get('canEditRank.content');
    }

    @action
    editProfile() {
        let user = this.get('model').user;
        user.save().then(() =>
        {
            this.flashMessages.success(this.intl.t('profile.profile_updated') + '.');
        }, (why) =>
        {
            this.flashMessages.danger(this.intl.t('profile_fail_update') + ': ' + why.status_string);
        });
    }
}
