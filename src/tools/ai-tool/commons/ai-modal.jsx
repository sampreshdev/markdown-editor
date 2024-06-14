import { Button, Col, Divider, Row } from 'antd';
import React, { useState } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import { Form } from 'react-final-form';

import EmployeeIcon from '../../../../../../../icons/employee-icon';
import SelectField from '../../../../../common/form/select-field';
import InputField from '../../../../../common/form/input-field';
import { api } from '../../../../../../api';
import { deepCopy } from '../../../../../../utils/object-util';
import SubmitMsg from '../../../../../common/form/submit-msg';
import Modal from '../../../../../common/modal';

import style from './ai-modal.scss';

export default function AIModal({ open, setContainerData, container }) {
	const [data, setData] = useState('');
	const [openModal, setOpenModal] = useState(open);
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');

	const handleSubmitData = () => {
		if (container) {
			container.innerHTML = data;
		}
		setContainerData(data);
		setOpenModal(false);
	};

	const handleSubmitAi = values => {

		let result = deepCopy(values);

		return api.callPostwithParams({
			url: '/emp/1/antrika/admin/document/ai/data',
			data: result
		}).then(
			r => {
				if (r.data && r.data.s) {
					setSuccess(r.data.msg || 'Successfully Processed!');
					setTimeout(() => {
						setData(r.data.content);
					},[1000]);
				} else {
					setError((r.data && r.data.ed) || 'Something went wrong, Please try again!');
				}
			},
			error => {
				setError(error);

			})
			.finally(() => {
				setTimeout(() => {
					setSuccess(null);
					setError();
				}, 3000);
			});
	};

	const validate = values => {
		let errors = {};
		if (!values.product) {
			errors.product = 'Enter a Product';
		}
		if (!values.targetAudience) {
			errors.targetAudience = 'Enter a Target Audience';
		}
		if (!values.toneOfVoice) {
			errors.toneOfVoice = 'Select a Tone Of Voice';
		}
		if (!values.creativity) {
			errors.creativity = 'Select a creativity';
		}
		return errors;
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
					onSubmit={() => void 0}
					validate={validate}
					render={({ handleSubmit, invalid, values }) => (
						<form onSubmit={handleSubmit} className={style['form']}>
							{data ? <>
								<div className={style['modal-main']}>
							 		<div className={style['main-content']}>
										<div dangerouslySetInnerHTML={{ __html: data }} />
									</div>
									<div className={style['btn-group']}>
										<Button className={style['generate-btn']} onClick={handleSubmitData}>
											Submit generated data
										</Button>
										<Button className={style['generate-btn']} onClick={() => setData(null)}>
											Reset
										</Button>
										<Button className={style['close-btn']} onClick={() => setOpenModal(false)}>
											Close ESC
										</Button>
									</div>
								</div>
							</> : <>
								<div className={style['modal-main']}>
									<div className={style['modal-header']}>
										<Icon component={EmployeeIcon} style={{ width: '15px' }} />
										Create launch plan
									</div>
									<Divider style={{ margin: '0px 0' }} />
									<div className={style['main-content']}>
										<div className={style['input-div']}>
											<div className={style['label']}>
											Product/feature
											</div>
											<div className={style['input']}>
												<InputField name='product' placeholder='Enter product/feature..' />
											</div>
										</div>
										<div className={style['input-div']}>
											<div className={style['label']}>
											Target audience
											</div>
											<div className={style['input']}>
												<InputField name='targetAudience' placeholder='Enter Target Audience' />
											</div>
										</div>
										<Row>
											<Col className='gutter-row' span={12}>
												<div className={style['input-div']}>
													<div className={style['label']}>
													Tone of voice
													</div>
													<div className={style['select']}>
														<SelectField name={'toneOfVoice'} keyField={'key'} textField={'value'} data={[{ key: '1', value: '1' }]} />
													</div>
												</div>
											</Col>
											<Col span={12}>
												<div className={style['input-div']}>
													<div className={style['label']}>
													Creativity
													</div>
													<div className={style['select']}>
														<SelectField name={'creativity'} keyField={'key'} textField={'value'} data={[{ key: '1', value: '1' }]} />
													</div>
												</div>
											</Col>
										</Row>
									</div>
									<div className={style['btn-group']}>
										<Button disabled={invalid} className={style['generate-btn']} onClick={() => !invalid && handleSubmitAi(values)}>
											Generate
										</Button>
										<Button className={style['close-btn']} onClick={() => setOpenModal(false)}>
											Close ESC
										</Button>
										{success && <SubmitMsg msg={success} className={'successMsg'} />}
										{error && <SubmitMsg msg={error} className={'errorMsg'} />}
									</div>
								</div>
							</>}
						</form>
					)}
				/>
			</Modal>
		</>
	);
}
