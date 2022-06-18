import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    moduleManager: service('module-manager'),
    router: service(),

    init()
    {
      this._super(...arguments);
    },
    actions:
    {
        handleRoute(route)
        {
            this.router.transitionTo(route);
        }
    }
});
