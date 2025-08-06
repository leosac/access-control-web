import { action } from '@ember/object';
import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from 'shared-tools/templates/components/button-with-confirmation';

@templateLayout(layout)
@tagName('')
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
