import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';

@classic
export default class ScheduleForm extends Component {
    // `action` and `schedule` must be set.

    // The timeframe currently under edition
    timeframeBuffer = 0;

    @action
    removeTimeframe(timeframeToRemove) {
        const newArray = [];
        this.get('schedule').get('timeframes').forEach((tf) =>
        {
            if (tf !== timeframeToRemove)
            {
                newArray.push(tf);
            }
        });
        this.set('schedule.timeframes', newArray);
    }

    @action
    addTimeframe() {
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
