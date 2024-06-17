import Table from '@editorjs/table';
import List from '@editorjs/nested-list';
import Delimiter from '@editorjs/delimiter';
import Quote from '@egg-/editor-js-quote';
import Tooltip from 'editorjs-tooltip';
import Marker from '@editorjs/marker';
import Paragraph from '@editorjs/paragraph';
import Underline from '@editorjs/underline';
import Link from '@editorjs/link';

import FontSizeTool from '../tools/font-size-tool/font-size-tool';

import SimpleImage from './simple-image-tool/image-tool';
import LinkTool from './link-text-tool/link-tool';
import MarkDownTool from './markdown-tool/markdown-tool.js';
import CodeTool from './code-tool/code-tool.js';
import HeaderTool from './header-tool/header-tool.js';

// const ColorPlugin = require('editorjs-text-color-plugin');

export const EDITOR_JS_TOOLS = ({ rawMode }) => {
	// table: Table,
	// list: List,
	return {
		header: {
			'class': HeaderTool,
			inlineToolbar: true,
			setLevel: 1,
			config: {
				rawMode: rawMode
			},
			toolbox: [
				{
				  icon: '<div style="width: 16px; height: 16px;"><svg xmlns="http://www.w3.org/2000/svg" width="29.594" height="20.466" viewBox="0 0 29.594 20.466"><g id="H3" transform="translate(-2705.212 -8107.384)"><path id="Path_284495" data-name="Path 284495" d="M16.728-14.232a6.479,6.479,0,0,1,1.908-.864,7.882,7.882,0,0,1,2.028-.264,5.747,5.747,0,0,1,1.9.3,4.758,4.758,0,0,1,1.488.816,3.517,3.517,0,0,1,.96,1.236,3.643,3.643,0,0,1,.336,1.56A3.563,3.563,0,0,1,24.6-9.12,4.319,4.319,0,0,1,22.824-7.8a3.977,3.977,0,0,1,2.184,1.26,3.4,3.4,0,0,1,.864,2.34A4.135,4.135,0,0,1,25.4-2.16,4.1,4.1,0,0,1,24.168-.78,5.117,5.117,0,0,1,22.4,0a8.729,8.729,0,0,1-2.052.24,11.049,11.049,0,0,1-2.124-.2,6.513,6.513,0,0,1-1.812-.612L16.968-2.4q.816.312,1.5.5a6.467,6.467,0,0,0,1.716.192,4.687,4.687,0,0,0,1.164-.144,2.913,2.913,0,0,0,1-.456,2.374,2.374,0,0,0,.7-.792A2.357,2.357,0,0,0,23.3-4.248a2.127,2.127,0,0,0-.864-1.86,3.91,3.91,0,0,0-2.3-.612H18.36V-8.592H19.7a3.725,3.725,0,0,0,2.244-.636,2.23,2.23,0,0,0,.876-1.932,2.108,2.108,0,0,0-.708-1.644,2.542,2.542,0,0,0-1.764-.636,4.529,4.529,0,0,0-1.368.2,7.821,7.821,0,0,0-1.488.684Z" transform="translate(2708.684 8127.36)" fill="#0d192b" stroke="#0d192b" stroke-width="0.5" opacity="0.8" /><path id="Path_284500" data-name="Path 284500" d="M1.824,4.616V-15.12H5.176v8.145h8.74V-15.12h3.352V4.616H13.916V-4.218H5.176V4.616Z" transform="translate(2703.388 8122.504)" fill="#0d192b" opacity="0.8" /></g></svg></div>' ,// icon for H2,
				  title: 'Small Header',
				  data: {
						level: 3
				  }
				},
				{
				  icon: '<div style="width: 16px; height: 16px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 29.864 20.226"><g id="h2" transform="translate(-2647.474 -8107.384)"><path id="Path_284496" data-name="Path 284496" d="M20.832-13.392a3.935,3.935,0,0,0-1.464.276,6.092,6.092,0,0,0-1.488.9L16.8-13.824a6.73,6.73,0,0,1,2.052-1.188,6.532,6.532,0,0,1,2.124-.348,5.9,5.9,0,0,1,2.112.348,4.241,4.241,0,0,1,1.512.948,3.86,3.86,0,0,1,.9,1.416,5.109,5.109,0,0,1,.3,1.776,6.022,6.022,0,0,1-1.3,3.5,30.724,30.724,0,0,1-3.552,3.984l-1.44,1.392h6.576V0H16.944l-.456-1.7,2.064-2.064q1.272-1.272,2.172-2.268a18.219,18.219,0,0,0,1.464-1.812,7.219,7.219,0,0,0,.828-1.512,3.9,3.9,0,0,0,.264-1.392,2.839,2.839,0,0,0-.624-1.908A2.264,2.264,0,0,0,20.832-13.392Z" transform="translate(2651 8127.36)" fill="#0d192b" stroke="#0d192b" stroke-width="0.5" opacity="0.8" /><path id="Path_284499" data-name="Path 284499" d="M1.824,4.616V-15.12H5.176v8.145h8.74V-15.12h3.352V4.616H13.916V-4.218H5.176V4.616Z" transform="translate(2645.65 8122.504)" fill="#0d192b" opacity="0.8" /></g></svg></div>',
				  title: 'Medium Header',
				  data: {
						level: 2
				  }
				},
				{
					icon: '<div style="width: 16px; height: 16px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 25.893 19.986"><g id="H1" transform="translate(-2611.821 -8107.384)"><path id="Path_284497" data-name="Path 284497" d="M20.568-15.12h1.9V0H20.04V-12.672L17.3-11.4l-.576-1.944Z" transform="translate(2615 8127.12)" fill="#0d192b" stroke="#0d192b" stroke-width="0.5" opacity="0.8" /><path id="Path_284498" data-name="Path 284498" d="M1.824,4.616V-15.12H5.176v8.145h8.74V-15.12h3.352V4.616H13.916V-4.218H5.176V4.616Z" transform="translate(2609.997 8122.504)" fill="#0d192b" opacity="0.8" /></g></svg></div>',
					title: 'Large Header',
					data: {
						  level: 1
					}
				}
			  ]
		},
		image: {
			'class': SimpleImage,
			config: {
				uploader: { uploadByFile },
				rawMode: rawMode
			}
		}
	}
	// paragraph: {
	// 	'class': Paragraph,
	// 	inlineToolbar: true,
	// 	config: {
	// 		preserveBlank: true
	// 	}
	// },
	// delimiter: Delimiter,
	// quote: {
	// 	'class': Quote,
	// 	inlineToolbar: true
	// },
	// linkTool: {
	// 	'class': Link,
	// 	config: {
	// 	  endpoint: ''
	// 	}
	//   },
	// 	focusable: true
	// },
	// // Color: {
	// // 	'class': ColorPlugin,
	// // 	config: {
	// // 		colorCollections: ['#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
	// // 		defaultColor: '#333',
	// // 		type: 'text'
	// // 		// customPicker: true
	// // 	}
	// // },
	// fontSize: {
	// 	'class': FontSizeTool
	// },
	// code: CodeTool,
	// Marker: Marker,
	// underline: Underline,
	// tooltip: {
	// 	'class': Tooltip,
	// 	inlineToolbar: true,
	// 	config: {
	// 		highlightColor: '#FAD02E',
	// 		underline: true,
	// 		backgroundColor: '#34495E',
	// 		textColor: '#ECF0F1'
	// 	}
	// },
	// inlineCode: {
	// 	'class': LinkTool,
	// 	shortcut: 'CMD+SHIFT+M'
	// },
	// markdown: MarkDownTool
};

function uploadByFile(file) {
	return new Promise((resolve, reject) => {
	  let formData = new FormData();
	  formData.append('file', file);
	  resolve({ success: 1, file: { url: 'https://antrika-dev.s3.amazonaws.com/emp/655b2b8dc94aad7b54315867/656478dca677303b4b91f91d/image/66139bc6b107b86dbc0d1e4b.png' } });

	//   api.s3MultipartUpload(formData, { type: 'image', ext: '.png', contentType: file.type })
	// 	 .then(response => {
	// 		 if (response?.data?.s) {
	// 			} else {
	// 				toast.error((response.data.ed || response.data.msg || 'Image upload failed'),{ autoClose: '2000' });
	// 		  		reject({ success: 0, file: { url: null } });
	// 			}
	// 	 })
	// 	 .catch(error => {
	// 			toast.error(responseError(error),{ autoClose: '2000' });
	// 			reject({ success: 0, file: { url: null } });
	// 	 });
	});
}
