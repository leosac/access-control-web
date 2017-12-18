import Ember from 'ember';

export default Ember.Component.extend({
    newAction: null,
    actions: {
        addSuccessAction() {
            let successAction = this.get('newAction');
            const self = this;

            if (!successAction)
                return;
            this.get('store').find('leosac-builtin-point-access-action', successAction.id).then((newSuccessAction) => {
                self.get('ap').get('actionOnSuccess').addObject(newSuccessAction);
                self.set('newAction', null);
            });
        },
        addErrorAction() {
            let errorAction = this.get('newAction');
            const self = this;

            if (!errorAction)
                return;
            this.get('store').find('leosac-builtin-point-access-action', errorAction.id).then((newErrorAction) => {
                self.get('ap').get('actionOnSuccess').addObject(newErrorAction);
                self.set('newAction', null);
            });
        }
    }
});
