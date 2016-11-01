import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('autocomplete/group-typeahead', 'Integration | Component | autocomplete/group typeahead', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{autocomplete/group-typeahead}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#autocomplete/group-typeahead}}
      template block text
    {{/autocomplete/group-typeahead}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
