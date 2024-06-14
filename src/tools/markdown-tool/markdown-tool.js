import Paragraph from '@editorjs/paragraph';
import Table from '@editorjs/table';
import List from '@editorjs/nested-list';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Quote from '@egg-/editor-js-quote';
import Link from '@editorjs/link';

import SimpleImage from '../simple-image-tool/image-tool';
import CodeTool from '../code-tool/code-tool';

export default class MarkdownTool {
	constructor({ api, data, ...rest }) {
		this.api = api;
		this.data = data;
		this._data = null;
		this.rest = rest;
		this.usingTool = null;
		this.toolType = null;
		this.savedData = null;
	}
	static get enableLineBreaks() {
		return !0;
	}
	static get isReadOnlySupported() {
		return true;
	}

	static get enableReadOnly() {
		return true;
	}

	render() {
		if (/^#{1,6}\s/.test(this.data?.text)) {
			//for header
			this.toolType = 'header';
			this.savedData = {
				text: this.data?.text?.substring(this.data?.text?.match(/^#+/)?.[0]?.length).trim(),
				level: this.data?.text?.match(/^#+/)?.[0]?.length
			};
			this.usingTool = new Header({ api: this.api, data: this.savedData, ...this.rest });
		} else if (/^!\[.*?\]\(.*?\)/.test(this.data?.text)) {
			this.toolType = 'image';
			//for image
			const jsonData = {};
			const lines = this.data?.text?.split('\n');
			lines.forEach(line => {
				if (line.startsWith('![Image]')) {
					const urlMatch = line.match(/\((.*?)\)/);
					if (urlMatch) {
						jsonData.file = { url: urlMatch[1] };
					}
				} else {
					const parts = line.split(':');
					if (parts.length === 2) {
						const key = parts[0].trim();
						let value = parts[1].trim();
						if (key === 'height' || key === 'width') {
							value = parseInt(value, 10);
						} else if (value === 'true' || value === 'false') {
							value = value === 'true';
						}
						jsonData[key] = value;
					}
				}
			});
			this.savedData = { ...jsonData , type: 'image' };
			this.usingTool = new SimpleImage({ api: this.api, data: this.savedData, ...this.rest });
		} else if (/^>/.test(this.data?.text)) {
			//for quote
			this.toolType = 'quote';
			const jsonData = this.quoteMarkdownToJson(this.data?.text);
			this.savedData = {
				type: 'quote',
				data: { ...jsonData }
			};
			this.usingTool = new Quote({ api: this.api, data: this.savedData, ...this.rest });
		} else if (/^---/.test(this.data?.text)) {
			this.toolType = 'delimiter';
			this.savedData = {
				type: 'delimiter',
				data: {}
			};
			this.usingTool = new Delimiter({ api: this.api, data: this.savedData, ...this.rest });
		} else if (/^\|.*\|.*\|/.test(this.data?.text)) {
			//for table
			this.toolType = 'table';
			const jsonData = { withHeadings: false, content: [] };
			const lines = this.data?.text.split('\n');

			let isSeparatorLine = false;

			lines.forEach(line => {
				if (line.startsWith('|')) {
					if (line.includes('---')) {
						isSeparatorLine = true;
					} else {
						const trimmedLine = line.trim().substring(1).trim();
						const row = trimmedLine
							.split('|')
							.map(cell => cell.trim())
							.filter(cell => cell !== '');
						if (row.length > 0) {
							jsonData.content.push(row);
						}
					}
				}
			});

			if (isSeparatorLine) {
				jsonData.withHeadings = true;
				jsonData.content.splice(1, 0);
			}

			this.savedData = {
				...jsonData
			};
			this.usingTool = new Table({ api: this.api, data: this.savedData, ...this.rest });
		} else if (/^- /.test(this.data?.text?.trim()) || /^\d+\./.test(this.data?.text?.trim())) {
			this.toolType = 'list';
			let listArr = this.convertMarkdownToListObj(this.data?.text);
			this.savedData = { style: 'unordered', items: listArr };
			this.usingTool = new List({ api: this.api, data: this.savedData, ...this.rest });
		} else if (/```(.*?)```/gm.test(this.data.text)) {
			this.toolType = 'code';
			this.savedData = this.convertCodeToEditorJS(this.data?.text);
			this.usingTool = new CodeTool({ api: this.api, data: this.savedData, ...this.rest });
		} else if (/\[.*?\]\(.*?(\s".*?")?\)/.test(this.data?.text)) {
			// for link
			this.toolType = 'link';
			this.savedData = {
				link: this.data?.text.replace(/\[(.*?)\]\((.*?)\s*("(.*?)")?\)/g)
			};
			this.usingTool = new Link({ api: this.api, data: this.savedData, ...this.rest });
		} else {
			this.toolType = 'paragraph';
			this.savedData = {
				text: this.data?.text?.trim() || ''
			};
			this.usingTool = new Paragraph({ api: this.api, data: this.savedData, ...this.rest });
		}

		return this.usingTool.render();
	}
	parseHeaderToMarkdown(text, level) {
		if (text) {
			switch (level) {
				case 1:
					  return `# ${ text }\n`;
				case 2:
					  return `## ${ text }\n`;
				case 3:
					  return `### ${ text }\n`;
				default:
					  break;
			  }
		}
	  }
	convertNestedListToMarkdown(element, level = 0) {
		const indent = '\t';
		let markdown = '';

		element.childNodes.forEach(child => {
		  if (child.nodeType === Node.TEXT_NODE) {
				markdown += child.textContent.trim() + '\n';
		  } else if (child.nodeType === Node.ELEMENT_NODE) {
				switch (child.tagName.toLowerCase()) {
			  case 'ul':
						markdown += this.convertNestedListToMarkdown(child, level);
						break;
			  case 'li':
						markdown +=
						indent.repeat(level) +
				  '- ' +
				  this.convertNestedListToMarkdown(child, level + 1);
						break;
			  case 'div':
			  case 'p':
						markdown += this.convertNestedListToMarkdown(child, level);
						break;
			  default:
						break;
				}
		  }
		});
		return markdown;
	}

	convertCodeToEditorJS(markdown) {
		const editorJSData = {
			text: this.getDataContent(markdown)
		};
		return editorJSData;
	  }

	 convertMarkdownToListObj(markdown) {
		const cleanedMarkdown = markdown.replace(/\t/g, ' ');
		const lines = cleanedMarkdown.split('\n');
		const editorJSBlocks = [];

		lines.forEach(line => {
			  const indentationLevel = line.search(/\S/);

			  const trimmedLine = line.trim();

			  let lastList = editorJSBlocks;
			  for (let i = 0; i < indentationLevel; i++) {
				if (lastList.length > 0) {
				  lastList = lastList[lastList.length - 1].items;
				} else {
				  break;
				}
			  }

			  const listItem = this.convertListItem(trimmedLine);

			  lastList.push(listItem);
		});

		return editorJSBlocks;
	}
	convertListItem(text) {
		return {
		  content: text.trim().substring(2),
		  items: []
		};
	  }

	parseTableHtmlToMarkdown(tableData) {
		const lines = tableData.split('\n');
		let markdown = '';

		for (let i = 0; i < lines.length; i += 2) {
			markdown += `| ${ lines[i] } | ${ lines[i + 1] } |\n`;
		}

		return markdown;
	}

	getDataContent(markdown) {
		if (markdown) {
			const codeBlockRegex = /```(.*?)```/g;
			const codeBlocks = markdown.match(codeBlockRegex)?.map(block => block.match(/```(.*?)```/)[1]);
			return codeBlocks;
		}
		return '';
	}

	quoteMarkdownToJson(markdownContent) {
		const jsonData = { data: {} };
		const lines = markdownContent.split('\n');

		let text = '';
		let caption = '';

		lines.forEach(line => {
			if (line.startsWith('>')) {
				const trimmedLine = line.trim().substring(1).trim();
				if (!text) {
					text = trimmedLine;
				} else if (!caption) {
					caption = trimmedLine;
				}
			}
		});

		if (text) {
			jsonData.data.text = text;
		}
		if (caption) {
			jsonData.data.caption = caption;
		}

		return jsonData;
	}

	save() {
		switch (this.toolType) {
			case 'header':
			  return {
					text: this.parseHeaderToMarkdown(this.usingTool._element.innerHTML,this.usingTool._data.level) || ''
			  };
			case 'paragraph':
				return {
					text: this.usingTool._element.innerHTML
			  };
			case 'list':
				const element = document.createElement('div');
				element.innerHTML = this.usingTool.nodes?.wrapper?.outerHTML;
				var markdown = this.convertNestedListToMarkdown(element);
				return {
					text: markdown || ''
			  };
			case 'delimiter':
			 return {};
			case 'image':
				const imageMarkdown = this.converImageTomarkDown(this.usingTool, this.savedData);
			  return {
					text: imageMarkdown
			  };
			case 'quote':
				return {
					text: this.usingTool?.data?.quote,
					caption: this.usingTool?.data?.caption
				};
			case 'code':
			  return {
					text: '```' + this.usingTool?.element?.innerHTML + '```'
			  };
			case 'table':
				return {
					text: this.parseTableHtmlToMarkdown(this.usingTool.table?.wrapper?.innerText)
			  };
			default:
			  break;
		  }
		return this.usingTool.save();
	}

	converImageTomarkDown(tool, data) {
		let { width = '250px', height = '300px' } = tool?.ui?.nodes?.imageContainer?.style;
		let markdown = '';

		if (data.file && data.file.url) {
			markdown += `![Image](${ data.file.url })\n`;
		}
		if (height) {
			markdown += `height: ${ height }\n`;
		}
		if (width) {
			markdown += `width: ${ width }\n`;
		}
		if (data.withBorder !== undefined) {
			markdown += `withBorder: ${ data.withBorder }\n`;
		}
		if (data.stretched !== undefined) {
			markdown += `stretched: ${ data.stretched }\n`;
		}
		if (data.withBackground !== undefined) {
			markdown += `withBackground: ${ data.withBackground }\n`;
		}

		return markdown;
	}

}
