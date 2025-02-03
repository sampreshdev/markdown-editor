import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { HashtagNode } from '@lexical/hashtag';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { MarkNode } from '@lexical/mark';
import { OverflowNode } from '@lexical/overflow';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';

import { AutocompleteNode } from './autocomplete-node';
import { EmojiNode } from './emoji-node';
import { ImageNode } from './image-node';
import { KeywordNode } from './keyword-node';
import { LayoutContainerNode } from './layout-container-node';
import { LayoutItemNode } from './layout-item-node';
import { MentionNode } from './mention-node';
import { PageBreakNode } from './PageBreakNode/page-break-node';
import { SpecialTextNode } from './special-text-node';

const PlaygroundNodes = [
	HeadingNode,
	ListNode,
	ListItemNode,
	QuoteNode,
	CodeNode,
	TableNode,
	TableCellNode,
	TableRowNode,
	HashtagNode,
	CodeHighlightNode,
	AutoLinkNode,
	LinkNode,
	OverflowNode,
	ImageNode,
	MentionNode,
	EmojiNode,
	AutocompleteNode,
	KeywordNode,
	HorizontalRuleNode,
	MarkNode,
	PageBreakNode,
	LayoutContainerNode,
	LayoutItemNode,
	SpecialTextNode
];

export default PlaygroundNodes;
