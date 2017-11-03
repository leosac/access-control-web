import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'wiegand-reader.title',
    _requireAuth: true,
    i18n: Ember.inject.service(),

    beforeModel() {
        "use strict";
        return this._super();
    },
    model(params) {
        "use strict";
        return this.get('store').findRecord('wiegand-reader', params.wiegand_reader_id);
    },
    resetController(controller, isExiting/*, transition*/) {
        // Rollback change when leaving the page.
        if (isExiting) {
            const mod = this.controller.get('model');
            if (mod)
                mod.rollbackAttributes();
        }
    },
    actions: {
        editWiegandReader() {
            let wiegandReader = this.controller.get('model');

            wiegandReader.save().then(() => {
                this.get('flashMessages').success(this.get('i18n').t('wiegand-reader.error.update_success'));
            }, () => {
                this.get('flashMessages').danger(this.get('i18n').t('wiegand-reader.error.update_error'));
            });
        },
        deleteWiegandReader()
        {
            const self = this;
            const model = this.controller.get('model');
            model.destroyRecord({}).then(() =>
            {
                self.get('flashMessages').success('Wiegand Reader has been deleted.');
                self.transitionTo('list');
            });
        }
    }
});
