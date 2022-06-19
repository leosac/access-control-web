import { isUserPartOfMapping } from 'web/helpers/is-user-part-of-mapping';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | is user part of mapping', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it works', function(assert) {
    let result = isUserPartOfMapping([42]);
    assert.ok(result);
  });
});
