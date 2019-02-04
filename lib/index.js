/**
 * @fileoverview Forces to import specific modules into
 * specific variable names (practically abbreviations).
 * @author Alex
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require('requireindex');

// eslint-disable-next-line import/prefer-default-export
const rules = requireIndex(`${__dirname}/rules`);
module.exports = rules;
