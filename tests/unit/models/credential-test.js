import { module, test } from 'qunit';
import { setupModelTest } from 'ember-qunit';

module('Unit | Model | credential', function(hooks) {
  setupModelTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let model = this.owner.lookup('credential');
    assert.ok(!!model);
  });
});
