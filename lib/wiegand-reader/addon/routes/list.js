import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    store: service(),
    router: service(),
    intl: service(),
    flashMessages: service(),
    _title: 'wiegand-reader.list.title',
    _requireAuth: true,

    init() {
    },
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return this.store.findAll('wiegand-reader', {reload: true});
    },

    actions: {
        deleteWiegandReader(config)
        {
            config.destroyRecord({}).then(() =>
                {
                    this.flashMessages.success(this.intl.t('configurations.error.remove_success'));
                    this.router.transitionTo('list');
                },
                () => {
                    this.flashMessages.danger(this.intl.t('configurations.error.remove_error'));
                });
        }
    }
});
