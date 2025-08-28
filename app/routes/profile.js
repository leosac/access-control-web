import { hash } from 'rsvp';
import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';
import { UserRank } from 'web/leosac-constant';

export default class ProfileRoute extends LeosacRoute {
    @service('password-change')
    passwordChange;
    @service
    store;
    @service
    intl;
    @service
    flashMessages;
    _title = 'profile.title';
    _requireAuth = true;
    passwordInfo = null;

    model(params)
    {
        return hash({
            user: this.store.findRecord('user', params.user_id),
            possibleRanks: UserRank,
            currentUser: this.store.findRecord('user', this.authSrv.user_id),
        });
    }

    setupController(controller, model)
    {
        this._super(controller, model);
        controller.model = model;
        controller.targetUserId = this.paramsFor('profile').user_id;
    }

    resetController(controller, isExiting/*, transition*/)
    {
        // Rollback change when leaving the page.
        if (isExiting)
        {
            const user = this.controller.model.user;
            if (user) {
                user.rollbackAttributes();
            }
        }
    }
}
