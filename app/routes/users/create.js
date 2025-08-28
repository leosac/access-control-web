import { service } from '@ember/service';
import { hash } from 'rsvp';
import LeosacRoute from 'web/leosac-route';
import { UserRank } from 'web/leosac-constant';

export default class extends LeosacRoute {
    @service
    store;

    _title = 'users.create.title';
    _requireAuth = true;
    
    model()
    {
        const newUser = this.store.createRecord('user');
        newUser.set('rank', 'user');
        return hash({
            user: newUser,
            possibleRanks: UserRank,
        });
    }

    setupController(controller, model)
    {
        this._super(controller, model);
    }
}
