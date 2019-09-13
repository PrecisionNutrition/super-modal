import Component from '@ember/component';
import layout from '../templates/components/super-modal';

export default Component.extend({
  layout,

  classNames: [
    'SuperModal',
  ],

  classNameBindings: [
    'modifierClassName',
    'isIos11'
  ],

  didInsertElement() {
    this._super(...arguments);

    this.listener = (event) => {
      let { key } = event;

      if (key === 'Escape') {
        this.onClose(event);
      }
    };

    document.addEventListener('keyup', this.listener);
  },

  willDestroyElement() {
    this._super(...arguments);

    document.removeEventListener('keyup', this.listener);
  },
});
