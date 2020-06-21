import * as t from '@babel/types';
import { addHint } from './helpers';

const taggedTemplate = {
  title: 'Tagged Templates',
  body: 'Tags allow you to parse template literals with a function.',
  resources: [
    '[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates)',
  ],
};

export default {
  TaggedTemplateExpression(path) {
    addHint(this, path.get('tag'), taggedTemplate);
  },
};
