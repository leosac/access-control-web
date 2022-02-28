import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'buzzers.title',
    _requireAuth: true,
    store: service('store'),
    intl: service(),

    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model(params)
    {
        "use strict";
        return this.get('store').findRecord('buzzer', params.buzzer_id);
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
        editBuzzer()
        {
            let buzzer = this.controller.get('model');

            buzzer.save().then(() =>
            {
                this.get('flashMessages').success(this.get('intl').t('configurations.error.update_success'));
            }, () =>
            {
                this.get('flashMessages').danger(this.get('intl').t('configurations.error.update_error'));
            });
        },
        deleteLedBuzzer()
        {
            const self = this;
            const model = this.controller.get('model');
            model.destroyRecord({}).then(() =>
            {
                self.get('flashMessages').success('Buzzer has been deleted.');
                self.transitionTo('list');
            });
        }
    }
});
