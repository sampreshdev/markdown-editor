
module.exports = api => {

	const envConfig = api.env('test')
		? { targets: { node: 'current' } }
		: { modules: false };

	return {
		'presets': ['@babel/preset-env', '@babel/preset-react'],
		plugins: [
			'@babel/plugin-syntax-dynamic-import',
			'@babel/plugin-proposal-class-properties'
		]
	};
};
