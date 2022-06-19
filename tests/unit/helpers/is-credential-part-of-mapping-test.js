
import { isCredentialPartOfMapping } from 'web/helpers/is-credential-part-of-mapping';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | is credential part of mapping', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it works', function(assert) {
    let result = isCredentialPartOfMapping([42]);
    assert.ok(result);
  });
});
