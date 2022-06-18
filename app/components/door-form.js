import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    search: service('search'),
    store: service(),

    // `action` and `door` must be set.
    actions: {
        changeAP(param)
        {
            const door = this.get('door');
            if (param === null)
            {
                // Clearing AP.
                door.set('accessPoint', null);
            }
            else
            {
                this.store.find('access-point', param.id).then((ap) =>
                {
                    door.set('accessPoint', ap);
                });
            }
        }
    },
});
