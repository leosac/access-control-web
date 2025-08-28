import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class GroupTypeahead extends Component {
    // Needs the `onChange` and `selected` property set.
    // Also needs the `label` property

    // The output of (when something is selected)
    // is a dict {id: ID, name: "name"};
    selected = '';

    @service
    search;

    @action
    changed(input) {
        this.args.onChange(input);
    }

    // This is a workaround because allowClear from
    // ember-power-select-typeahead doesn't seems to work.
    @action
    clear() {
        this.selected = null;
        this.args.onChange(null);
    }

    @action
    searchGroup(partialName) {
        return this.search.findGroupByName(partialName);
    }
}
