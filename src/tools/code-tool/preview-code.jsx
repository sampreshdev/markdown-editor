import React, { useEffect, useMemo, useState } from 'react';
import { Select } from 'antd';

import CodeHighlighter from '../../../../../postman/right-api-doc/api-documentation/content/code-highlighter';
import { isNotEmptyArray } from '../../../../../utils/type-util';

import style from './preview-code.scss';
import EditorCode from './editor-code';

export default function PreviewCode({ data, container, setContainerData, open, readOnly }) {
	const [selectedLanguageData, setSelectedLanguageData] = useState({});
	const [codeData, setCodeData] = useState([]);
	const [openModal, setOpenModal] = useState(open);
	useEffect(() => {
		if (data) {
			setCodeData(JSON.parse(data));
		}
	},[data]);

	const languageData = useMemo(() => {
		let values = [];
		if (isNotEmptyArray(codeData)) {
			codeData.map(el => {
				values.push({
					value:  el.language,
					label: el.language,
					text: el.text
				});
			});
			setSelectedLanguageData({
				value: codeData[0].language,
				label: codeData[0].language,
				text: codeData[0].text
			});
		}
		return values;
	},[codeData]);

	const handleSelectChange = val => {
		languageData.map(el => {
			if (el.value === val) {
				setSelectedLanguageData(el);
			}
		});
	};

	return (
		<div className={style['code']}>
			{
				<CodeHighlighter
					title={
						<div className={style['language-select']}>
							<Select
								options={languageData}
								value={selectedLanguageData?.value || ''}
								onChange={e => handleSelectChange(e)}
								popupClassName={style['select-dropdown']}
								disabled={!isNotEmptyArray(codeData)}
							/>
						</div>
					}
					code={selectedLanguageData?.text}
					backgroundColor='var(--color-brand-api-background)'
					className='container'
					canEdit={!readOnly}
					canCopy={isNotEmptyArray(codeData)}
					padding={'0px'}
					handleEdit={() => setOpenModal(true)}
					editTitle={isNotEmptyArray(codeData) ? 'Edit' : 'Add'}
				/>
			}
			{
				openModal && !readOnly && <EditorCode
					setContainerData={setContainerData}
					container={container}
					data={data}
					setOpenModal={setOpenModal}
					openModal={openModal}
					codeData={codeData}
					setCodeData={setCodeData}
				/>
			}
		</div>
	);
}
