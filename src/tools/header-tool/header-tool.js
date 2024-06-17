import './header-tool.module.scss?global';

import { IconH1, IconH2, IconH3, IconH4, IconH5, IconH6, IconHeading } from '@codexteam/icons';

export default class HeaderTool {

  constructor({ data, config, api, readOnly, ...rest }) {
    this.api = api;
    this.readOnly = readOnly;

    this._CSS = {
      block: this.api.styles.block,
      wrapper: 'ce-header',
    };

    this._settings = config;
    this.level = data.level;
    this._data = this.normalizeData(data);

    this._element = this.getTag();
    console.log({config, data, ...rest});
  }
  normalizeData(data) {
    const newData = {};

    if (typeof data !== 'object') {
      data = {};
    }
    this.savedData = {};
    if (data?.text) {
      this.savedData = {
        text: data?.text?.substring(data?.text?.match(/^#+/)?.[0]?.length).trim(),
        level: data?.text?.match(/^#+/)?.[0]?.length
    };
    }
    newData.text = this.savedData.text || '';
    newData.level = parseInt(this.savedData.level) || this.level;

    if (this._settings.rawMode) {
        newData.text = data.text;
        newData.level = null;
    }

    return newData;
  }

  render() {
    return this._element;
  }

  renderSettings() {
    return this.levels.map(level => ({
      icon: level.svg,
      label: this.api.i18n.t(`Heading ${level.number}`),
      onActivate: () => this.setLevel(level.number),
      closeOnActivate: true,
      isActive: this.currentLevel.number === level.number,
    }));
  }

  setLevel(level) {
    this.data = {
      level: level,
      text: this.data.text,
    };
  }
  merge(data) {
    const newData = {
      text: this.data.text + data.text,
      level: this.data.level,
    };

    this.data = newData;
  }

  validate(blockData) {
    return blockData?.text?.trim() !== '';
  }

  parseHeaderToMarkdown(text, level, rawMode) {
    if (rawMode) {
      return text + '\n';
    }
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

  save(toolsContent) {
    console.log(this.currentLevel);
    console.log(toolsContent, this._data, this.data);
    return {
      text: this.parseHeaderToMarkdown(toolsContent.innerHTML,this.currentLevel.number, this._settings.rawMode)
    };
  }
  static get conversionConfig() {
    return {
      export: 'text',
      import: 'text',
    };
  }
  static get sanitize() {
    return {
      level: false,
      text: {},
    };
  }
  static get isReadOnlySupported() {
    return true;
  }

  get data() {
    this._data.text = this._element.innerHTML;
    this._data.level = this.currentLevel.number;

    return this._data;
  }

  set data(data) {
    this._data = this.normalizeData(data);

    /**
     * If level is set and block in DOM
     * then replace it to a new block
     */
    if (data.level !== undefined && this._element.parentNode) {
      /**
       * Create a new tag
       *
       * @type {HTMLHeadingElement}
       */
      const newHeader = this.getTag();

      /**
       * Save Block's content
       */
      newHeader.innerHTML = this._element.innerHTML;

      /**
       * Replace blocks
       */
      this._element.parentNode.replaceChild(newHeader, this._element);

      /**
       * Save new block to private variable
       *
       * @type {HTMLHeadingElement}
       * @private
       */
      this._element = newHeader;
    }

    /**
     * If data.text was passed then update block's content
     */
    if (data.text !== undefined) {
      this._element.innerHTML = this._data.text || '';
    }
  }

  /**
   * Get tag for target level
   * By default returns second-leveled header
   *
   * @returns {HTMLElement}
   */
  getTag() {
    /**
     * Create element for current Block's level
     */
    const tag = document.createElement(this._settings.rawMode ? 'DIV' : this.currentLevel.tag);

    /**
     * Add text to block
     */
    tag.innerHTML = this._data.text || '';

    /**
     * Add styles class
     */
    tag.classList.add(this._CSS.wrapper);

    /**
     * Make tag editable
     */
    tag.contentEditable = this.readOnly ? 'false' : 'true';

    /**
     * Add Placeholder
     */
    tag.dataset.placeholder = this.api.i18n.t(this._settings.placeholder || '');

    return tag;
  }

  /**
   * Get current level
   *
   * @returns {level}
   */
  get currentLevel() {
    let level = this.levels.find(levelItem => levelItem.number === this._data.level);

    if (!level) {
      level = this.defaultLevel;
    }

    return level;
  }

  /**
   * Return default level
   *
   * @returns {level}
   */
  get defaultLevel() {
    /**
     * User can specify own default level value
     */
    if (this._settings.defaultLevel) {
      const userSpecified = this.levels.find(levelItem => {
        return levelItem.number === this._settings.defaultLevel;
      });

      if (userSpecified) {
        return userSpecified;
      } else {
        console.warn('(ง\'̀-\'́)ง Heading Tool: the default level specified was not found in available levels');
      }
    }

    /**
     * With no additional options, there will be H2 by default
     *
     * @type {level}
     */
    return this.levels[1];
  }

  /**
   * @typedef {object} level
   * @property {number} number - level number
   * @property {string} tag - tag corresponds with level number
   * @property {string} svg - icon
   */

  /**
   * Available header levels
   *
   * @returns {level[]}
   */
  get levels() {
    const availableLevels = [
      {
        number: 1,
        tag: 'H1',
        svg: IconH1,
      },
      {
        number: 2,
        tag: 'H2',
        svg: IconH2,
      },
      {
        number: 3,
        tag: 'H3',
        svg: IconH3,
      },
      {
        number: 4,
        tag: 'H4',
        svg: IconH4,
      },
      {
        number: 5,
        tag: 'H5',
        svg: IconH5,
      },
      {
        number: 6,
        tag: 'H6',
        svg: IconH6,
      },
    ];

    return this._settings.levels ? availableLevels.filter(
      l => this._settings.levels.includes(l.number)
    ) : availableLevels;
  }

  /**
   * Handle H1-H6 tags on paste to substitute it with header Tool
   *
   * @param {PasteEvent} event - event with pasted content
   */
  onPaste(event) {
    const content = event.detail.data;

    /**
     * Define default level value
     *
     * @type {number}
     */
    let level = this.defaultLevel.number;

    switch (content.tagName) {
      case 'H1':
        level = 1;
        break;
      case 'H2':
        level = 2;
        break;
      case 'H3':
        level = 3;
        break;
      case 'H4':
        level = 4;
        break;
      case 'H5':
        level = 5;
        break;
      case 'H6':
        level = 6;
        break;
    }

    if (this._settings.levels) {
      level = this._settings.levels.reduce((prevLevel, currLevel) => {
        return Math.abs(currLevel - level) < Math.abs(prevLevel - level) ? currLevel : prevLevel;
      });
    }

    this.data = {
      level,
      text: content.innerHTML,
    };
  }

  /**
   * Used by Editor.js paste handling API.
   * Provides configuration to handle H1-H6 tags.
   *
   * @returns {{handler: (function(HTMLElement): {text: string}), tags: string[]}}
   */
  static get pasteConfig() {
    return {
      tags: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
    };
  }

  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: IconHeading,
      title: 'Heading',
    };
  }
}