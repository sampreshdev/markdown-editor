
module.exports = {
	moduleNameMapper: {
		'^.+\\.(css|scss)$': 'identity-obj-proxy'
	},
	setupFiles: ['./test/setup-tests.js'],
	snapshotSerializers: ['enzyme-to-json/serializer']
};
