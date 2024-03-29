import { helper as buildHelper } from '@ember/component/helper';

// converte a boolean to a string, depending of the given boolean
export function timeframeWeekdayList(params/*, hash*/) {
    const timeframe = params[0];
    const weekdays = [];

    if (timeframe.enabledOnMonday) {
        weekdays.push('Monday');
    }
    if (timeframe.enabledOnTuesday) {
        weekdays.push('Tuesday');
    }
    if (timeframe.enabledOnWednesday) {
        weekdays.push('Wednesday');
    }
    if (timeframe.enabledOnThursday) {
        weekdays.push('Thursday');
    }
    if (timeframe.enabledOnFriday) {
        weekdays.push('Friday');
    }
    if (timeframe.enabledOnSaturday) {
        weekdays.push('Saturday');
    }
    if (timeframe.enabledOnSunday) {
        weekdays.push('Sunday');
    }

    return weekdays.join(', ');
}

export default buildHelper(timeframeWeekdayList);
