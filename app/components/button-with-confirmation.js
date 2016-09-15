import Ember from 'ember';

export default Ember.Component.extend({
    tagName: '',
    modalOpen: false,
    onConfirm: null,
    onCancel: null,

    // #bs-button property
    size: 'sm',
    type: 'info',
    icon: '',

    // content
    text: 'My button',
    message: 'Please confirm or cancel your action.',

    actions: {
        spawnModal()
        {
            this.set('modalOpen', true);
        },
        onConfirm()
        {
            this.set('modalOpen', false);
            if (this.get('onConfirm'))
                this.get('onConfirm')();
        },
        onCancel()
        {
            this.set('modalOpen', false);
            if (this.get('onCancel'))
                this.get('onCancel')();
        }
    }
});
