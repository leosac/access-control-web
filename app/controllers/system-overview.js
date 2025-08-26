import { action, observer } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service
    store;

    logPerPage = 25;
    currentLogPage = 0;
    totalLogs = 0;
    lastLogPage = 0;

    @observer('logPerPage', function () {
        "use strict";
        // Reset the page number.
        this.set('currentLogPage', 0);
    })
    _obs;

    get lastLogs() {
        "use strict";
        const self = this;
        const p = this.store.query('log-message',
            {
                p: parseInt(this.get('currentLogPage')),
                ps: parseInt(this.get('logPerPage')) || 1,
                sort: 'desc'
            });
        p.then((msgs) =>
        {
            p.forEach(function(msg) {
                msg.data.message = msg.data.message.substring(43, 200);
            });
            self.set('totalLogs', msgs.get('meta').total);
            self.set('lastLogPage', msgs.get('meta').last);
        });
        return p;
    }
    
    @action
    updateLogPageNumber(n) {
        "use strict";
        this.set('currentLogPage', parseInt(n));
    }

    @action
    TEST_ACTION() {
        alert('in test action controller');
    }
}
