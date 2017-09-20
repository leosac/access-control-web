import LeosacRoute from 'web/leosac-route';
import Ember from 'ember';

/**
 * Create a new zone.
 */
export default LeosacRoute.extend({
    _title: 'piface-digital-gpio.create.title',
    store: Ember.inject.service('store'),
    _requireAuth: true,
    selected: '',
    allDirection: ['in', 'out'],

    init() {
        this.set('selected', 'in');
    },
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return this.get('store').createRecord('piface-digital-gpio');
    },
    resetController(controller, isExiting/*, transition*/)
    {
        const mod = this.controller.get('model');
        if (isExiting && mod.get('isNew'))
        {
            mod.unloadRecord();
        }
    },
    actions: {
        logIt() {
          console.log(this.modelFor('create'));
        },
        createPifaceDigitalGpio()
        {
            this.modelFor('create').save().then((d) =>
                {
                    this.get('flashMessages').success('Piface digital GPIO config created.');
                    this.transitionTo('piface-digital-gpio', d.get('id'));
                },
                (why) =>
                {
                    console.log(why);
                    this.get('flashMessages').danger(why);
                });
        }
    }
});
