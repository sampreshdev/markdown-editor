
// import React from 'react';
// import ReactDOM from 'react-dom';

// import AIModal from './commons/ai-modal';
export default class AITool {

	static get isReadOnlySupported() {
		return true;
	}

	static get toolbox() {
		return {
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 192.756 192.756">
            <g fill-rule="evenodd" clip-rule="evenodd">
            <path fill="#fff" fill-opacity="0" d="M0 0h192.756v192.756H0V0z" />
            <path d="M137.568 16.693h33.057v30.84h-33.057v-30.84zM137.568 54.287h33.057v114.545h-33.057V54.287zM96.155 121.236c.508 4.475.125 5.541.125 7.967 0 12.85-11.319 16.52-15.909 17.438-5.532 1.105-6.433 1.256-12.85.918-5.812-.305-13.955-5.557-13.955-13.105 0-6.549 5.669-11.748 13.511-11.748H90.28c2.363-.001 5.875-1.47 5.875-1.47zM80.668 50.529c7.117.404 18.039.661 28.296 6.99 12.766 7.875 19.133 20.27 19.133 31.707 0 27.299.072 70 .072 70l4.598 9.59H96.743v-6.947c-3.012 0-11.132 4.92-17.125 6.15-7.632 1.568-11.083 1.914-18.868 1.914-20.564 0-37.846-15.709-38.61-32.861 0-.088.02-1.021 0-1.641-.807-24.627 21.357-36.121 42.538-36.121h16.09c12.313 0 16.268-6.752 16.268-12.335 0-4.229-1.985-12.336-16.925-12.336h-3.94c-11.822 0-16.602 5.103-17.022 15.273v3.231H28.014v-7.342c0-15.774 16.995-37.301 52.654-35.272z" />
            </g>
          </svg>`,
			title: 'AI Tools'
		};
	}
	constructor({ data, config, api, readOnly, block }) {
		this.api = api;
		this.readOnly = readOnly;
		this.block = block;

		this.container = undefined;
		this._CSS = {
			block: this.api.styles.block,
			wrapper: 'ce-ai-content'
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

	get data() {
		return this._data;
	}

	drawView(data, container) {
		if (container) {
			this.container = container;
		}
		if (data.text) {
			this.container.innerHTML = data.text;
		}
		this.container.style.outline = 'none';
		this.container.classList.add(this._CSS.wrapper, this._CSS.block);
		this.container.contentEditable = true;
		this.container.dataset.placeholder = this.api.i18n.t(this._placeholder);
		return this.container;
	}
	static get conversionConfig() {
		return {
			'export': 'text',
			'import': 'text'
		};
	}

	 setData(data) {
		this._data.text = data;
		this.render();
	}
	set data(data) {
		this._data = data;
	}

	merge(t) {
		const e = {
		  text: this._data.text + t.text
		};
		this.data = e;
	  }

	render() {
		this.container = document.createElement('div');
		if (!this._data.text) {
			this.open = true;
    		// ReactDOM.render(
    		// 	<AIModal
			// 		open={this.open}
			// 		setContainerData={val => this.setData(val)}
			// 		container={this.container}
    		// 	/>,
			// 	this.container
    		// );
		}
		return this.drawView(this._data, this.container);
	}

	validate(data) {
		return !(data.text.trim() === '');
	}

	save(data) {
		return {
			text: data.innerHTML || this.container.innerHTML
		};
	}
}
