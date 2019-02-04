/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/**
 * @fileoverview Forces to import specific modules into
 * specific variable names (practically abbreviations).
 * @author Alex
 */
module.exports = {
  rules: {
    abbr: require(`${__dirname}/rules/abbr`),
  },
};
