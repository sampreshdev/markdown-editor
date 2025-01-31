import * as React from 'react';
import './Select.css';

export default function Select({
	children,
	label,
	className,
	...other
}) {
	return (
		<div className='Input__wrapper'>
			<label style={{ marginTop: '-1em' }} className='Input__label'>
				{label}
			</label>
			<select {...other} className={className || 'select'}>
				{children}
			</select>
		</div>
	);
}
