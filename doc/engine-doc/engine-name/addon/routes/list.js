import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';
import Ember from 'ember';

export default LeosacRoute.extend({
    store: service(),
    router: service(),
    intl: service(),
    flashMessages: service(),
    _title: 'model-name.list.title',
    _requireAuth: true,

    init() {
        this._super(...arguments);
    },
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return this.store.findAll('model-name', {reload: true});
    },

    actions: {
        deleteModelName(config)
        {
            const self = this;
            config.destroyRecord({}).then(() =>
                {
                    // correctly deleted
                    this.flashMessages.success(this.intl.t('translation.key'));
                    this.router.transitionTo('list');
                },
                () => {
                    // error while deleting the record
                    this.flashMessages.danger(this.intl.t('translation.key'));
                });
        }
    }
});
