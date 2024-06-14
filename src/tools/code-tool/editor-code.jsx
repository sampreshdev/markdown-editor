
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Col, Collapse, Divider, Row } from 'antd';
import Icon from '@ant-design/icons/lib/components/Icon';
import { Form } from 'react-final-form';

import Modal from '../../../../common/modal';
import EmployeeIcon from '../../../../../../icons/employee-icon';
import JsonResponseEditor from '../../../../../postman/components/commons/json-response-editor/json-response-editor';
import { isNotEmptyArray, isNotEmptyObject, isNumber } from '../../../../../utils/type-util';
import CodeHighlighter from '../../../../../postman/right-api-doc/api-documentation/content/code-highlighter';
import Locale from '../../../../users/locale';
import NoSearchDataIcon from '../../../../../../icons/no-search-data-icon';
import InputField from '../../../../common/form/input-field';

import style from './editor-code.scss';

export default function EditorCode({ setContainerData, container, openModal, setOpenModal, codeData, setCodeData }) {
	const [edit, setEdit] = useState(false);

	const initialValues = useMemo(() => {
		if (isNotEmptyArray(codeData)) {
			return {
				languageData: [...codeData]
			};
		}
		return {
			languageData: []
		};
	},[codeData]);

	const handleSubmitData = () => {
		setEdit(null);
	};

	const validate = values => {
		let errors = {
			languageData: []
		};
		if (isNotEmptyArray(values?.languageData)) {
			let languageError = [];
			values?.languageData.map((el, elIndex) => {
				let obj = {};
				if (!el.language) {
					obj.language = 'Enter a code language';
				}
				if (el.language && codeData.some((item, itemIndex) => item.language === el.language && elIndex !== itemIndex)) {
					obj.language = 'Language already exist';
				}
				languageError.push(obj);
			});
			errors.languageData = languageError;
		}
		return errors;
	};
	const handleClickAdd = (form, values) => {
		setEdit(values?.languageData?.length);
		form.change('languageData', [...values?.languageData, {}]);
	};

	const handleEdit = (el, index) => {
		setEdit(index);
	};

	const handleDelete = (index, form, values) => {
		let newValues = [...values?.languageData];
		newValues.splice(index, 1);
		form.change('languageData', newValues);
	};

	const onSubmit = values => {
		container.innerHTML = JSON.stringify(values?.languageData);
		setContainerData(JSON.stringify(values?.languageData));
		setCodeData(values?.languageData);
		setOpenModal(false);
	};

	return (
		<>
			<Modal
				className={style.content}
				overlayClassName={style.overlay}
				portalClassName={style.portal}
				bodyStyle={{ padding: '0px' }}
				onRequestClose={() => setOpenModal(false)}
				isOpen={openModal}
				hideHeader={true}
			>
				<Form
					initialValues={initialValues}
					onSubmit={() => void 0}
					validate={validate}
					render={({ handleSubmit, invalid, values, form }) => (
						<form onSubmit={handleSubmit} className={style['form']}>

							{
								isNumber(edit) ?
									<>
										<AddEditLanguage
											form={form}
											setEdit={setEdit}
											invalid={invalid}
											handleSubmitData={handleSubmitData}
											values={values}
											index={edit}
										/>
									</>
									:
									<>
										<div className={style['modal-detail']}>
											<div className={style['select-language']}>
                                                Select Language
												<div className={style['btn-group']}>
													<Button className={style['add-btn']} onClick={() => handleClickAdd(form, values)}>
                                                        Add language
													</Button>
													<Button className={style['submit-btn']} onClick={() => onSubmit(values)}>
                                                        Submit code
													</Button>
													<Button className={style['close-btn']} onClick={() => setOpenModal(false)}>
                                                        Close
													</Button>
												</div>
											</div>
											{
												isNotEmptyArray(values?.languageData) &&
                                                <div className={style['laguage-row']}>
                                                	{
                                                		values?.languageData.map((el, index) => {
                                                			return <>
                                                				<Collapse
                                                					items={[{
                                                						key: index,
                                                						label: <>
                                                							<div className={style['label-div']}>
                                                								<div className={style['label']}>
                                                									{el.language || 'Click edit to enter a language'}
                                                								</div>
                                                								<div className={style['btn-group']}>
                                                									<div className={style['delete-btn']} onClick={() => handleDelete(index, form, values)}>
                                                                                        Delete
                                                									</div>
                                                									<div className={style['edit-btn']} onClick={() => handleEdit(el, index)}>
                                                                                        Edit
                                                									</div>
                                                								</div>
                                                							</div>
                                                						</>,
                                                						children: <CodeHigh data={el} /> }]}
                                                				/>
                                                			</>;
                                                		})
                                                	}
                                                </div>
											}
											{!isNotEmptyArray(values?.languageData) &&
                                                <div className={style['no-data-found']}>
                                                	<Icon
                                                		component={NoSearchDataIcon}
                                                		style={{ width: '65px', height: '65px' }}
                                                	/>
                                                	<div className={style['no-data-txt']}>
                                                		{
                                                			<Locale name={'No language found'} title={`No language found`} />}
                                                	</div>
                                                </div>
											}
										</div>
									</>
							}
						</form>
					)}
				/>
			</Modal>
		</>
	);
}

const AddEditLanguage = ({ form, invalid, setEdit, index, values }) => {
	const editorRef = useRef(null);
	const [validJson, setValidJson] = useState(null);

	const handleSubmitData = () => {
		setEdit(null);
	};

	useEffect(() => {
		if (isNotEmptyObject(values?.languageData[index])) {
			let data = values?.languageData[index];
			setValidJson(data?.text);
		}
	},[values?.languageData[index]]);

	const handleBackTolist = () => {
		let obj = values.languageData[index];
		if (!obj?.text && !obj?.language) {
			let newValues = [...values?.languageData];
			newValues.splice(index, 1);
			form.change('languageData', newValues);
		}
		setEdit(null);
	};

	return <>
		<div className={style['modal-main']}>
			<div className={style['modal-header']}>
				<Icon component={EmployeeIcon} style={{ width: '15px' }} />
                    Enter Code Here
			</div>
			<Divider style={{ margin: '0px 0' }} />
			<div className={style['main-content']}>
				<Row>
					<Col className='gutter-row' span={24}>
						<div className={style['input-div']}>
							<div className={style['label']}>
                                Select Language
							</div>
							<div className={style['input']}>
								<InputField name={'languageData.' + index + '.language'} />
							</div>
						</div>
					</Col>
				</Row>

				<JsonResponseEditor
					name={'languageData.' + index + '.text'}
					editorClassName={style['editor-div']}
					editorRef={editorRef}
					form={form} data={validJson || {}}
					language={values?.languageData[index].language || 'javascript'}
				/>
			</div>
			<div className={style['btn-group']}>
				<Button disabled={invalid} className={style['generate-btn']} onClick={() => !invalid && handleSubmitData()}>
                    Submit
				</Button>
				<Button className={style['close-btn']} onClick={handleBackTolist}>
                    Back to List
				</Button>
			</div>
		</div>
	</>;
};

function CodeHigh({ data }) {
    	return (
    		<div>
    			<CodeHighlighter
    				title={data.language}
    				code={data.text}
    				backgroundColor='var(--color-brand-api-background)'
    				className='middle-container'
    			/>
    		</div>
    	);
}

