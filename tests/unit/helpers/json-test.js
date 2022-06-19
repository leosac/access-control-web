import { json } from 'web/helpers/json';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | json', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it works', function(assert) {
    let result = json([42]);
    assert.ok(result);
  });
});