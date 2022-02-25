import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    store: service(),
    i18n: service(),
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
        return this.get('store').findAll('wiegand-reader', {reload: true});
    },

    actions: {
        deleteWiegandReader(config)
        {
            const self = this;
            config.destroyRecord({}).then(() =>
                {
                    this.get('flashMessages').success(this.get('i18n').t('configurations.error.remove_success'));
                    self.transitionTo('list');
                },
                () => {
                    this.get('flashMessages').danger(this.get('i18n').t('configurations.error.remove_error'));
                });
        }
    }
});
