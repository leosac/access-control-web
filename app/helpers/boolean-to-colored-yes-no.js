import { htmlSafe } from '@ember/template';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
// This helper will set the color of the cells in the access overview
export default Helper.extend({
  i18n: service('i18n'),

  compute(params/*, hash*/) {
      const value = params[0];

      const no = this.get('i18n').t('no');
      const yes = this.get('i18n').t('yes');
      const not_available = this.get('i18n').t('not_available');

      let str = '';
      if (value === undefined)
          str = not_available;
      if (value === false)
          str = '<strong><span class="boolean-to-colored-no">' + no + '</span></strong>';
      if (value === true)
          str = '<strong><span class="boolean-to-colored-yes">' + yes + '</span></strong>';

      return htmlSafe(str);
  }
});
