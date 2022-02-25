import Component from '@ember/component';

export default Component.extend({
    // `action` and `schedule` must be set.

    // The timeframe currently under edition
    timeframeBuffer: 0,
    actions: {
        removeTimeframe(timeframeToRemove)
        {
            const newArray = [];
            this.get('schedule').get('timeframes').forEach((tf) =>
            {
                if (tf !== timeframeToRemove)
                {
                    newArray.push(tf);
                }
            });
            this.set('schedule.timeframes', newArray);
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
        }
    }
});
