import Ember from 'ember';

export default Ember.Component.extend({
    didRender()
    {
        "use strict";
        // Trigger JS code for side-menu.
        $('#side-menu').metisMenu();
    }
});
