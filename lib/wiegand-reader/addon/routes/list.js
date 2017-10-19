import LeosacRoute from 'web/leosac-route';
import Ember from 'ember';

export default LeosacRoute.extend({
    store: Ember.inject.service(),
    i18n: Ember.inject.service(),
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
                    this.get('flashMessages').success(this.get('i18n').t('wiegand-reader.error.remove_success'));
                    self.transitionTo('list');
                },
                () => {
                    this.get('flashMessages').danger(this.get('i18n').t('wiegand-reader.error.remove_error'));
                });
        },
        editWiegandReader()
        {
            let wiegandReader = this.controller.get('model');

            wiegandReader.save().then(() =>
            {
                this.get('flashMessages').success(this.get('i18n').t('wiegand-reader.error.update_success'));
            }, () =>
            {
                this.get('flashMessages').danger(this.get('i18n').t('wiegand-reader.error.update_error'));
            });
        },
    }
});
