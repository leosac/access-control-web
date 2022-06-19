import { booleanToColoredYesNo } from 'web/helpers/boolean-to-colored-yes-no';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | boolean to colored yes no', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it works', function(assert) {
    let result = booleanToColoredYesNo([42]);
    assert.ok(result);
  });
});
