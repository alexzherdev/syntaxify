import * as t from '@babel/types';

const restParameters = {
  title: 'Rest Parameters',
  body: 'The **rest parameter** syntax allows us to represent an indefinite number of arguments as an array.',
  resources: ['[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)'],
};

const restObjectDestructuring = {
  title: 'Rest in Object Destructuring',
  body:
    'Rest properties collect the remaining property keys that are not already picked off by the destructuring pattern.',
  resources: [
    '[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Rest_in_Object_Destructuring)',
  ],
};

const restArrayDestructuring = {
  title: 'Rest in Array Destructuring',
  body: 'Rest element collects the remaining array items that are not already picked off by the destructuring pattern.',
  resources: [
    '[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Assigning_the_rest_of_an_array_to_a_variable)',
  ],
};

export default {
  RestElement(path) {
    if (path.listKey === 'params') {
      this.addHint(path, restParameters);
    } else if (path.listKey === 'properties') {
      this.addHint(path, restObjectDestructuring);
    } else if (path.listKey === 'elements') {
      this.addHint(path, restArrayDestructuring);
    }
  },
};
