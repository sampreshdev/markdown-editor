import React from 'react'
import { Drawer } from 'antd';

import style from './type-node-drawer.module.scss';
import Icon from '@ant-design/icons';
import CrossIcon from '../icons/cross-icon';

export default function TypeNodeDrawer({ open, onCancel, handleModalOpen }) {
    const questions = [
        {
            key: 'free_text',
            title: 'Free Text',
            icon: 'https://app.dev.antrika.com/0cbe7a950875afbe728a.svg'
        },
        {
            key: 'user_input',
            title: 'User Input',
            icon: 'https://app.dev.antrika.com/0d9d10246ccf0f25fd4f.svg'
        },
        {
            key: 'multiple_choice',
            title: 'Multiple Choice',
            icon: 'https://app.dev.antrika.com/9391f299b9fc71e4ce4d.svg'
        },
        {
            key: 'appointment',
            title: 'Appointment',
            icon: 'https://app.dev.antrika.com/feae840829cb364128e9.svg'
        },
        {
            key: 'dropdown',
            title: 'Dropdown',
            icon: 'https://app.dev.antrika.com/eb1278f60c72eb2cb277.svg'
        },
        {
            key: 'prompt',
            title: 'Prompt',
            icon: 'https://app.dev.antrika.com/d019deb45f39e9a07795.svg'
        }
    ];

    const message = [
        {
            key: 'image',
            title: 'Image',
            icon: 'https://app.dev.antrika.com/e4ca56ece2c9e22b87a9.svg'
        },
        {
            key: 'upload_file',
            title: 'Upload File',
            icon: 'https://app.dev.antrika.com/1d28295c44e73670da78.svg'
        },
        {
            key: 'video',
            title: 'Video',
            icon: 'https://app.dev.antrika.com/7108ec349476589e7c7a.svg'
        },
        {
            key: 'link_component',
            title: 'Link Component',
            icon: 'https://app.dev.antrika.com/08ca2421e3da3c0f3b6a.svg'
        }
    ]

  return (
    <Drawer open={open} onClose={onCancel} title={false} className={style['drawer-for-nodes']}>
        <div className={style['type-node-drawer']}>
            <div className={style['header']}>
                <div className={style['text']}>
                     Elements
                </div>
                <div className={style['close-button']} onClick={onCancel}>
                    <Icon component={CrossIcon} style={{ width: '14px' }} />
                </div>
            </div>
            <div className={style['element-div']}>
                <div className={style['add-questions']}>
                    Add Questions
                </div>
                {
                    questions.map((el, index) => {
                        return <>
                        <div key={index} className={style['node-el']} onClick={() => handleModalOpen(el)}>
                            <div className={style['icon']}>
                                <img src={el.icon} alt='node' />
                            </div>
                            <div className={style['text']}>
                                {el.title}
                            </div>
                        </div>
                        </>
                    })
                }
            </div>

            <div className={style['element-div']}>
                <div className={style['add-questions']}>
                    Add Message
                </div>
                {
                    message.map((el, index) => {
                        return <>
                        <div key={index} className={style['node-el']} onClick={() => handleModalOpen(el)}>
                            <div className={style['icon']}>
                                <img src={el.icon} alt='node' />
                            </div>
                            <div className={style['text']}>
                                {el.title}
                            </div>
                        </div>
                        </>
                    })
                }
            </div>
        </div>
    </Drawer>
  )
}
