import Ember from 'ember';

export default Ember.Component.extend({
    getComponentName: Ember.computed(function () {
        let command = this.get('customAction.command');


        // The following statement should never append
        if (!command) {
            console.log('WTF, if you are here, something is wrong with the code,' +
                ' you shouldn\'t use this component outside of the leosac-builtin-access-point-action');
            return {};
        }

        if (command === ('OFF' || 'TOGGLE' || 'BEEP_OFF' || 'BEEP_ON')) {
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

//      // The following statement should never append
//     if (!command) {
//         console.log('WTF, if you are here, something is wrong with the code,' +
//             ' you shouldn\'t use this component outside of the leosac-builtin-access-point-action');
//         return {};
//     }
//
//     if (command === ('OFF' || 'TOGGLE' || 'BEEP_OFF' || 'BEEP_ON')) {
//         return {
//             command: 'This is a ' + command + ' command. It take no parameters.',
//             commandParameter: []
//         };
//     }
//     else if (command === ('ON' || 'BEEP')) {
//         return {
//             command: 'This is a ' + command + ' command. It take one parameter, the duration (in miliseconde)',
//             commandParameter: [
//                 {
//                     label: 'Duration',
//                     field: '3000'
//                 }
//             ]
//         };
//     }
//     else if (command === ('BLINK')) {
//         return {
//             command: 'This is a ' + command + ' command. It take two parameter,' +
//             ' the duration and the speed (in miliseconde)',
//             commandParameter: [
//                 {
//                     label: 'BLINK_DURATION',
//                     field: '3000'
//                 },
//                 {
//                     label: 'BLINK_SPEED',
//                     field: '1000'
//                 }
//             ]
//         };
//     }
//     else if (command === ('CUSTOM')) {
//         return {
//             command: 'This is a ' + command + ' command. It take one parameter. ' +
//             'This will concatenate the string into a usable array. You must be careful in what you type.',
//             commandParameter: [
//                 {
//                     label: '',
//                     field: ''
//
//                 }
//             ]
//         };
//     }
// }),
// arrayOfParams: Ember.computed('params.commandParameter.[]', function() {
//     console.log(this.get('params'));
// })
});
