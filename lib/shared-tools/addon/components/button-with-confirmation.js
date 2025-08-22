import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class ButtonWithConfirmation extends Component {
    modalOpen = false;
    onConfirm = null;
    onCancel = null;

    // #bs-button property
    size = 'sm';

    type = 'info';
    icon = '';

    // content
    text = 'My button';

    message = 'Please confirm or cancel your action.';

    @action
    spawnModal() {
        this.set('modalOpen', true);
    }

    @action
    onConfirm() {
        this.set('modalOpen', false);
        if (this.get('onConfirm'))
            this.get('onConfirm')();
    }

    @action
    onCancel() {
        this.set('modalOpen', false);
        if (this.get('onCancel'))
            this.get('onCancel')();
    }
}
