import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class ScheduleForm extends Component {
    // `action` and `schedule` must be set.

    // The timeframe currently under edition
    timeframeBuffer = 0;

    @action
    removeTimeframe(timeframeToRemove) {
        const newArray = [];
        this.args.schedule.get('timeframes').forEach((tf) =>
        {
            if (tf !== timeframeToRemove)
            {
                newArray.push(tf);
            }
        });
        this.args.schedule.set('timeframes', newArray);
    }

    @action
    addTimeframe() {
        const tfs = this.args.schedule.get('timeframes');
        let newArray = [];
        if (Array.isArray(tfs))
        {
            newArray = tfs.slice(0);
        }
        const newTimeframe = {id: newArray.length};
        newArray.push(newTimeframe);
        this.args.schedule.set('timeframes', newArray);
    }
}
