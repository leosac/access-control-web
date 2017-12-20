import Ember from 'ember';

export default Ember.Component.extend({
    init() {
        let duration = this.get('customAction.params');

        if (!duration)
            this.set('customAction.params', 3000);
        this._super(arguments);
    }
});
