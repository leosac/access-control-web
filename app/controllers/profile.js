import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service('authentication')
    authSrv;
    @service
    store;
    @service
    intl;
    @service
    flashMessages;

    targetUserId = {};

    get canEditProfile() {
        return this.store.findRecord('user', this.authSrv.user_id).then((u) =>
        {
            return u.get('rank') === 'administrator' || u.get('rank') === 'supervisor' || u.get('rank') === 'manager' ||
                this.targetUserId === u.get('id');
        });
    }

    get isProfileLocked() {
        return !this.canEditProfile.content;
    }

    get canEditRank() {
        return this.store.findRecord('user', this.authSrv.user_id).then((u) =>
        {
            return u.get('rank') === 'administrator' || u.get('rank') === 'supervisor' || u.get('rank') === 'manager';
        });
    }
    
    get isRankEditLocked() {
        return !this.canEditRank.content;
    }

    get editProfile() {
        let user = this.model.user;
        user.save().then(() =>
        {
            this.flashMessages.success(this.intl.t('profile.profile_updated') + '.');
        }, (why) =>
        {
            this.flashMessages.danger(this.intl.t('profile_fail_update') + ': ' + why.status_string);
        });
    }
}
