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

    get lastLogs() {
        const p = this.store.query('log-message',
            {
                p: parseInt(this.currentLogPage),
                ps: parseInt(this.logPerPage) || 1,
                sort: 'desc'
            });
        p.then((msgs) =>
        {
            p.forEach(function(msg) {
                msg.data.message = msg.data.message.substring(43, 200);
            });
            this.totalLogs = msgs.get('meta').total;
            this.lastLogPage = msgs.get('meta').last;
        });
        return p;
    }
    
    @action
    updateLogPageNumber(n) {
        this.currentLogPage = parseInt(n);
    }

    @action
    TEST_ACTION() {
        alert('in test action controller');
    }
}
