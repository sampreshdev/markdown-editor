import React, { Children, useState } from 'react'
import { Drawer, Menu } from 'antd';
import Icon from '@ant-design/icons';


import style from './flow-side-bar.module.scss'
import CrossIcon from '../icons/cross-icon';
import Sider from 'antd/es/layout/Sider';

export default function FlowSideBar({ open, onCancel }) {
    const [collapsed, setCollapsed] = useState(false);
    const items = [
        {
            key: 'elements',
            label: 'Elements',
            type: 'group',
            children: [
                {
                    key: 'free_text',
                    label: 'Free Text',
                    icon: <img src='https://app.dev.antrika.com/0cbe7a950875afbe728a.svg' alt='node' style={{ width: '20px' }} />
                },
                {
                    key: 'user_input',
                    label: 'User Input',
                    icon: <img src='https://app.dev.antrika.com/0d9d10246ccf0f25fd4f.svg' alt='node' style={{ width: '20px' }} />
                },
                {
                    key: 'multiple_choice',
                    label: 'Multiple Choice',
                    icon: <img src='https://app.dev.antrika.com/9391f299b9fc71e4ce4d.svg' alt='node' style={{ width: '20px' }} />
                },
                {
                    key: 'appointment',
                    label: 'Appointment',
                    icon: <img src='https://app.dev.antrika.com/feae840829cb364128e9.svg' alt='node' style={{ width: '20px' }} />
                },
                {
                    key: 'dropdown',
                    label: 'Dropdown',
                    icon: <img src='https://app.dev.antrika.com/eb1278f60c72eb2cb277.svg' alt='node' style={{ width: '20px' }} />
                },
                {
                    key: 'prompt',
                    label: 'Prompt',
                    icon: <img src='https://app.dev.antrika.com/d019deb45f39e9a07795.svg' alt='node' style={{ width: '20px' }} />
                }
            ]
        },
        {
            key: 'message',
            label: 'Message',
            type: 'group',
            children: [
                {
                    key: 'image',
                    label: 'Image',
                    icon: <img src='https://app.dev.antrika.com/e4ca56ece2c9e22b87a9.svg' alt='node' style={{ width: '20px' }} />
                },
                {
                    key: 'upload_file',
                    label: 'Upload File',
                    icon: <img src='https://app.dev.antrika.com/1d28295c44e73670da78.svg' alt='node' style={{ width: '20px' }} />
                },
                {
                    key: 'video',
                    label: 'Video',
                    icon: <img src='https://app.dev.antrika.com/7108ec349476589e7c7a.svg' alt='node' style={{ width: '20px' }} />
                },
                {
                    key: 'link_component',
                    label: 'Link Component',
                    icon: <img src='https://app.dev.antrika.com/08ca2421e3da3c0f3b6a.svg' alt='node' style={{ width: '20px' }} />
                }
            ]
        }

    ];

    const message = [
       
    ]
  return (
    <div className={style['flow-side-bar']}>
        <Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
    </div>
  )
}
