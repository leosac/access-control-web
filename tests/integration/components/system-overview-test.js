import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | system overview', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });"

    await render(hbs`{{system-overview}}`);

    assert.equal(this.$().text().trim(), '');

    // Template block usage:"
    await render(hbs`
      {{#system-overview}}
        template block text
      {{/system-overview}}
    `);

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
