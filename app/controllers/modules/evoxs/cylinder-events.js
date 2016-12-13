import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Controller.extend({
    evoxs: Ember.inject.service('module-evoxs'),
    pageSize: 25,
    currentPage: 1,
    totalPage: 0,
    resultCount: 0,

    events: [],
    watch_: Ember.observer('currentPage', 'pageSize', function ()
        {
            this.reload();
        }),
    actions: {
        refresh(){
            this.reload();
        }
    },
    reload(){
        const self = this;

        const page = Number.parseInt(this.get('currentPage'));
        const pageSize = Number.parseInt(this.get('pageSize'));

        this.get('evoxs').getEvents(page, pageSize).then((result) =>
        {
            self.get('store').unloadAll('evoxs-cylinder-event');
            // Again, unloadAll in asynchronous ...
            Ember.run.next(() => {
                self.get('store').pushPayload(result);
                self.set('totalPage', result.meta.total_page);
                self.set('resultCount', result.meta.count);
                self.set('events', self.get('store').findAll('evoxs-cylinder-event'));
            });
        });
    },
    init(){
        this._super(...arguments);
        this.reload();
    }
});
