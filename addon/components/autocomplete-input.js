import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import layout from '../templates/components/autocomplete-input';
import KeyboardNavMixin from '../mixins/keyboard-nav';
import { later } from '@ember/runloop';

export default Component.extend(KeyboardNavMixin, {
  classNames: ['autocomplete-input'],
  classNameBindings: ['hasFocus'],
  layout,

  // Attributes

  name: '',

  resultName: 'name',

  resultValue: 'value',

  results: [],

  highlightedResultIndex: -1,

  term: '',

  lastTerm: '',

  placeholder: '',

  autocomplete: false,

  nameGen: computed('name', function(){
    return this.name || `autocomplete_${Math.floor(Math.random() * 0xFFFFFF)}`
  }),

  'on-focus-in'(){},
  'on-focus-out'(){},
  // Properties

  hasFocus: false,
  highlightedResult: computed('results.[]', 'highlightedResultIndex', function() {
    return this.get('results')[this.get('highlightedResultIndex')];
  }),

  hasResults: computed.notEmpty("results"),

  // Observers

  termDidChange: observer('term', function() {
    this.send('updateTerm', this.get('term'));
  }),

  // Hooks

  didInsertElement() {
    let inputEl = this.element.querySelector('input[type="text"]');
    this.bindKeys(inputEl);
    this.set('lastTerm', this.get('term'));
  },

  onInputFocusIn() {
    this.set('hasFocus', true);
    this['on-focus-in']();
  },

  onInputFocusOut() {
    later(()=> {
      this.set('hasFocus', false);
      this['on-focus-out']();
    }, 250)
  },

  // Keyboard Nav actions

  onEnterPress() {
    let result = this.get("results")[this.get("highlightedResultIndex")];

    if(result) {
      this.send("selectResult", result);
    }
  },

  onEscPress() {
    this.send("clearSearch");
  },

  onDownPress() {
    let index = 0;

    if(this.get("highlightedResultIndex") >= 0) {
      index = this.get("highlightedResultIndex") + 1;
    }

    if(index > this.get("results").length - 1) {
      index = 0;
    }

    this.set("highlightedResultIndex", index);
  },

  onUpPress() {
    let lastItem = this.get("results").length - 1;
    let index = lastItem;

    if(this.get("highlightedResultIndex") >= 0) {
      index = this.get("highlightedResultIndex") - 1;
    }

    if(index < 0) {
      index = lastItem;
    }

    this.set("highlightedResultIndex", index);
  },

  actions: {
    selectResult(result) {
      this.sendAction('selectResult', result);
    },

    updateTerm(term) {
      if (term !== this.get('lastTerm')) {
        this.set('lastTerm', term);
        this.sendAction('updateTerm', term);
      }
    },

    clearSearch() {
      this.sendAction("clearSearch");
    }
  }


});
