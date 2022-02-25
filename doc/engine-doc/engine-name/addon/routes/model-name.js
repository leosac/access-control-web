import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'model-name.title', // this is an example of a translation key, up to you
    _requireAuth: true,
    store: Ember.inject.service('store'),
    i18n: Ember.inject.service(),

    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model(params)
    {
        "use strict";
        return this.get('store').findRecord('model-name', params.id);
    },
    resetController(controller, isExiting/*, transition*/)
    {
        // Rollback change when leaving the page.
        if (isExiting)
        {
            const mod = this.controller.get('model');
            if (mod)
                mod.rollbackAttributes();
        }
    },
    actions: {
        editModelName()
        {
            let led = this.controller.get('model');

            led.save().then(() =>
            {
                // correctly saved
                this.get('flashMessages').success(this.get('i18n').t('translation.key'));
            }, () =>
            {
                // error while saving the model
                this.get('flashMessages').danger(this.get('i18n').t('translation.key'));
            });
        },
        deleteModelName()
        {
            const self = this;
            const model = this.controller.get('model');
            model.destroyRecord({}).then(() =>
            {
                // the message is up to you, but remember that you can put a translation key, if you want.
                self.get('flashMessages').success('Model Name has been deleted.');
                self.transitionTo('list');
            });
        }
    }
});
