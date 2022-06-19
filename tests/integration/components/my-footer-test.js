import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | my footer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    await render(hbs`{{my-footer}}`);

    assert.equal(this.element.innerText.trim(), '');

    // Template block usage:" + EOL +
    await render(hbs`
      {{#my-footer}}
        template block text
      {{/my-footer}}
    `);

    assert.equal(this.element.innerText.trim(), 'template block text');
  });
});
