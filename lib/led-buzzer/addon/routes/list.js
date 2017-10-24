import LeosacRoute from 'web/leosac-route';
import Ember from 'ember';

export default LeosacRoute.extend({
    store: Ember.inject.service(),
    i18n: Ember.inject.service(),
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
        const promise = Ember.RSVP.defer();
        let tmpArray = [];
        const store = this.get('store');

        Ember.RSVP.hash({
            led: store.findAll('led', {reload:true}),
            buzzer: store.findAll('buzzer', {reload: true}),
        }).then((hash) => {
            console.log(hash);
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
                    this.get('flashMessages').success(this.get('i18n').t('led-buzzer.error.remove_success'));
                    self.transitionTo('list');
                },
                () => {
                    this.get('flashMessages').danger(this.get('i18n').t('led-buzzer.error.remove_error'));
                });
        },
        enableLedBuzzer(ledOrBuzzerObject)
        {
            let type = ledOrBuzzerObject.get('deviceClass');

            this.get('store').find(type, ledOrBuzzerObject.id).then((config) => {
                config.enabled = config.get('enabled') !== true;
                config.save();
            });
        },
    }
});
