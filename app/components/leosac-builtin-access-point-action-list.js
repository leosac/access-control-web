import Ember from 'ember';
import {DeviceClass} from "web/leosac-constant";
import { v4 } from "ember-uuid";

export default Ember.Component.extend({
    store: Ember.inject.service('store'),
    newAction: null,
    selectedDevice: null,
    selectedCommand: null,
    indexErrorAction: 0,
    indexSuccessAction: 0,

    sortedSuccessAction: Ember.computed('ap.actionOnSuccess', function () {
        return this.get('ap.actionOnSuccess').sortBy('index');
    }),
    sortedErrorAction: Ember.computed('ap.actionOnError', function () {
        return this.get('ap.actionOnError').sortBy('index');
    }),

    arrayOfValidDevice: [
        DeviceClass.gpio,
        DeviceClass.buzzer,
        DeviceClass.led,
        DeviceClass.reader],

    init() {
        let i = 0;

        this.get('ap.actionOnSuccess').forEach(() => {
            i++;
        });
        this.set('indexSuccessAction', i);
        this.get('ap.actionOnError').forEach(() => {
            i++;
        });
        this.set('indexErrorAction', i);
      this._super(...arguments);
    },

    availableCommand: Ember.computed('selectedDevice.length', function () {
        let deviceType = this.get('selectedDevice.type');

        if (!deviceType) {
            return;
        }
        let commands = [
            'ON',
            'OFF',
            'TOGGLE'
        ];

        if (deviceType === ('led' || 'buzzer')) {
            commands.push('BLINK');
        }
        else if (deviceType === 'wiegand-reader') {
            return [
                'BEEP',
                'BEEP_ON',
                'BEEP_OFF',
                'CUSTOM'
            ];
        }
        return commands;
    }),
    actions: {
        addSuccessAction() {
            let selectedDevice = this.get('selectedDevice');
            let selectedCommand = this.get('selectedCommand');
            if (!selectedDevice || !selectedCommand)
                return;

            let newAction = this.get('store').createRecord('leosac-builtin-access-point-action', {
                id: v4(),
                command: selectedCommand,
                index: this.get('indexSuccessAction')
            });

            this.get('store').find(selectedDevice.type, selectedDevice.id).then((device) => {
                newAction.set('target', device);
                this.get('ap').get('actionOnSuccess').addObject(newAction);
            });
            this.set('indexSuccessAction', this.get('indexSuccessAction') + 1);
            this.set('selectedDevice', null);
            this.set('selectedCommand', null);
        },
        addErrorAction() {
            let selectedDevice = this.get('selectedDevice');
            let selectedCommand = this.get('selectedCommand');
            if (!selectedDevice || !selectedCommand)
                return;

            let newAction = this.get('store').createRecord('leosac-builtin-access-point-action', {
                id: v4(),
                command: selectedCommand,
                index: this.get('indexErrorAction')
            });

            this.get('store').find(selectedDevice.type, selectedDevice.id).then((device) => {
                newAction.set('target', device);
                this.get('ap').get('actionOnError').addObject(newAction);
            });
            this.set('indexErrorAction', this.get('indexErrorAction') + 1);
            this.set('selectedDevice', null);
            this.set('selectedCommand', null);
        },
        removeSuccessAction(successAction) {
            let actionToRemove = this.get('store').peekRecord('leosac-builtin-access-point-action', successAction.id);
            actionToRemove.deleteRecord();
        },
        removeErrorAction(errorAction) {
            let actionToRemove = this.get('store').peekRecord('leosac-builtin-access-point-action', errorAction.id);
            actionToRemove.deleteRecord();
        }
    }
});
