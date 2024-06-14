
import 'promise-polyfill/src/polyfill';

// import 'antd/dist/antd.less';

import React from 'react';
import * as Sentry from '@sentry/react';
import Modal from 'react-modal';
import { render } from 'react-dom';

import App from './app';

const dev = process.env.NODE_ENV !== 'production';

if (!dev) {
	Sentry.init({
		dsn: 'https://ff77005d94924e3bbe56d1f3b7c678b1@sentry.trackwick.com/10',
		ignoreErrors: [
			'ResizeObserver loop limit exceeded'
		]
	});
}

// configureToast();
Modal.setAppElement('#root');
render(<App />, document.getElementById('root'));

// window.React1 = require('react');

// Add this in your component file
