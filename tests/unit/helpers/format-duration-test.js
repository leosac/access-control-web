import { formatDuration } from '../../../helpers/format-duration';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | format duration', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it works', function(assert) {
    let result = formatDuration([42]);
    assert.ok(result);
  });
});
