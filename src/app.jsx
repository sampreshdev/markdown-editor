import React, { useRef, useState } from 'react';
import { createReactEditorJS } from 'react-editor-js';

import { EDITOR_JS_TOOLS as editoJsTools } from './tools/tools.js';
import './index.css?inline';
import getMarkdownData from './get-markdown-data.js';

import './app.css?global';

export default function App({ }) {
	const editorCore = useRef(null);
	const [data, setData] = useState('');
	const [rawMode, setRawMode] = useState(false);
	const ReactEditorJS = createReactEditorJS();

	const handleInitialize = React.useCallback(instance => {
		editorCore.current = instance;
	}, []);

	const handleReady = () => {
		const editor = editorCore.current._editorJS;
	};

	const handleSave = React.useCallback(async () => {
		const savedData = await editorCore.current.save();
		console.log(savedData);
		let markdownString = '';
		if (savedData?.blocks?.length > 0) {
			savedData.blocks.map(el => {
				markdownString += el.data.text;
			})
		}
		setData(markdownString);
	}, []);
	console.log( data, 'data');
	return (
		<>
		<label className='switch'>
			<input type="checkbox" onChange={() => setRawMode(!rawMode)} />
			<span className='slider round'></span>
		</label>
		<div key={JSON.stringify(rawMode)}>
			<ReactEditorJS
				onInitialize={handleInitialize}
				tools={editoJsTools({ rawMode })}
				onChange={handleSave}
				onReady={handleReady}
				autofocus
				defaultValue={{ blocks: getMarkdownData(data) }}
				holder={'editor-div'}
				placeholder={'Enter Input Here'}
			>
				<div id={'editor-div'} />
			</ReactEditorJS>
		</div>
		</>
	);
}
