import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    store: service(),

    allUsers: [],
    init()
    {
        this._super(...arguments);
        const self = this;
        this.get('store').findAll('user', {reload: true}).then((users) =>
        {
            if (!(self.get('isDestroyed'))) {
                self.set('allUsers', users);
            }
        });
    },
});
