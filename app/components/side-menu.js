import Ember from 'ember';

export default Ember.Component.extend({
    moduleManager: Ember.inject.service('module-manager'),
    init()
    {
      this._super(...arguments);
    },
    didRender()
    {
        "use strict";
        // Trigger JS code for side-menu.
        $('#side-menu').metisMenu();
    }
});
