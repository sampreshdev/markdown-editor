import * as React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import {
	$isTextNode,
	TextNode
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { FlashMessageContext } from './context/flash-message-context';
import { SettingsContext, useSettings } from './context/settings-context';
import { SharedHistoryContext } from './context/shared-history-context';
import { ToolbarContext } from './context/toolbar-context';
import Editor from './editor';
import PlaygroundNodes from './nodes/playground-nodes';
// import DocsPlugin from './plugins/DocsPlugin/docs-plugin';
// import PasteLogPlugin from './plugins/PasteLogPlugin/paste-log-plugin';
import { TableContext } from './plugins/table-plugin';
// import TestRecorderPlugin from './plugins/TestRecorderPlugin/test-recorder-plugin';
import { parseAllowedFontSize } from './plugins/ToolbarPlugin/font-size';
import TypingPerfPlugin from './plugins/TypingPerfPlugin/typing-perf-plugin';
import PlaygroundEditorTheme from './themes/playground-editor-theme';
import { parseAllowedColor } from './ui/color-picker';
import './app.css';

function getExtraStyles(element) {
	let extraStyles = '';
	const fontSize = parseAllowedFontSize(element.style.fontSize);
	const backgroundColor = parseAllowedColor(element.style.backgroundColor);
	const color = parseAllowedColor(element.style.color);
	if (fontSize !== '' && fontSize !== '15px') {
		extraStyles += `font-size: ${ fontSize };`;
	}
	if (backgroundColor !== '' && backgroundColor !== 'rgb(255, 255, 255)') {
		extraStyles += `background-color: ${ backgroundColor };`;
	}
	if (color !== '' && color !== 'rgb(0, 0, 0)') {
		extraStyles += `color: ${ color };`;
	}
	return extraStyles;
}

function buildImportMap() {
	const importMap = {};

	// Wrap all TextNode importers with a function that also imports
	// the custom styles implemented by the playground
	for (const [tag, fn] of Object.entries(TextNode.importDOM() || {})) {
		importMap[tag] = importNode => {
			const importer = fn(importNode);
			if (!importer) {
				return null;
			}
			return {
				...importer,
				conversion: element => {
					const output = importer.conversion(element);
					if (
						output === null ||
            output.forChild === undefined ||
            output.after !== undefined ||
            output.node !== null
					) {
						return output;
					}
					const extraStyles = getExtraStyles(element);
					if (extraStyles) {
						const { forChild } = output;
						return {
							...output,
							forChild: (child, parent) => {
								const textNode = forChild(child, parent);
								if ($isTextNode(textNode)) {
									textNode.setStyle(textNode.getStyle() + extraStyles);
								}
								return textNode;
							}
						};
					}
					return output;
				}
			};
		};
	}

	return importMap;
}

function App() {
	const {
		settings: { isCollab, measureTypingPerf }
	} = useSettings();

	const initialConfig = {
		editorState: isCollab
			? null
			: undefined,
		html: { 'import': buildImportMap() },
		namespace: 'Playground',
		nodes: [...PlaygroundNodes],
		onError: error => {
			throw error;
		},
		theme: PlaygroundEditorTheme
	};

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<SharedHistoryContext>
				<TableContext>
					<ToolbarContext>
						<div className='editor-shell'>
							<Editor />
						</div>
						{measureTypingPerf ? <TypingPerfPlugin /> : null}
					</ToolbarContext>
				</TableContext>
			</SharedHistoryContext>
		</LexicalComposer>
	);
}

export function PlaygroundApp() {
	return (
		<SettingsContext>
			<FlashMessageContext>
				<App />
			</FlashMessageContext>
		</SettingsContext>
	);
}
