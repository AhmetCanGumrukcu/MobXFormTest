const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const fs = require('fs');

module.exports = function (source) {
	var astResult = babylon.parse(source, {
		sourceType: "module",
		ranges: true,
		plugins: [
			"jsx",
			"objectRestSpread",
			"flow",
			"typescript",
			"decorators",
			"doExpressions",
			"classProperties",
			"classPrivateProperties",
			"classPrivateMethods",
			"exportExtensions",
			"asyncGenerators",
			"functionBind",
			"functionSent",
			"dynamicImport",
			"numericSeparator",
			"optionalChaining",
			"importMeta",
			"bigInt",
			"optionalCatchBinding"
		]
	});

	let className;
	let addedIndexCounter = 0;
	let targetViewStore;
	let formName;
	let formModel;
	let insideForm = false;
	let isViewDirty = false;

	traverse(astResult, {
		enter: function (path) {
			let node = path.node;
			if (node.type == 'ClassDeclaration' && node.decorators && node.decorators.length > 0) {
				className = node.id.name;
				node.decorators.forEach(d => {
					if (d.expression && d.expression.callee && d.expression.arguments && d.expression.callee.type == "Identifier" && d.expression.callee.name == "inject") {
						targetViewStore = d.expression.arguments[0].value;
					}
				});
			}
			else if (node.type == 'JSXOpeningElement') {
				if (node.name.type == 'JSXIdentifier') {
					// if (node.name.name == 'TcellCard') {
					// 	if(targetViewStore) {
					// 		let starting = node.name.end;
					// 		starting += addedIndexCounter;
					// 		let viewStoreProperty = ` viewStore={ this.props.${targetViewStore} } `;
					// 		addedIndexCounter += viewStoreProperty.length;
					// 		source = source.substring(0, starting) + viewStoreProperty + source.substring(starting);
					// 		isViewDirty = true;
					// 	}	
					// } else 
					if (node.name.name == 'TcellForm') {
						insideForm = true;
						node.attributes.forEach(attribute => {
							if (attribute.name.name == 'ref') {
								formName = attribute.value.expression.body.body[0].expression.left.property.name;
							} else if (attribute.name.name == 'model') {
								formModel = attribute.value.expression.name;
							}
						})
					} else if (insideForm) {
						let starting = node.name.end;
						starting += addedIndexCounter;
						let nameAttributes = node.attributes.filter(attribute => attribute.name.name == "name");
						if (nameAttributes.length > 0) {
							let elementName = nameAttributes[0].value.value;
							let formElementProperties = " value={ " + formModel + ".$('" + elementName + "').value } " +
								" error={ " + formModel + ".$('" + elementName + "').error } " +
								" helperText={ " + formModel + ".$('" + elementName + "').error } " +
								" onChange={ (event) => { this." + formName + ".onChange(event) }} ";
							addedIndexCounter += formElementProperties.length;
							source = source.substring(0, starting) + formElementProperties + source.substring(starting);
							isViewDirty = true;
						}
					}
				}
			} else if (node.type == 'JSXClosingElement') {
				if (node.name.type == 'JSXIdentifier') {
					if (node.name.name == 'TcellForm') {
						insideForm = false;
						formName = null;
						formModel = null;
					}
				}
			}
		}
	});

	if(isViewDirty){
		//let fileName = className+"_"+(new Date()).toISOString().slice(0, 10)+"_"+Math.random().toString(35).substr(2,10);
		//fs.writeFileSync('./logs/views/'+fileName, source);
	
		fs.writeFileSync('./logs/views/'+className, source);
	}
	return source;
};