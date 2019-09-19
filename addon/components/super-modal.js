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

  _annotateBodyTag() {
    document.body.classList.add('modal-is-open');
  },

  _removeBodyTagAnnotation() {
    document.body.classList.remove('modal-is-open');
  },

  didInsertElement() {
    this._super(...arguments);

    this._annotateBodyTag();

    this.listener = (event) => {
      let { key } = event;

      if (key === 'Escape') {
        this.send('closeModal', event);
      }
    };

    document.addEventListener('keyup', this.listener);
  },

  willDestroyElement() {
    this._super(...arguments);

    this._removeBodyTagAnnotation();

    document.removeEventListener('keyup', this.listener);
  },

  actions: {
    closeModal() {
      this._removeBodyTagAnnotation();
      this.onClose(...arguments);
    },
  },
});
