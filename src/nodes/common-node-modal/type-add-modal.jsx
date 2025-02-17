import React from 'react';
import { Modal } from 'antd';

import style from './type-add-modal.module.scss'

export default function TypeAddModal({ open, onCancel }) {
    console.log(open);
  return (
    <Modal open={open} onCancel={onCancel} className={style['type-add-modal']}>
        sdf
    </Modal>
  )
}
