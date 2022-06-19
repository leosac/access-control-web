
import { indexOf } from 'web/helpers/index-of';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | index of', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it works', function(assert) {
    let result = indexOf([42]);
    assert.ok(result);
  });
});

