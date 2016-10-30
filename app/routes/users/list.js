import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'users.list.title',
    _requireAuth: true,
    model()
    {
        "use strict";
        return this.get('store').findAll('user');
    },
});
