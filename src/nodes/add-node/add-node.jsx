import React, { useCallback, useState } from 'react';
import { Handle, Position } from '@xyflow/react';

import style from './add-node.module.scss';
import Icon from '@ant-design/icons';
import AddIcon from '../../icons/add-icon';
import { Button } from 'antd';
import TypeNodeDrawer from '../../type-nodes/type-node-drawer';
import TypeAddModal from '../common-node-modal/type-add-modal';

function AddNode(props) {
	const [open, setOpen] = useState(false);
	const [addModalDetail, setaddModalDetail] = useState(false);

	const onChange = useCallback(evt => {
		console.log(evt.target.value);
	}, []);

	const handleModalOpen = el => {
		setaddModalDetail(true);
	}


	return (
		<>
			<div className={style['add-node']}>
				<div className={style['add-node-text']}>
					{props.data.label}
				</div>
			</div>
			<Handle position={Position.Right} id='a' className={style['add-handle']}>
				<div className={style['handle-add']}>
					<Button className={style['add-icon']} onClick={() => setOpen(true)}>
						<Icon component={AddIcon} style={{ width: '10px', color: 'inherit' }} />
					</Button>
				</div>
			</Handle>
				{open && <TypeNodeDrawer open={open} onCancel={() => setOpen(false)} handleModalOpen={handleModalOpen} />}
				{addModalDetail &&  <TypeAddModal open={addModalDetail} onCancel={() => setaddModalDetail(false)} />}
		</>
	);
}
export default AddNode;
