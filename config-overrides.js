var path = require('path');

const {
	override,
	addDecoratorsLegacy,
	babelInclude,
	disableEsLint
} = require('customize-cra');

module.exports = function (config, env) {
	return Object.assign(config, override(
		disableEsLint(),
		addDecoratorsLegacy(),
		babelInclude([
			path.resolve('src')
		])
	)(config, env)
	);
};
