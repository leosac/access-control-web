import Ember from 'ember';

/**
 * This component is here to get the correct component name,
 * given an already existing leosac-builtin-access-point-action.
 *
 * Depending on the command, this will select a component
 *
 * You need to pass customAction to the component, so that it can fetch the command name.
 */
export default Ember.Component.extend({
    customAction: null,
    
    getComponentName: Ember.computed(function () {
        let command = this.get('customAction.command');


        // The following statement should never append
        if (!command) {
            console.log('WTF, if you are here, something is wrong with the code,' +
                ' you shouldn\'t use this component outside of the leosac-builtin-access-point-action');
            return {};
        }

        if (command === 'OFF' || command === 'TOGGLE' || command === 'BEEP_OFF' || command === 'BEEP_ON') {
            return 'leosac-access-point-actions/leosac-builtin-access-point-action-no-parameter';
        }
        else if (command === 'ON' || command === 'BEEP') {
            return 'leosac-access-point-actions/leosac-builtin-access-point-action-one-parameter';
        }
        else if (command === ('BLINK')) {
            return 'leosac-access-point-actions/leosac-builtin-access-point-action-two-parameter';
        }
        else if (command === ('CUSTOM')) {
            return 'leosac-access-point-actions/leosac-builtin-access-point-action-custom-parameter';
        }
    })
});
