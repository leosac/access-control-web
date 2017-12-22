import Ember from 'ember';

export default Ember.Component.extend({
    // Needs the `onChange` and `selected` property set.
    // Also needs the `label` property
    //form property can be detected with form

    // The output of (when something is selected)
    // is a dict {id: ID, alias: "alias"};

    search: Ember.inject.service('search'),

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
            searchAP(partialAlias)
            {
                return this.get('search').findAccessPointByAlias(partialAlias);
            }
        }
});
