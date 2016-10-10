import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'Door list',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return this.get('store').findAll('door', {reload: true});
    },
    actions: {
        deleteDoor(door)
        {
            const self = this;
            door.destroyRecord({}).then(() =>
            {
                self.get('flashMessages').success('Door has been deleted.');
                self.transitionTo('door.list');
            });
        }
    }
});
