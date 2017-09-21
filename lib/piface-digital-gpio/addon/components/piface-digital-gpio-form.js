import Ember from 'ember';

export default Ember.Component.extend({
    selected: '',
    allDirection: ['in', 'out'],
    value: false,
    newValue: '',
    allValue: ['true', 'false'],

    init()
    {
        this._super(...arguments);

        this.set('selected', this.get('piface-digital-gpio').get('direction'));
        if (this.get('selected') === 'out') {
            if (this.get('piface-digital-gpio').get('defaultValue'))
                this.set('newValue', 'true');
            else
                this.set('newValue', 'false');
        }

        if (this.get('piface-digital-gpio').get('direction') === 'out')
            this.set('value', true);
    },
    actions: {
        changeSelectedDirection(selected)
        {
            this.get('piface-digital-gpio').set('direction', selected);
            if (selected === 'in')
                this.set('value', false);
            else {
                this.set('value', true);
                if (this.get('piface-digital-gpio').get('defaultValue'))
                    this.set('newValue', 'true');
                else
                    this.set('newValue', 'false');
            }
        },
        changeDefaultValue(selected)
        {
            if (selected === 'true') {
                this.set('newValue', 'true');
                this.get('piface-digital-gpio').set('defaultValue', true);
            }
            else {
                this.set('newValue', 'false');
                this.get('piface-digital-gpio').set('defaultValue', false);
            }
        }
    }
});
