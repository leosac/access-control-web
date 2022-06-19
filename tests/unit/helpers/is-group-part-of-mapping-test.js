
import { isGroupPartOfMapping } from 'web/helpers/is-group-part-of-mapping';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | is group part of mapping', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it works', function(assert) {
    let result = isGroupPartOfMapping([42]);
    assert.ok(result);
  });
});
