import * as t from '@babel/types';
import { addHint } from './helpers';

const forOf = {
  title: '`for...of` Statement',
  body: 'The `for...of` statement creates a loop iterating over iterable objects.',
  resources: ['[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)'],
};

export default {
  ForOfStatement(path) {
    // TODO: extract `for (...)` part
    addHint(this, path, forOf);
  },
};
