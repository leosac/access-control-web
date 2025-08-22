import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class ScheduleTimeframe extends Component {
    form = null;
    
    constructor(owner, args) {
        super(owner, args);
        this.timeframe = {
            enabledOnMonday: false,
            enabledOnTuesday: false,
            enabledOnWednesday: false,
            enabledOnThursday: false,
            enabledOnFriday: false,
            enabledOnSaturday: false,
            enabledOnSunday: false,
            toggleValue: false,
            startTime: '',
            endTime: '' //DS.attr('H:mm')
        };
    }

    /**
     *  This is a function that will toggle every checkbox day in a timeframe
     */
    @action
    toggleAll() {
        this.set('toggleValue', this.get('toggleValue') !== true);
        this.set('timeframe.enabledOnMonday', this.get('toggleValue'));
        this.set('timeframe.enabledOnTuesday', this.get('toggleValue'));
        this.set('timeframe.enabledOnWednesday', this.get('toggleValue'));
        this.set('timeframe.enabledOnThursday', this.get('toggleValue'));
        this.set('timeframe.enabledOnFriday', this.get('toggleValue'));
        this.set('timeframe.enabledOnSaturday', this.get('toggleValue'));
        this.set('timeframe.enabledOnSunday', this.get('toggleValue'));
    }
}
