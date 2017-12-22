import LeosacRoute from 'web/leosac-route';
import Ember from 'ember';

export default LeosacRoute.extend({
    store: Ember.inject.service(),
    i18n: Ember.inject.service(),
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
        return this.get('store').findAll('model-name', {reload: true});
    },

    actions: {
        deleteModelName(config)
        {
            const self = this;
            config.destroyRecord({}).then(() =>
                {
                    // correctly deleted
                    this.get('flashMessages').success(this.get('i18n').t('translation.key'));
                    self.transitionTo('list');
                },
                () => {
                    // error while deleting the record
                    this.get('flashMessages').danger(this.get('i18n').t('translation.key'));
                });
        }
    }
});
