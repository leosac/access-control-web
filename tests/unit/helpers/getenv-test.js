import { getenv } from 'web/helpers/getenv';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | getenv', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it works', function(assert) {
    let result = getenv([42]);
    assert.ok(result);
  });
});