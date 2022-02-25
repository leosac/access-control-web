import { hash } from 'rsvp';
import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';
import { UserRank } from 'web/leosac-constant';

export default LeosacRoute.extend({
    passwordChange: service('password-change'),
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
            user: this.get('store').findRecord('user', params.user_id),
            possibleRanks: UserRank,
            currentUser: this.get('store').findRecord('user', this.get('authSrv').user_id),
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
            const fm = this.get('flashMessages');
            const intl = this.get('intl');

            user.save().then(() =>
            {
                fm.success(intl.t('profile.profile_updated') + '.');
            }, (why) =>
            {
                fm.danger(intl.t('profile_fail_update') + ': ' + why.status_string);
            });
        },
    }
});
