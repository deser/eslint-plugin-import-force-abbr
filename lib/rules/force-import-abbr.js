/**
 * @fileoverview Forces to import specific modules into specific variable names (practically abbreviations)
 * @author Alex
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
		type: 'problem',
        docs: {
            description: "Forces to import specific modules into specific variable names (practically abbre",
            category: "Possible Errors",
            recommended: false
        },
        fixable: "code",  // or "code" or "whitespace"
		schema: {
			type: 'array',
			items: [{
			'type': 'object',
			'properties': {
			  'moduleNameSubstr': { 'type': 'string' },
			  'expectedVariableName': { 'type': 'string' }
			},
			"required": ["moduleNameSubstr", "expectedVariableName"],
			'additionalProperties': false,
			}]
	  }
    },

    create: function(context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------
	
        var isString = function(val) {
			return typeof val === "string";
		}
		
		var includes = function(val, searchSubStr) {
			return isString(val) && val.indexOf(searchSubStr) !== -1;
		}

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
			'ImportDeclaration': function(node) {
				const options = context.options || [];				
				options.forEach(function(opt) {
					if(!opt.moduleNameSubstr || !opt.expectedVariableName) return;
					
					const sourceName = opt.moduleNameSubstr;
					const expectedVariableName = opt.expectedVariableName;
					
					// ignore local exports and type imports
					if (node.source == null || node.importKind === 'type') return;			
					if(!includes(node.source.value, sourceName)) return;
					if(!node.specifiers) return;
					
					node.specifiers.forEach(function(sp){					
						// import * as ft ...						import ft from
						if(sp.type === "ImportNamespaceSpecifier" || sp.type === "ImportDefaultSpecifier") {
							const variableDeclarationName = sp.local.name;
							const rangeToReplace = [sp.local.start, sp.local.end];
							
							if(variableDeclarationName !== expectedVariableName) {
								context.report({
									node: node,
									message: "It's expected that module with name " + sourceName + " is imported with appropriate name: `" + expectedVariableName + "`",
									fix: function(fixer) {
										fixer.replaceTextRange(rangeToReplace, expectedVariableName);
									}
								});
							}
						}
					
					});	
				});
				
							
			}
        };
    }
};
