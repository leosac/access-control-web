import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | access point form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{access-point-form}}`);

    assert.equal(this.element.innerText.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#access-point-form}}
        template block text
      {{/access-point-form}}
    `);

    assert.equal(this.element.innerText.trim(), 'template block text');
  });
});
