import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { createCommand, TextNode } from 'lexical';
import { useEffect } from 'react';

import {
	$createSpecialTextNode,
	SpecialTextNode
} from '../../nodes/special-text-node';

const BRACKETED_TEXT_REGEX = /\[([^\[\]]+)\]/;

export const SPEECH_TO_TEXT_COMMAND = createCommand(
	'SPEECH_TO_TEXT_COMMAND'
);
export const SUPPORT_SPEECH_RECOGNITION =
  'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

function $findAndTransformText(node) {
	const text = node.getTextContent();

	const match = BRACKETED_TEXT_REGEX.exec(text);
	if (match) {
		const matchedText = match[1];
		const startIndex = match.index;

		let targetNode;
		if (startIndex === 0) {
			[targetNode] = node.splitText(startIndex + match[0].length);
		} else {
			[, targetNode] = node.splitText(startIndex, startIndex + match[0].length);
		}

		const specialTextNode = $createSpecialTextNode(matchedText);
		targetNode.replace(specialTextNode);
		return specialTextNode;
	}

	return null;
}

function $textNodeTransform(node) {
	let targetNode = node;

	while (targetNode !== null) {
		if (!targetNode.isSimpleText()) {
			return;
		}

		targetNode = $findAndTransformText(targetNode);
	}
}

function useTextTransformation(editor) {
	useEffect(() => {
		if (!editor.hasNodes([SpecialTextNode])) {
			throw new Error(
				'SpecialTextPlugin: SpecialTextNode not registered on editor'
			);
		}

		return editor.registerNodeTransform(TextNode, $textNodeTransform);
	}, [editor]);
}

export default function SpecialTextPlugin() {
	const [editor] = useLexicalComposerContext();
	useTextTransformation(editor);
	return null;
}
