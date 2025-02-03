import * as React from 'react';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { SelectionAlwaysOnDisplay } from '@lexical/react/LexicalSelectionAlwaysOnDisplay';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { useLexicalEditable } from '@lexical/react/useLexicalEditable';
import { useEffect, useState } from 'react';

import { CAN_USE_DOM } from './shared/can-use-dom';
import { useSettings } from './context/settings-context.jsx';
import ActionsPlugin from './plugins/actions-plugin.jsx';
import AutocompletePlugin from './plugins/autocomplete-plugin.jsx';
import AutoEmbedPlugin from './plugins/auto-embed-plugin.jsx';
import AutoLinkPlugin from './plugins/lexical-auto-link-plugin.jsx';
import CodeActionMenuPlugin from './plugins/CodeActionMenuPlugin/code-action-menu-plugin.jsx';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin/code-highlight-plugin.js';
import CollapsiblePlugin from './plugins/CollapsiblePlugin/collapsible-plugin.js';
import ComponentPickerPlugin from './plugins/ComponentPickerPlugin/component-picker-plugin.jsx';
import ContextMenuPlugin from './plugins/ContextMenuPlugin/context-menu-plugin.jsx';
import DragDropPastePlugin from './plugins/DragDropPastePlugin/drag-drop-paste-plugin.jsx';
import DraggableBlockPlugin from './plugins/DraggableBlockPlugin/draggable-block-plugin.jsx';
import EmojiPickerPlugin from './plugins/EmojiPickerPlugin/emoji-picker-plugin.jsx';
import EmojisPlugin from './plugins/EmojisPlugin/emojis-plugin.js';
import FigmaPlugin from './plugins/FigmaPlugin/figma-plugin.jsx';
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin/floating-link-editor-plugin.jsx';
import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin/floating-text-format-toolbar-plugin.jsx';
import ImagesPlugin from './plugins/ImagesPlugin/images-plugin.jsx';
import InlineImagePlugin from './plugins/InlineImagePlugin/inline-image-plugin.jsx';
import KeywordsPlugin from './plugins/KeywordsPlugin/keywords-plugin.js';
import { LayoutPlugin } from './plugins/LayoutPlugin/layout-plugin.jsx';
import LinkPlugin from './plugins/LinkPlugin/link-plugin.jsx';
import MarkdownShortcutPlugin from './plugins/MarkdownShortcutPlugin/markdown-plugin.jsx';
import { MaxLengthPlugin } from './plugins/MaxLengthPlugin/max-length-plugin.jsx';
import MentionsPlugin from './plugins/MentionsPlugin/mentions-plugin.jsx';
import PageBreakPlugin from './plugins/PageBreakPlugin/page-break-plugin.jsx';
import PollPlugin from './plugins/PollPlugin/poll-plugin.jsx';
import ShortcutsPlugin from './plugins/ShortcutsPlugin/shortcuts-plugin.jsx';
import SpecialTextPlugin from './plugins/SpecialTextPlugin/special-text-plugin.js';
import SpeechToTextPlugin from './plugins/SpeechToTextPlugin/speech-to-text-plugin.js';
import TabFocusPlugin from './plugins/TabFocusPlugin/tab-focus-plugin.jsx';
import TableCellActionMenuPlugin from './plugins/TableActionMenuPlugin/table-action-menu-plugin.jsx';
import TableCellResizer from './plugins/TableCellResizer/table-cell-resizer-plugin.jsx';
import TableHoverActionsPlugin from './plugins/TableHoverActionsPlugin/table-hover-actions-plugin.jsx';
import TableOfContentsPlugin from './plugins/TableOfContentsPlugin/table-of-contents-plugin.jsx';
import ToolbarPlugin from './plugins/ToolbarPlugin/toolbar-plugin.jsx';
import TwitterPlugin from './plugins/TwitterPlugin/twitter-plugin.js';
import YouTubePlugin from './plugins/YouTubePlugin/youtube-plugin.js';
import ContentEditable from './ui/lexical-content-editable';

export default function Editor() {
	const {
		settings: {
			isCollab,
			isAutocomplete,
			isMaxLength,
			isCharLimit,
			hasLinkAttributes,
			isCharLimitUtf8,
			isRichText,
			showTreeView,
			showTableOfContents,
			shouldUseLexicalContextMenu,
			shouldPreserveNewLinesInMarkdown,
			tableCellMerge,
			tableCellBackgroundColor,
			tableHorizontalScroll,
			shouldAllowHighlightingWithBrackets,
			selectionAlwaysOnDisplay
		}
	} = useSettings();
	const isEditable = useLexicalEditable();
	const placeholder = isCollab
		? 'Enter some collaborative rich text...'
		: isRichText
			? 'Enter some rich text...'
			: 'Enter some plain text...';
	const [floatingAnchorElem, setFloatingAnchorElem] =
    useState(null);
	const [isSmallWidthViewport, setIsSmallWidthViewport] =
    useState(false);
	const [editor] = useLexicalComposerContext();
	const [activeEditor, setActiveEditor] = useState(editor);
	const [isLinkEditMode, setIsLinkEditMode] = useState(false);
	console.log(editor);

	const onRef = _floatingAnchorElem => {
		if (_floatingAnchorElem !== null) {
			setFloatingAnchorElem(_floatingAnchorElem);
		}
	};

	useEffect(() => {
		const updateViewPortWidth = () => {
			const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches;

			if (isNextSmallWidthViewport !== isSmallWidthViewport) {
				setIsSmallWidthViewport(isNextSmallWidthViewport);
			}
		};
		updateViewPortWidth();
		window.addEventListener('resize', updateViewPortWidth);

		return () => {
			window.removeEventListener('resize', updateViewPortWidth);
		};
	}, [isSmallWidthViewport]);

	return (
		<>
			{isRichText && (
				<ToolbarPlugin
					editor={editor}
					activeEditor={activeEditor}
					setActiveEditor={setActiveEditor}
					setIsLinkEditMode={setIsLinkEditMode}
				/>
			)}
			{isRichText && (
				<ShortcutsPlugin
					editor={activeEditor}
					setIsLinkEditMode={setIsLinkEditMode}
				/>
			)}
			<div
				className={`editor-container ${ showTreeView ? 'tree-view' : '' } ${
					!isRichText && 'plain-text'
				}`}>
				{isMaxLength && <MaxLengthPlugin maxLength={30} />}
				<DragDropPastePlugin />
				<AutoFocusPlugin />
				{selectionAlwaysOnDisplay && <SelectionAlwaysOnDisplay />}
				<ClearEditorPlugin />
				<ComponentPickerPlugin />
				<EmojiPickerPlugin />
				<AutoEmbedPlugin />
				<MentionsPlugin />
				<EmojisPlugin />
				<HashtagPlugin />
				<KeywordsPlugin />
				<SpeechToTextPlugin />
				<AutoLinkPlugin />
				<>
					<RichTextPlugin
						contentEditable={
							<div className='editor-scroller'>
								<div className='editor' ref={onRef}>
									<ContentEditable placeholder={placeholder} />
								</div>
							</div>
						}
						ErrorBoundary={LexicalErrorBoundary}
					/>
					<MarkdownShortcutPlugin />
					<CodeHighlightPlugin />
					<ListPlugin />
					<CheckListPlugin />
					<TablePlugin
						hasCellMerge={tableCellMerge}
						hasCellBackgroundColor={tableCellBackgroundColor}
						hasHorizontalScroll={tableHorizontalScroll}
					/>
					<TableCellResizer />
					<ImagesPlugin />
					<InlineImagePlugin />
					<LinkPlugin hasLinkAttributes={hasLinkAttributes} />
					<PollPlugin />
					<TwitterPlugin />
					<YouTubePlugin />
					<FigmaPlugin />
					<ClickableLinkPlugin disabled={isEditable} />
					<HorizontalRulePlugin />
					<TabFocusPlugin />
					<TabIndentationPlugin maxIndent={7} />
					<CollapsiblePlugin />
					<PageBreakPlugin />
					<LayoutPlugin />
					{floatingAnchorElem && !isSmallWidthViewport && (
						<>
							<DraggableBlockPlugin anchorElem={floatingAnchorElem} />
							<CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
							{isLinkEditMode && <FloatingLinkEditorPlugin
								anchorElem={floatingAnchorElem}
								isLinkEditMode={isLinkEditMode}
								setIsLinkEditMode={setIsLinkEditMode}
							/>}
							<TableCellActionMenuPlugin
								anchorElem={floatingAnchorElem}
								cellMerge={true}
							/>
							<TableHoverActionsPlugin anchorElem={floatingAnchorElem} />
							<FloatingTextFormatToolbarPlugin
								anchorElem={floatingAnchorElem}
								setIsLinkEditMode={setIsLinkEditMode}
							/>
						</>
					)}
				</>
				{(isCharLimit || isCharLimitUtf8) && (
					<CharacterLimitPlugin
						charset={isCharLimit ? 'UTF-16' : 'UTF-8'}
						maxLength={5}
					/>
				)}
				{isAutocomplete && <AutocompletePlugin />}
				<div>{showTableOfContents && <TableOfContentsPlugin />}</div>
				{shouldUseLexicalContextMenu && <ContextMenuPlugin />}
				{shouldAllowHighlightingWithBrackets && <SpecialTextPlugin />}
				<ActionsPlugin
					isRichText={isRichText}
					shouldPreserveNewLinesInMarkdown={shouldPreserveNewLinesInMarkdown}
				/>
			</div>
		</>
	);
}
