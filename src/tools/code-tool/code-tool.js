// import React from 'react';
// import ReactDOM from 'react-dom';

// import PreviewCode from './preview-code';

export default class CodeTool {

	static get isReadOnlySupported() {
		return true;
	}

	static get toolbox() {
		return {
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8L5 12L9 16"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 8L19 12L15 16"/></svg>`,
			title: 'Code'
		};
	}
	constructor({ data, config, api, readOnly, block }) {
		this.api = api;
		this.readOnly = readOnly;
		this.block = block;

		this.container = undefined;
		this._CSS = {
			block: this.api.styles.block,
			wrapper: 'ce-code-content'
		};
		this.config = config;
		this.open = false;
		this.data = data;
		this._data = data;
	}
	static get pasteConfig() {
		return {
			tags: ['P', 'IMG']
		};
	}

	onPaste(event) {
		const e = {
			text: event.detail.data.innerHTML
		};
		this.data = e;
	}

	static get enableLineBreaks() {
		return !0;
	}

	get data() {
		return this._data;
	}

	static get conversionConfig() {
		return {
			'export': 'text',
			'import': 'text'
		};
	}

	set data(data) {
		this._data = data;
	}

	merge(t) {
		const e = {
		  text: this._data.data.text + t.text
		};
		this.data = e;
	  }
	setData(data) {
		this._data.text = data;
		this.render();
	}
	render() {
		this.container = document.createElement('div');
		this.container.style.marginBottom = '10px';
		this.element = document.createElement('div');
		if (!this.open) {
			this.open = !this._data.text;
			// ReactDOM.render(<PreviewCode
			// 	data={this._data.text}
			// 	open={this.open}
			// 	container={this.element}
			// 	readOnly={this.readOnly}
			// 	setContainerData={val => this.setData(val)}
			// />, this.container);
		}
		if (this._data.text) {
			this.element.innerHTML = this._data.text;
		}
		return this.container;
	}

	validate(data) {
		return !(data?.text?.trim() === '');
	}

	save() {
		let text = this.element.innerHTML;
		return {
			text: text
		};
	}
}
