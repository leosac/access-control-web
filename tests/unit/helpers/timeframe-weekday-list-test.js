import { timeframeWeekdayList } from 'web/helpers/timeframe-weekday-list';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | timeframe weekday list', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it works', function(assert) {
    let result = timeframeWeekdayList([42]);
    assert.ok(result);
  });
});
