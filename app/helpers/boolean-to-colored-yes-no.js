import Ember from 'ember';

export default Ember.Helper.extend({
  i18n: Ember.inject.service('i18n'),

  compute(params/*, hash*/) {
      const value = params[0];

      const no = this.get('i18n').t('no');
      const yes = this.get('i18n').t('yes');
      const not_available = this.get('i18n').t('not_available');

      if (value === undefined)
          return not_available;
      if (value === false)
          return '<strong><span style="color: darkred;">' + no + '</span></strong>';
      if (value === true)
          return '<strong><span style="color: green;">' + yes + '</span></strong>';
  }
});
