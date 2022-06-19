import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | my body', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });"

    await render(hbs`{{my-body}}`);

    assert.equal(this.$().text().trim(), '');

    // Template block usage:"
    await render(hbs`
      {{#my-body}}
        template block text
      {{/my-body}}
    `);

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
