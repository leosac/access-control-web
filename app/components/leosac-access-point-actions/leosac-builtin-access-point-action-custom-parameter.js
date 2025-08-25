import { action, computed } from '@ember/object';
import Component from '@glimmer/component';

/**
 * You need to provide customAction to that component.
 * customAction is normally autoprovided by the leosac-builtin-access-point-action-params
 *
 */
export default class LeosacBuiltinAccessPointActionCustomParameter extends Component {
    customAction = null;
    command = '';

    constructor(owner, args) {
        super(owner, args);
        let params = this.get('customAction.params');

        /**
         * If there is already params in the action,
         * it will fetch the custom command, and its parameter, if there is one
         */
        if (!!params) {
            let arrayOfProperty = [];

            this.set('command', parseInt(params[0]));
            if (params[1]) {
                params[1].forEach((param) => {
                    arrayOfProperty.push(param);
                });
            }
            this.set('properties', arrayOfProperty);
        }

        this.properties = this.properties || [];
    }

    /**
     * This is a bit hackish, but to update the customAction.params,
     * we use a Computed property that his only purpose is to refresh the customAction.params,
     * given the command and properties
     */
    @computed('command','properties')
    get params() {
        let command = this.get('command');
        let arrayOfProperties = this.get('properties');

        this.set('customAction.params', [command, arrayOfProperties]);
    }

    /**
     * This will add an empty string to the properties.
     * Thanks to that, you can enumerate on a new parameter
     */
    @action
    addProperty() {
        this.get('properties').pushObject('');
    }

    /**
     * This will set the property at the {{index}} with the new {{value}}
     * @param index
     * @param value
     */
    @action
    setValue(index, value) {
        let properties = this.get('properties');
        properties[index] = value;
        this.set('properties', properties);
    }
}
