import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'Credentials list',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        const blah = Ember.RSVP.defer();
        const tmpArray = [];

        Ember.RSVP.hash({
            wiegandCard: this.get('store').findAll('wiegand-card', {reload: true}),
            pinCode: this.get('store').findAll('pin-code', {reload: true}),
        }).then(function (hash)
        {
            hash.wiegandCard.forEach(function (c)
            {
                console.log("FOUND CARD: " + c.get('alias'));
                tmpArray.push(c);
            });

            hash.pinCode.forEach(function (c)
            {
                console.log("FOUND PING: " + c.get('alias'));
                tmpArray.push(c);
            });

            blah.resolve(tmpArray);
        });

        return blah.promise;
    },
    actions:
    {
/*        deleteGroup(groupId)
        {
            const self = this;
            const model = this.get('store').peekRecord('group', groupId);
            if (model)
            {
                model.destroyRecord({}).then(() =>
                {
                    self.get('flashMessages').success('Group has been deleted.');
                    self.transitionTo('groups.list');
                });
            }
        }*/
    }
});
