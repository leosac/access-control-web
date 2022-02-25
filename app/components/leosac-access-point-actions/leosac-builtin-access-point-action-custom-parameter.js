import { computed } from '@ember/object';
import Component from '@ember/component';

/**
 * You need to provide customAction to that component.
 * customAction is normally autoprovided by the leosac-builtin-access-point-action-params
 *
 */

export default Component.extend({
    customAction: null,
    command: '',
    properties: [],

    init() {
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
        this._super(...arguments);
    },

    /**
     * This is a bit hackish, but to update the customAction.params,
     * we use a Computed property that his only purpose is to refresh the customAction.params,
     * given the command and properties
     */
    params: computed('{command,properties}', function () {
        let command = this.get('command');
        let arrayOfProperties = this.get('properties');

        this.set('customAction.params', [command, arrayOfProperties]);
    }),
    actions: {
        /**
         * This will add an empty string to the properties.
         * Thanks to that, you can enumerate on a new parameter
         */
        addProperty() {
            this.get('properties').pushObject('');
        },
        /**
         * This will set the property at the {{index}} with the new {{value}}
         * @param index
         * @param value
         */
        setValue(index, value) {
            let properties = this.get('properties');
            properties[index] = value;
            this.set('properties', properties);
        }
    }
});
