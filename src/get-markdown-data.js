export default function getMarkdownData(content) {
	let blocks = content.split('\n');
	let markdownBlocks = blocks.map(el => {
        el = el && el.trim();
		if (/^#{1,6}\s?.+$/.test(el)) {
			return {
				type: 'header',
				data: { text: el }
			};
		} else if (/^!\[.*?\]\(.*?\)/.test(el)) {
			//for image
			return {
				type: 'image',
				data: { text: el }
			};
		} else if (/^>/.test(el)) {
		//for quote
			return {
				type: 'quote',
				data: { text: el }
			};
		} else if (/^---/.test(el)) {
			return {
				type: 'delimiter',
				data: { text: el }
			};
		} else if (/^\|.*\|.*\|/.test(el)) {
		//for table
			return {
				type: 'table',
				data: { text: el }
			};
		} else if (/^- /.test(el?.trim()) || /^\d+\./.test(el?.trim())) {
			return { style: 'unordered', data: { text: el } };
		} else if (/```(.*?)```/gm.test(el)) {
			return {
				type: 'code',
				data: { text: el }
			};
		} else if (/\[.*?\]\(.*?(\s".*?")?\)/.test(el)) {
		// for link
			return {
				type: 'link',
				data: { text: el }
			};
		} else {
			return {
				type: 'paragraph',
				data: { text: el }
			};
		}
	});
	return markdownBlocks;
}
