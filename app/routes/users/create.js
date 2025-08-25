import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import LeosacRoute from 'web/leosac-route';
import { UserRank } from 'web/leosac-constant';

export default LeosacRoute.extend({
    router: service(),
    store: service(),
    flashMessages: service(),
    _title: 'users.create.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        const newUser = this.store.createRecord('user');
        newUser.set('rank', 'user');
        return hash({
            user: newUser,
            possibleRanks: UserRank,
        });
    },
    setupController(controller, model)
    {
        this._super(controller, model);
    }
});
