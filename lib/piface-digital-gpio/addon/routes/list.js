import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    store: service(),
    intl: service(),
    _title: 'piface-digital-gpios.list.title',
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
        return this.get('store').findAll('piface-digital-gpio', {reload: true});
    },

    actions: {
        deletePifaceDigitalGpio(config)
        {
            const self = this;
            config.destroyRecord({}).then(() =>
                {
                    this.get('flashMessages').success(this.get('intl').t('configurations.error.remove_success'));
                    self.transitionTo('list');
                },
                () => {
                    this.get('flashMessages').danger(this.get('intl').t('configurations.error.remove_error'));
                });
        }
    }
});
