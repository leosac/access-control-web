import Ember from 'ember';

export default Ember.Controller.extend({
    logPerPage: 25,
    currentLogPage: 0,
    totalLogs: 0,
    lastLogPage: 0,
    _obs: Ember.observer('logPerPage', function ()
    {
        "use strict";
        // Reset the page number.
        this.set('currentLogPage', 0);
    }),
    lastLogs: Ember.computed('logPerPage', 'currentLogPage', function ()
    {
        "use strict";
        const self = this;
        const p = this.get('store').query('log-message',
            {
                p: parseInt(this.get('currentLogPage')),
                ps: parseInt(this.get('logPerPage')),
                sort: 'desc'
            });
        p.then((msgs) =>
        {
            self.set('totalLogs', msgs.get('meta').total);
            self.set('lastLogPage', msgs.get('meta').last);
        });
        return p;
    }),
    actions: {
        updateLogPageNumber(n)
        {
            "use strict";
            this.set('currentLogPage', parseInt(n));
        },
    }
});
