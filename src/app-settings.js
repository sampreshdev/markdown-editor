const hostName = window.location.hostname;
export const isDevPlayground =
  hostName !== 'playground.lexical.dev' &&
  hostName !== 'lexical-playground.vercel.app';

export const DEFAULT_SETTINGS = {
	disableBeforeInput: false,
	emptyEditor: isDevPlayground,
	hasLinkAttributes: false,
	isAutocomplete: false,
	isCharLimit: false,
	isCharLimitUtf8: false,
	isCollab: false,
	isMaxLength: false,
	isRichText: true,
	measureTypingPerf: false,
	selectionAlwaysOnDisplay: false,
	shouldAllowHighlightingWithBrackets: false,
	shouldPreserveNewLinesInMarkdown: false,
	shouldUseLexicalContextMenu: false,
	showNestedEditorTreeView: false,
	showTableOfContents: false,
	showTreeView: true,
	tableCellBackgroundColor: true,
	tableCellMerge: true,
	tableHorizontalScroll: true
};

export const INITIAL_SETTINGS = {
	...DEFAULT_SETTINGS
};

