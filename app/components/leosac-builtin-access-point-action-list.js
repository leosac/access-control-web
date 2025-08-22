import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { DeviceClass } from "web/leosac-constant";
import { v4 } from "ember-uuid";

/**
 * This component take an access-point(ap) as a parameter.
 *
 * This page is here to help us CRUD the actions of the leosac-builtin-access-points.
 */
export default class LeosacBuiltinAccessPointActionList extends Component {
    @service
    store;

    ap = null;
    newAction = null;
    selectedDevice = null;
    selectedCommand = null;
    indexErrorAction = 0;
    indexSuccessAction = 0;

    // this will sort the SuccessActions by index. It will be displayed given this Computed property
    @computed('ap.actionOnSuccess')
    get sortedSuccessAction() {
        return this.get('ap.actionOnSuccess').sortBy('index');
    }

    // this will sort the ErrorActions by index. It will be displayed given this Computed property
    @computed('ap.actionOnError')
    get sortedErrorAction() {
        return this.get('ap.actionOnError').sortBy('index');
    }

    // This will help us setting the index, this only purpose for now is the sorting process,
    // but we can also think of a drag and drop in the future
    constructor(owner, args) {
        super(owner, args);
        let i = 0;

        this.get('ap.actionOnSuccess').forEach(() => {
            i++;
        });
        this.set('indexSuccessAction', i);
        this.get('ap.actionOnError').forEach(() => {
            i++;
        });
        this.set('indexErrorAction', i);
        // This is an array of device that can be associated to the access-points action
        this.arrayOfValidDevice = [
            DeviceClass.gpio,
            DeviceClass.buzzer,
            DeviceClass.led,
            DeviceClass.reader
        ];
    }

    /**
     * This computed property will return the available command given the type of the previously selectedDevice
     */
    @computed('selectedDevice.length')
    get availableCommand() {
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
    }

    /**
     * This will add a successAction to the ap
     */
    @action
    addSuccessAction() {
        let selectedDevice = this.get('selectedDevice');
        let selectedCommand = this.get('selectedCommand');
        if (!selectedDevice || !selectedCommand) {
            return;
        }

        let newAction = this.store.createRecord('leosac-builtin-access-point-action', {
            id: v4(),
            command: selectedCommand,
            index: this.get('indexSuccessAction')
        });

        this.store.find(selectedDevice.type, selectedDevice.id).then((device) => {
            newAction.set('target', device);
            this.get('ap').get('actionOnSuccess').addObject(newAction);
        });
        this.set('indexSuccessAction', this.get('indexSuccessAction') + 1);
        this.set('selectedDevice', null);
        this.set('selectedCommand', null);
    }

    /**
     * This will add a errorAction to the ap
     */
    @action
    addErrorAction() {
        let selectedDevice = this.get('selectedDevice');
        let selectedCommand = this.get('selectedCommand');
        if (!selectedDevice || !selectedCommand) {
            return;
        }

        let newAction = this.store.createRecord('leosac-builtin-access-point-action', {
            id: v4(),
            command: selectedCommand,
            index: this.get('indexErrorAction')
        });

        this.store.find(selectedDevice.type, selectedDevice.id).then((device) => {
            newAction.set('target', device);
            this.get('ap').get('actionOnError').addObject(newAction);
        });
        this.set('indexErrorAction', this.get('indexErrorAction') + 1);
        this.set('selectedDevice', null);
        this.set('selectedCommand', null);
    }

    /**
     * This will remove the given successAction from the ap
     */
    @action
    removeSuccessAction(successAction) {
        let actionToRemove = this.store.peekRecord('leosac-builtin-access-point-action', successAction.id);
        actionToRemove.deleteRecord();
    }

    /**
     * This will remove the given removeAction from the ap
     */
    @action
    removeErrorAction(errorAction) {
        let actionToRemove = this.store.peekRecord('leosac-builtin-access-point-action', errorAction.id);
        actionToRemove.deleteRecord();
    }
}
