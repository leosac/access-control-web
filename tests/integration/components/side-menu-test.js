import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | side menu', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });"

    await render(hbs`{{side-menu}}`);

    assert.equal(this.$().text().trim(), '');

    // Template block usage:"
    await render(hbs`
      {{#side-menu}}
        template block text
      {{/side-menu}}
    `);

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
