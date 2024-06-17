import { IconPicture } from '@codexteam/icons';

import { make } from './utils/dom';

import './image-resize-tool.css?inline';
/**
 * Class for working with UI:
 *  - rendering base structure
 *  - show/hide preview
 *  - apply tune view
 */
export default class Ui {
	/**
   * @param {object} ui - image tool Ui module
   * @param {object} ui.api - Editor.js API
   * @param {ImageConfig} ui.config - user config
   * @param {Function} ui.onSelectFile - callback for clicks on Select file button
   * @param {boolean} ui.readOnly - read-only mode flag
   */
	constructor({ api, config, onSelectFile, readOnly }) {
		this.api = api;
		this.config = config;
		this.onSelectFile = onSelectFile;
		this.readOnly = readOnly;
		this.nodes = {
			wrapper: make('div', [this.CSS.baseClass, this.CSS.wrapper]),
			imageContainer: make('div', [ this.CSS.imageContainer ]),
			fileButton: this.createFileButton(),
			imageEl: undefined,
			imagePreloader: make('div', this.CSS.imagePreloader),
			imageMarkdown: make('div', this.CSS.markdownText)
		};

		/**
     * Create base structure
     *  <wrapper>
     *    <image-container>
     *      <image-preloader />
     *    </image-container>
     *    <caption />
     *    <select-file-button />
     *  </wrapper>
     */
		if (!this.config.rawMode) {
			this.nodes.imageContainer.appendChild(this.nodes.imagePreloader);
			this.nodes.wrapper.appendChild(this.nodes.imageContainer);
			this.nodes.wrapper.appendChild(this.nodes.fileButton);
		}
	}

	/**
   * CSS classes
   *
   * @returns {object}
   */
	get CSS() {
		return {
			baseClass: this.api.styles.block,
			loading: this.api.styles.loader,
			input: this.api.styles.input,
			button: this.api.styles.button,

			/**
       * Tool's classes
       */
			wrapper: 'image-tool',
			imageContainer: 'image-tool__image',
			imagePreloader: 'image-tool__image-preloader',
			imageEl: 'image-tool__image-picture',
			markdownText: 'image-markdown'
		};
	}

	/**
   * Ui statuses:
   * - empty
   * - uploading
   * - filled
   *
   * @returns {{EMPTY: string, UPLOADING: string, FILLED: string}}
   */
	static get status() {
		return {
			EMPTY: 'empty',
			UPLOADING: 'loading',
			FILLED: 'filled'
		};
	}

	/**
   * Renders tool UI
   *
   * @param {ImageToolData} toolData - saved tool data
   * @returns {Element}
   */
	render(toolData) {
		if (!toolData.file || Object.keys(toolData.file).length === 0) {
			this.toggleStatus(Ui.status.EMPTY);
		} else {
			this.toggleStatus(Ui.status.UPLOADING);
		}

		return this.nodes.wrapper;
	}

	/**
   * Creates upload-file button
   *
   * @returns {Element}
   */
	createFileButton() {
		const button = make('div', [ this.CSS.button ]);

		button.innerHTML = this.config.buttonContent || `${ IconPicture } ${ this.api.i18n.t('Select an Image') }`;

		button.addEventListener('click', () => {
			this.onSelectFile();
		});

		return button;
	}

	/**
   * Shows uploading preloader
   *
   * @param {string} src - preview source
   * @returns {void}
   */
	showPreloader(src) {
		this.nodes.imagePreloader.style.backgroundImage = `url(${ src })`;

		this.toggleStatus(Ui.status.UPLOADING);
	}

	/**
   * Hide uploading preloader
   *
   * @returns {void}
   */
	hidePreloader() {
		this.nodes.imagePreloader.style.backgroundImage = '';
		this.toggleStatus(Ui.status.EMPTY);
	}

	/**
   * Shows an image
   *
   * @param {string} url - image source
   * @param {number} width - image width
   * @param {number} height - image height
   * @returns {void}
   */
	converImageTomarkDown(data, width, height) {
		let markdown = '';

		if (data.file && data.file.url) {
			markdown += `![Image](${ data.file.url })\t`;
		}
		if (height) {
			markdown += `height: ${ height }\t`;
		}
		if (width) {
			markdown += `width: ${ width }\t`;
		}
		if (data.withBorder !== undefined) {
			markdown += `withBorder: ${ data.withBorder }\t`;
		}
		if (data.stretched !== undefined) {
			markdown += `stretched: ${ data.stretched }\t`;
		}
		if (data.withBackground !== undefined) {
			markdown += `withBackground: ${ data.withBackground }\n`;
		}

		return markdown;
	}
	fillImage(url, width, height, rawMode, data) {
		/**
     * Check for a source extension to compose element correctly: video tag for mp4, img — for others
     */
		const tag = /\.mp4$/.test(url) ? 'VIDEO' : 'IMG';
		const attributes = {
			src: url
		};

		/**
     * We use eventName variable because IMG and VIDEO tags have different event to be called on source load
     * - IMG: load
     * - VIDEO: loadeddata
     *
     * @type {string}
     */
		let eventName = 'load';

		/**
     * Update attributes and eventName if source is a mp4 video
     */
		if (tag === 'VIDEO') {
			/**
       * Add attributes for playing muted mp4 as a gif
       *
       * @type {boolean}
       */
			attributes.autoplay = true;
			attributes.loop = true;
			attributes.muted = true;
			attributes.playsinline = true;

			/**
       * Change event to be listened
       *
       * @type {string}
       */
			eventName = 'loadeddata';
		}

		/**
     * Compose tag with defined attributes
     *
     * @type {Element}
     */
		if (rawMode) {
			let returnData = this.converImageTomarkDown(data, data.width, data.height);
			this.nodes.imageMarkdown.innerHTML = returnData;
			this.nodes.wrapper.appendChild(this.nodes.imageMarkdown);
		} else {
			this.nodes.imageEl = make(tag, this.CSS.imageEl, attributes);
			this.nodes.imageContainer.style.width = width + 'px';
			this.nodes.imageContainer.style.height = height + 'px';

		/**
     * Add load event listener
     */
	console.log(this.nodes.imageEl);
		this.nodes.imageEl.addEventListener(eventName, () => {
			this.toggleStatus(Ui.status.FILLED);

			/**
       * Preloader does not exists on first rendering with presaved data
       */
			if (this.nodes.imagePreloader) {
				this.nodes.imagePreloader.style.backgroundImage = '';
			}
		});
		this.nodes.imageContainer.appendChild(this.nodes.imageEl);

		document.addEventListener('click', e => {
			let elementResize = document.getElementsByClassName('image-tool__image');
			console.log('asdfg');
			if (elementResize && !(e?.target?.className === 'image-tool__image-picture' || e?.target?.className === 'image-tool__image')) {
				let array = [...elementResize];
				array.map(el => {
					if (el?.lastChild?.className === 'resizers') {
						el.removeChild(el.lastChild);
					}
				});
			}
		});
		this.nodes.imageContainer.addEventListener('click', e => {
			e.preventDefault();
			let elementResize = this.nodes.wrapper.getElementsByClassName('image-tool__image');

			let resizer = document.createElement('div');
			resizer.className = 'resizers';
			let bottomRight = document.createElement('div');
			bottomRight.className = 'resizer bottom-right';
			resizer.appendChild(bottomRight);
			elementResize[0].appendChild(resizer);

			function makeResizableDiv() {
				const resizers = elementResize[0].querySelectorAll('.resizer');
				const minimum_size = 20;
				let original_width = 0;
				let original_height = 0;
				let original_mouse_x = 0;
				let original_mouse_y = 0;
				for (let i = 0;i < resizers.length; i++) {
		  const currentResizer = resizers[i];
		  currentResizer.addEventListener('mousedown', e => {
						e.preventDefault();
						original_width = parseFloat(getComputedStyle(elementResize[0], null).getPropertyValue('width').replace('px', ''));
						original_height = parseFloat(getComputedStyle(elementResize[0], null).getPropertyValue('height').replace('px', ''));
						original_mouse_x = e.pageX;
						original_mouse_y = e.pageY;
						window.addEventListener('mousemove', resize);
						window.addEventListener('mouseup', stopResize);
		  });

		  function resize(e) {
			  if (currentResizer.classList.contains('bottom-right')) {
				  const width = original_width + (e.pageX - original_mouse_x);
				  const height = original_height + (e.pageY - original_mouse_y);
				  let ratio = original_width / original_height;

				  if (width > minimum_size) {
					  elementResize[0].style.width = width + 'px';
				  }
				  if (height > minimum_size) {
					  elementResize[0].style.height = width / ratio + 'px';
				  }
			  }
		  }

					function stopResize() {
						window.removeEventListener('mousemove', resize);
		  }
				}
			}
			makeResizableDiv('.image-tool--resize .image-tool__image');
		});
		}
	}

	handleResizers() {
		let elementResize = this.nodes.wrapper.getElementsByClassName('image-tool__image');
		if (elementResize[0] && elementResize[0].getElementsByClassName('resizers')) {
			let element = this.nodes.wrapper.getElementsByClassName('resizers');
			element[0].classList.remove('resizers');
		}
	}

	/**
   * Shows caption input
   *
   * @param {string} text - caption text
   * @returns {void}
   */

	/**
   * Changes UI status
   *
   * @param {string} status - see {@link Ui.status} constants
   * @returns {void}
   */
	toggleStatus(status) {
		for (const statusType in Ui.status) {
			if (Object.prototype.hasOwnProperty.call(Ui.status, statusType)) {
				this.nodes.wrapper.classList.toggle(`${ this.CSS.wrapper }--${ Ui.status[statusType] }`, status === Ui.status[statusType]);
			}
		}
	}

	/**
   * Apply visual representation of activated tune
   *
   * @param {string} tuneName - one of available tunes {@link Tunes.tunes}
   * @param {boolean} status - true for enable, false for disable
   * @returns {void}
   */
	applyTune(tuneName, status) {
		this.nodes.wrapper.classList.toggle(`${ this.CSS.wrapper }--${ tuneName }`, status);
	}
}

