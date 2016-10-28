import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('module-evoxs-updater', 'Integration | Component | module evoxs updater', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{module-evoxs-updater}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#module-evoxs-updater}}
      template block text
    {{/module-evoxs-updater}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
