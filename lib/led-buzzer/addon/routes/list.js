import { defer, hash } from 'rsvp';
import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    store: service(),
    intl: service(),
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
        const store = this.get('store');

        hash({
            led: store.findAll('led', {reload:true}),
            buzzer: store.findAll('buzzer', {reload: true}),
        }).then((hash) => {
            tmpArray = tmpArray.concat(hash.buzzer.toArray(), hash.led.toArray());
            promise.resolve(tmpArray);
        });

        return promise.promise;
    },

    actions: {
        deleteLedBuzzer(config)
        {
            const self = this;
            config.destroyRecord({}).then(() =>
                {
                    this.refresh();
                    this.get('flashMessages').success(this.get('intl').t('configurations.error.remove_success'));
                    self.transitionTo('list');
                },
                () => {
                    this.get('flashMessages').danger(this.get('intl').t('configurations.error.remove_error'));
                });
        }
    }
});
