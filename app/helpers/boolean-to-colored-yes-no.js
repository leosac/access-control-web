import { htmlSafe } from '@ember/template';
import { service } from '@ember/service';
import Helper from '@ember/component/helper';
// This helper will set the color of the cells in the access overview
export default Helper.extend({
  intl: service(),

  compute(params/*, hash*/) {
      const value = params[0];

      const no = this.intl.t('no');
      const yes = this.intl.t('yes');
      const not_available = this.intl.t('not_available');

      let str = '';
      if (value === undefined) {
          str = not_available;
      }
      if (value === false) {
          str = '<strong><span class="boolean-to-colored-no">' + no + '</span></strong>';
      }
      if (value === true) {
          str = '<strong><span class="boolean-to-colored-yes">' + yes + '</span></strong>';
      }

      return htmlSafe(str);
  }
});
