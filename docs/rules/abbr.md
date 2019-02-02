# Forces to import specific modules into specific variable names (practically abbre (force-import-abbr)

Usage example:
```
'import-force-abbr/abbr': [2, {cases: [{
        moduleNameSubstr: '/FieldTypes',
        expectedVariableName: 'ft'
    },{
        moduleNameSubstr: '/PropertyTypes',
        expectedVariableName: 'pt'
    }] }
]
```


## Rule Details

This rule aims to force to use specific variables when importing specific modules.

Examples of **incorrect** code for this rule:

```js

1. import FileTypes from 'FieldTypes';
2. import * as OtherName from 'FieldTypes';  const blable = require('FieldTypes');
3. import OtherName from 'FieldTypes';  const blable = require('FieldTypes');

```

Examples of **correct** code for this rule:

```js

1. import ft from 'FieldTypes';
2. import * as ft from 'FieldTypes';
3. import ft from 'FieldTypes';  const blable = require('FieldTypes');
4. import { chekbox } from 'FieldTypes';
``` 

### Options

#### cases
type: Array of objects

example: 
```
[{
    moduleNameSubstr: '/FieldTypes',
    expectedVariableName: 'ft'
},{
    moduleNameSubstr: '/PropertyTypes',
    expectedVariableName: 'pt'
}]
```
