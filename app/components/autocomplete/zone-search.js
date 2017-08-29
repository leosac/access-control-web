import Ember from 'ember';

export default Ember.Component.extend({
    ignoreZone: null,
    // Needs the `onChange` and `selected` property set.
    // Also needs the `label` property
    //form property can be detected with form

    // The output of (when something is selected)
    // is a dict {id: ID, alias: "alias"};

    search: Ember.inject.service('search'),

    actions:
        {
            // This is a workaround because allowClear from
            // ember-power-select-typeahead doesn't seems to work.
            clear()
            {
                this.set('selected', null);
            },
            searchZone(partialAlias)
            {
                let id = parseInt(this.get('ignoreZone').id);
                let data = this.get('search').findZoneByAlias(partialAlias);
                data.then(function(res) {
                    let i = -1;
                    let j = 0;
                    res.forEach(function(obj) {
                        if (obj.id === id)
                            i = j;
                        j += 1;
                    });
                    if (i !== -1)
                        res.splice(i, 1);
                });
                return data;
            }
        }
});