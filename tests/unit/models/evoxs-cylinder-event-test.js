import { module, test } from 'qunit';
import { setupModelTest } from 'ember-qunit';

module('Unit | Model | evoxs cylinder event', function(hooks) {
  setupModelTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let model = this.owner.lookup('evoxs-cylinder-event');
    assert.ok(!!model);
  });
});
