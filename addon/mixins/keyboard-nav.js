import Mixin from '@ember/object/mixin';

export default Mixin.create({

  bindKeys(el) {
    el.addEventListener('keyup', (e) => {
      if(e.which === 13) {
        this.onEnterPress(e);
      } else if(e.which === 27) {
        this.onEscPress(e);
      } else if(e.which === 40) {
        this.onDownPress(e);
      } else if(e.which === 38) {
        this.onUpPress(e);
      } else {
        this.onCustomPress(e);
      }
    });
  },

  // keypress actions

  onEnterPress() {},

  onEscPress() {},

  onDownPress() {},

  onUpPress() {},

  onCustomPress() {}

});
