import * as React from 'react';

import ColorPicker from './color-picker';
import DropDown from './drop-down';

export default function DropdownColorPicker({
	disabled = false,
	stopCloseOnClickSelf = true,
	color,
	onChange,
	...rest
}) {
	return (
		<DropDown
			{...rest}
			disabled={disabled}
			stopCloseOnClickSelf={stopCloseOnClickSelf}>
			<ColorPicker color={color} onChange={onChange} />
		</DropDown>
	);
}
