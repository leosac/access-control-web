import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

/**
 * You need to provide customAction to that component.
 * customAction is normally autoprovided by the leosac-builtin-access-point-action-params
 *
 */
export default class LeosacBuiltinAccessPointActionCustomParameter extends Component {
    command = '';

    @tracked
    properties;

    constructor(owner, args) {
        super(owner, args);
        let params = this.args.customAction.get('params');

        /**
         * If there is already params in the action,
         * it will fetch the custom command, and its parameter, if there is one
         */
        if (!!params) {
            let arrayOfProperty = [];

            this.command = parseInt(params[0]);
            if (params[1]) {
                params[1].forEach((param) => {
                    arrayOfProperty.push(param);
                });
            }
            this.properties = arrayOfProperty;
        }

        this.properties = this.properties || [];
    }

    /**
     * This is a bit hackish, but to update the customAction.params,
     * we use a Computed property that his only purpose is to refresh the customAction.params,
     * given the command and properties
     */
    get params() {
        this.args.customAction.set('params', [this.command, this.properties]);
    }

    /**
     * This will add an empty string to the properties.
     * Thanks to that, you can enumerate on a new parameter
     */
    @action
    addProperty() {
        this.properties.pushObject('');
    }

    /**
     * This will set the property at the {{index}} with the new {{value}}
     * @param index
     * @param value
     */
    @action
    setValue(index, value) {
        this.properties[index] = value;
        this.properties = this.properties;
    }
}
