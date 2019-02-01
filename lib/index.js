/**
 * @fileoverview Forces to import specific modules into
 * specific variable names (practically abbreviations).
 * @author Alex
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import requireIndex from 'requireindex';

// eslint-disable-next-line import/prefer-default-export
export const rules = requireIndex(`${__dirname}/rules`);
