import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    // Needs the `onChange` and `selected` property set.
    // Also needs the `label` property

    // The output of (when something is selected)
    // is a dict {id: ID, name: "name"};

    onChange: undefined,
    selected: '',
    search: service(),

    actions:
    {
        changed(input)
        {
            this.get('onChange')(input);
        },
        // This is a workaround because allowClear from
        // ember-power-select-typeahead doesn't seems to work.
        clear()
        {
            this.set('selected', null);
            this.get('onChange')(null);
        },
        searchGroup(partialName)
        {
            return this.search.findGroupByName(partialName);
        }
    }
});
