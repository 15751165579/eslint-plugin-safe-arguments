const rule = require('../../../lib/rules/max-and-min');
const RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({ parser: 'babel-eslint' });

const error = {
  type: 'CallExpression',
  message: 'Math.max or Math.min at least two parameters',
}

const ruleTester = new RuleTester();

ruleTester.run('max-and-min', rule, {
  valid: [
    'Math.max(0, 20)',
    'Math.min(10, 20, 30)',
    'Math.max.call(null, 10, 20)',
    'Math.min.call(null, 20, 30)',
    'Math.max.apply(null, [20, 30])',
    'Math.min.apply(null, [20, 10])',
    'const s = Math.max(20, s)'
  ],
  invalid: [
    {
      code: 'Math.max(20)',
      output: 'Math.max(20)',
      errors: [error]
    },
    {
      code: 'Math.min(20)',
      output: 'Math.min(20)',
      errors: [error]
    },
    {
      code: 'Math.max.call(this, 20)',
      output: 'Math.max.call(this, 20)',
      errors: [error]
    },
    {
      code: 'Math.min.call(this, 20)',
      output: 'Math.min.call(this, 20)',
      errors: [error]
    },
    {
      code: 'Math.max.apply(this, [20])',
      output: 'Math.max.apply(this, [20])',
      errors: [error]
    },
    {
      code: 'Math.min.apply(this, [20])',
      output: 'Math.min.apply(this, [20])',
      errors: [error]
    },
    {
      code: 'Math.min.apply(this, 20)',
      output: 'Math.min.apply(this, 20)',
      errors: [error]
    },
    {
      code: 'const s = Math.max(20)',
      output: 'const s = Math.max(20)',
      errors: [error]
    }
  ]
})