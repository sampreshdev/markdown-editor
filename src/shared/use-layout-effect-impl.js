import { useEffect, useLayoutEffect } from 'react';

import { CAN_USE_DOM } from './can-use-dom';

const useLayoutEffectImpl = CAN_USE_DOM
	? useLayoutEffect
	: useEffect;

export default useLayoutEffectImpl;
