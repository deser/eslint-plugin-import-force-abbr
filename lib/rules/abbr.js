/**
 * @fileoverview Forces to import specific modules into specific
 *  variable names (practically abbreviations)
 * @author Aliaksei Petrachenkau
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Forces to import specific modules into specific variable names (practically abbre',
      category: 'Possible Errors',
      recommended: false,
    },
    fixable: 'code', // or "code" or "whitespace"
    schema: [{
      type: 'object',
      properties: {
        cases: {
          type: 'array',
          items: [{
            type: 'object',
            properties: {
              moduleNameSubstr: { type: 'string' },
              expectedVariableName: { type: 'string' },
            },
            required: ['moduleNameSubstr', 'expectedVariableName'],
            additionalProperties: false,
          }],
        },
      },
    }],
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    const moduleRegexCache = {};
    const getModuleSearchRegex = (str) => {
      if (!moduleRegexCache[str]) {
        moduleRegexCache[str] = new RegExp(`\\b${str}\\b(\\.[^.\\/:*?"<>|\r\n]+$|$)`, 'ig'); // the whole word at the end of the string
      }

      return moduleRegexCache[str];
    };

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      ImportDeclaration(node) {
        let options = [];
        try {
          options = context.options[0].cases;
        } catch (e) {
          options = [];
        }

        options.forEach((opt) => {
          const { moduleNameSubstr: sourceName, expectedVariableName } = opt;
          if (!sourceName || !expectedVariableName) return;

          const moduleNameRegex = getModuleSearchRegex(sourceName);

          // ignore local exports and type imports
          if (node.source == null || node.importKind === 'type') return;
          if (!moduleNameRegex.test(node.source.value)) return;
          if (!node.specifiers) return;

          node.specifiers.forEach((sp) => {
            // eslint-disable-next-line no-tabs
            // import * as ft ...						import ft from
            if (sp.type === 'ImportNamespaceSpecifier' || sp.type === 'ImportDefaultSpecifier') {
              const variableDeclarationName = sp.local.name;
              const rangeToReplace = [sp.local.start, sp.local.end];

              if (variableDeclarationName !== expectedVariableName) {
                context.report({
                  node,
                  message: `It's expected that module with name ${sourceName} is imported with appropriate name: "${expectedVariableName}"`,
                  fix(fixer) {
                    return fixer.replaceTextRange(rangeToReplace, expectedVariableName);
                  },
                });
              }
            }
          });
        });
      },
    };
  },
};
