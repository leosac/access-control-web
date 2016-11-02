import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'evoxs.operations.title',
    _requireAuth: true,
    selectedAccessPoint: null,

    model()
    {
        return this.get('selectedAccessPoint');
    },
    actions:
    {
        changeAP(new_ap)
        {
        }
    }
});
