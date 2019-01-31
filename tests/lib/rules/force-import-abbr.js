/**
 * @fileoverview Forces to import specific modules into specific variable names (practically abbre
 * @author Alex
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/force-import-abbr"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("force-import-abbr", rule, {

    valid: [{
            code: "import * as ft from 'shared/const/FieldTypes.js'",
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 6,
			},
            options: [{ moduleNameSubstr: 'FieldTypes', expectedVariableName: 'ft' }]
        },{
            code: "import ft from '../FieldTypes.js';import pt from '../PropertyTypes.js';",
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 6,
			},
            options: [{ moduleNameSubstr: 'FieldTypes', expectedVariableName: 'ft' }, { moduleNameSubstr: 'PropertyTypes', expectedVariableName: 'pt' }]
        },{
            code: "import ft from '../FieldTypes.js';",
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 6,
			},
            options: [{ moduleNameSubstr: 'FieldTypes', expectedVariableName: 'ft' }]
        }],

    invalid: [{
            code: "import FileTypes from 'FieldTypes.js'",
			options: [{ moduleNameSubstr: 'FieldTypes', expectedVariableName: 'ft' }],
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 6,
			},			
            errors: [{
                message: "It's expected that module with name FieldTypes is imported with appropriate name: `ft`",
                type: "ImportDeclaration"
            }]
        },
		{
            code: "import zxczxc from '../FieldTypes.js'; import zxcwecw from '../PropertyTypes.js';",
			options: [{ moduleNameSubstr: 'FieldTypes', expectedVariableName: 'ft' }, { moduleNameSubstr: 'PropertyTypes', expectedVariableName: 'pt' }],
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 6,
			},
            errors: [{
                message: "It's expected that module with name FieldTypes is imported with appropriate name: `ft`",
                type: "ImportDeclaration"
            },{
                message: "It's expected that module with name PropertyTypes is imported with appropriate name: `pt`",
                type: "ImportDeclaration"
            }]
        },
		{
            code: "import * as sssss from 'FieldTypes';",
			options: [{ moduleNameSubstr: 'FieldTypes', expectedVariableName: 'ft' }, { moduleNameSubstr: 'PropertyTypes', expectedVariableName: 'pt' }],
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 6,
			},
            errors: [{
                message: "It's expected that module with name FieldTypes is imported with appropriate name: `ft`",
                type: "ImportDeclaration"
            }]
        }
    ]
});