import { defer, hash } from 'rsvp';
import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    store: service(),
    router: service(),
    intl: service(),
    flashMessages: service(),
    _title: 'led-buzzer.list.title',
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
        const promise = defer();
        let tmpArray = [];

        hash({
            led: this.store.findAll('led', {reload:true}),
            buzzer: this.store.findAll('buzzer', {reload: true}),
        }).then((hash) => {
            tmpArray = tmpArray.concat(hash.buzzer.toArray(), hash.led.toArray());
            promise.resolve(tmpArray);
        });

        return promise.promise;
    },

    actions: {
        deleteLedBuzzer(config)
        {
            config.destroyRecord({}).then(() =>
                {
                    this.refresh();
                    this.flashMessages.success(this.intl.t('configurations.error.remove_success'));
                    this.router.transitionTo('list');
                },
                () => {
                    this.flashMessages.danger(this.intl.t('configurations.error.remove_error'));
                });
        }
    }
});
