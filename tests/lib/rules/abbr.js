/**
 * @fileoverview Forces to import specific modules into specific variable names (practically abbre
 * @author Alex
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/abbr');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('abbr', rule, {

  valid: [{
    code: "import * as ft from 'shared/const/FieldTypes.js'",
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 6,
    },
    options: [{ cases: [{ moduleNameSubstr: 'FieldTypes', expectedVariableName: 'ft' }] }],
  }, {
    code: "import ft from '../FieldTypes.js';import pt from '../PropertyTypes.js'; require('xxx');",
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 6,
    },
    options: [{ cases: [{ moduleNameSubstr: 'FieldTypes', expectedVariableName: 'ft' }, { moduleNameSubstr: 'PropertyTypes', expectedVariableName: 'pt' }] }],
  }, {
    code: "import ft from '../FieldTypes.js';",
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 6,
    },
    options: [{ cases: [{ moduleNameSubstr: 'FieldTypes', expectedVariableName: 'ft' }] }],
  }, {
    code: "// Should pass as FieldTypes is not a module but just subpath \n import * as sssss from 'FieldTypes/IamAModule'; \n import * as sssss2 from 'hello/FieldTypes.js/IamAModule'; import * as sssss3 from 'hello/FieldTypes/IamAModule';",
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 6,
    },
    options: [{ cases: [{ moduleNameSubstr: 'FieldTypes', expectedVariableName: 'ft' }] }],
  }],

  invalid: [{
    code: "import FileTypes from 'FieldTypes.js';  const ft = require('FieldTypes');",
    options: [{ cases: [{ moduleNameSubstr: 'FieldTypes', expectedVariableName: 'ft' }] }],
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 6,
    },
    errors: [{
      message: 'It\'s expected that module with name FieldTypes is imported with appropriate name: "ft"',
      type: 'ImportDeclaration',
    }],
    output: "import ft from 'FieldTypes.js';  const ft = require('FieldTypes');",
  },
  {
    code: "import zxczxc from '../FieldTypes.js'; import zxcwecw from '../PropertyTypes.js';  const ft = require('xxx');",
    options: [{ cases: [{ moduleNameSubstr: 'FieldTypes', expectedVariableName: 'ft' }, { moduleNameSubstr: 'PropertyTypes', expectedVariableName: 'pt' }] }],
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 6,
    },
    errors: [{
      message: 'It\'s expected that module with name FieldTypes is imported with appropriate name: "ft"',
      type: 'ImportDeclaration',
    }, {
      message: 'It\'s expected that module with name PropertyTypes is imported with appropriate name: "pt"',
      type: 'ImportDeclaration',
    }],
    output: "import ft from '../FieldTypes.js'; import pt from '../PropertyTypes.js';  const ft = require('xxx');",
  },
  {
    code: "import * as sssss from 'FieldTypes';",
    options: [{ cases: [{ moduleNameSubstr: 'FieldTypes', expectedVariableName: 'ft' }, { moduleNameSubstr: 'PropertyTypes', expectedVariableName: 'pt' }] }],
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 6,
    },
    errors: [{
      message: 'It\'s expected that module with name FieldTypes is imported with appropriate name: "ft"',
      type: 'ImportDeclaration',
    }],
    output: "import * as ft from 'FieldTypes';",
  },
  ],
});
