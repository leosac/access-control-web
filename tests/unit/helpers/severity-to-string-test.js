
import { severityToString } from 'web/helpers/severity-to-string';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | severity to string', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it works', function(assert) {
    let result = severityToString([42]);
    assert.ok(result);
  });
});
