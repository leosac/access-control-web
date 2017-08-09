import Ember from 'ember';

export default Ember.Component.extend({
    search: Ember.inject.service('search'),
    store: Ember.inject.service(),

    aliasToObject: {},
    allAlias: [],
    selectedAlias: false,
    zoneVar: false,

    // `action` and `door` must be set.
    didReceiveAttrs()
    {
        const self = this;

        const aliasToObject = {};
        const alias = [];
        this.get('store').findAll('zone', {reload: true}).then((zones) =>
        {
            zones.forEach((zone) =>
            {
                alias.push(zone.get('alias'));
                aliasToObject[zone.get('alias')] = zone;
            });
            self.set('allAlias', alias);
            self.set('aliasToObject', asliasToObject);
        });
    },
    actions: {
        changeDoor(param)
        {
            const zone = this.get('zone');
            if (param === null)
            {
                // Clearing AP.
                zone.set('door', null);
            }
            else
            {
                this.get('store').find('door', param.id).then((d) =>
                {
                    zone.set('accessPoint', door);
                });
            }
        }
    },
    addToZone()
    {
        const store = this.get('store');
        const fm = this.get('flashMessages');

        const zone = this.get('aliasToObject')[this.get('selectedAlias')];
        if (!zone)
        {
            fm.danger('Cannot find this zone.');
            return;
        }

        const membership = store.createRecord('zone-zone-membership');
        membership.set('zoneVar', this.get('zone'));
        membership.set('zone', zone);

        membership.save().then(() =>
            {
                fm.success('Successfully added zone to zone.');
            },
            () =>
            {
                fm.danger('Failed to add zone to zone');
                membership.deleteRecord();
            });
    }
});
