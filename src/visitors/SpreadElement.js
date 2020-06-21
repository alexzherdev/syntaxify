import * as t from '@babel/types';
import { addHint } from './helpers';

const spreadSyntax = {
  title: 'Spread Syntax',
  body: '**Spread syntax** allows an iterable to be expanded in places where zero or more items are expected.',
  resources: ['[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)'],
};

export default {
  SpreadElement(path) {
    addHint(this, path, spreadSyntax);
  },
};
