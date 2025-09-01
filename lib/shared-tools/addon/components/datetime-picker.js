import { Namespace, TempusDominus } from '@eonasdan/tempus-dominus';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class DatetimePicker extends Component {
    @service('leosac-info')
    leosacInfo;

    picker = null;

    @action
    didInsertElement(element) {
        this.picker = new TempusDominus(element, {
            localization: {
                locale: this.leosacInfo.getLocale()
            },
            restrictions: {
                minDate: this.args.minDate,
                maxDate: this.args.maxDate
            }
        });
        if (this.args.onChange)
        {
        const subscription = this.picker.subscribe(Namespace.events.change, (e) => {
                this.args.onChange(e.date);
            });
        }
    }
}
