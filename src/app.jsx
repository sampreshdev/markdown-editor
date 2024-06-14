import React, { useRef } from 'react';
import { createReactEditorJS } from 'react-editor-js';

import { EDITOR_JS_TOOLS } from './tools/tools.js';

export default function App({ }) {
	const editorCore = useRef(null);
	const ReactEditorJS = createReactEditorJS();

	const handleInitialize = React.useCallback(instance => {
		editorCore.current = instance;
	}, []);

	const handleReady = () => {
		const editor = editorCore.current._editorJS;
	};

	const handleSave = React.useCallback(async () => {
		const savedData = await editorCore.current.save();

	}, []);
	return (
		<div>
			<ReactEditorJS
				onInitialize={handleInitialize}
				tools={EDITOR_JS_TOOLS}
				onChange={handleSave}
				onReady={handleReady}
				autofocus
				holder={'editor-div'}
				placeholder={'Enter Input Here'}
			>
				<div id={'editor-div'} />
			</ReactEditorJS>

		</div>
	);
}
