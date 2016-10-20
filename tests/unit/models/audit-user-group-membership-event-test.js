import { moduleForModel, test } from 'ember-qunit';

moduleForModel('audit-user-group-membership-event', 'Unit | Model | audit user group membership event', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
