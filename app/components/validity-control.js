import Component from '@glimmer/component';
import moment from 'moment';

export default class ValidityControl extends Component {
    form = null;
    constructor(owner, args) {
        super(owner, args);
        // Must set 3 attributes.
        //   + enabledProperty: string
        //   + startDate
        //   + endDate

        // Optionally, `disabled` can be set to true so the
        // control is not usable.
        this.minDate = this.minDate || moment('2000-01-01');
        this.maxDate = this.maxDate || moment('2100-01-01');
    }
}
