import * as t from '@babel/types';

const spreadSyntax = {
  title: 'Spread Syntax',
  body: '**Spread syntax** allows an iterable to be expanded in places where zero or more items are expected.',
  resources: ['[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)'],
};

export default {
  SpreadElement(path) {
    this.addHint(path, spreadSyntax);
  },
};
