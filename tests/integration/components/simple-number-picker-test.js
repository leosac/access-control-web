import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | simple number picker', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });"

    await render(hbs`{{simple-number-picker}}`);

    assert.equal(this.$().text().trim(), '');

    // Template block usage:"
    await render(hbs`
      {{#simple-number-picker}}
        template block text
      {{/simple-number-picker}}
    `);

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
