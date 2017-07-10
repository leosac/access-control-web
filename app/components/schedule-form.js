import Ember from 'ember';

export default Ember.Component.extend({
    // `action` and `schedule` must be set.

    // The timeframe currently under edition
    currentTimeframe: null,
    actions: {
        removeTimeframe()
        {
            const newArray = [];
            this.get('schedule').get('timeframes').forEach((tf) =>
            {
                if (tf !== this.get('currentTimeframe'))
                    newArray.push(tf);
            });
            this.set('schedule.timeframes', newArray);
            this.set('currentTimeframe', null);
        },
        addTimeframe()
        {
            const tfs = this.get('schedule').get('timeframes');
            let newArray = [];
            if (Array.isArray(tfs))
            {
                newArray = tfs.slice(0);
            }
            const newTimeframe = {id: newArray.length};
            newArray.push(newTimeframe);
            this.set('schedule.timeframes', newArray);
            this.set('currentTimeframe', newTimeframe);
        }
    }
});
