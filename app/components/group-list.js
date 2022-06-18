import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    router: service(),
    init()
    {
      this._super(...arguments);
    },
    actions: {
        gotoItem(id)
        {
            this.router.transitionTo('group', id);
        }
    }
});
