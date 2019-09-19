import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, triggerKeyEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | Super Modal', function(hooks) {
  setupRenderingTest(hooks);

  test('it has a close button', async function(assert) {
    this.set('didCloseModal', false);

    this.set('closeAction', () => {
      this.set('didCloseModal', true);
    });

    await render(hbs`<SuperModal @onClose={{action closeAction}} />`);

    assert.ok(
      document.body.classList.contains('modal-is-open'),
      'body tag is annotated with class'
    );

    // Modal dialogs aren't where you expect them
    await click('[data-test-selector="modal-close-button"]');

    let didCloseModal = this.get('didCloseModal');

    assert.ok(didCloseModal, 'modal was closed');

    assert.notOk(
      document.body.classList.contains('modal-is-open'),
      'body tag has annotation class removed'
    );
  });

  test('it closes when "ESC" is pressed', async function(assert) {
    this.set('didCloseModal', false);

    this.set('closeAction', () => {
      this.set('didCloseModal', true);
    });

    await render(hbs`<SuperModal @onClose={{action closeAction}} />`);

    assert.ok(
      document.body.classList.contains('modal-is-open'),
      'body tag is annotated with class'
    );

    await triggerKeyEvent(document, 'keyup', 'Escape');

    let didCloseModal = this.get('didCloseModal');

    assert.ok(didCloseModal, 'modal was closed');

    assert.notOk(
      document.body.classList.contains('modal-is-open'),
      'body tag has annotation class removed'
    );
  });

  module('overlay closing', function() {
    test('it can close when clicking the overlay', async function(assert) {
      this.set('didCloseModal', false);

      this.set('closeAction', () => {
        this.set('didCloseModal', true);
      });

      await render(hbs`<SuperModal @onClose={{action closeAction}} />`);

      assert.ok(
        document.body.classList.contains('modal-is-open'),
        'body tag is annotated with class'
      );

      await click('[data-test-selector="modal-overlay"]');

      let didCloseModal = this.didCloseModal;

      assert.ok(didCloseModal, 'modal was closed');

      assert.notOk(
        document.body.classList.contains('modal-is-open'),
        'body tag has annotation class removed'
      );
    });

    test('clicking to close the overlay can be disbabled', async function(assert) {
      this.setProperties({
        didCloseModal: false,
        closeAction: () => {
          assert.notOk(true, 'something bad happened');
        },
        disableOverlayClose: true,
      });

      await render(hbs`<SuperModal
        @onClose={{action closeAction}}
        @disableOverlayClose={{disableOverlayClose}}
      />`);

      await click('[data-test-selector="modal-overlay"]');

      let didCloseModal = this.didCloseModal;

      assert.notOk(didCloseModal, 'modal was not closed');
    });
  });
});
