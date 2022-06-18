import { hash } from 'rsvp';
import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';
import { UserRank } from 'web/leosac-constant';

export default LeosacRoute.extend({
    passwordChange: service('password-change'),
    store: service(),
    intl: service(),
    flashMessages: service(),
    _title: 'profile.title',
    _requireAuth: true,
    passwordInfo: null,

    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model(params)
    {
        "use strict";
        return hash({
            user: this.store.findRecord('user', params.user_id),
            possibleRanks: UserRank,
            currentUser: this.store.findRecord('user', this.get('authSrv').user_id),
        });
    },
    setupController(controller, model)
    {
        this._super(controller, model);
        controller.set('targetUserId', this.paramsFor('profile').user_id);
    },
    resetController(controller, isExiting/*, transition*/)
    {
        // Rollback change when leaving the page.
        if (isExiting)
        {
            const user = this.controller.get('model').user;
            if (user) {
                user.rollbackAttributes();
            }
        }
    },
    actions: {
        editProfile: function ()
        {
            let user = this.controller.get('model').user;

            user.save().then(() =>
            {
                this.flashMessages.success(this.intl.t('profile.profile_updated') + '.');
            }, (why) =>
            {
                this.flashMessages.danger(this.intl.t('profile_fail_update') + ': ' + why.status_string);
            });
        },
    }
});
