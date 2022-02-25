import Component from '@ember/component';
import layout from 'shared-tools/templates/components/button-with-confirmation';

export default Component.extend({
    layout,
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
