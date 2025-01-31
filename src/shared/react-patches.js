import React from 'react';
const START_TRANSITION = 'startTransition';

export function startTransition(callback) {
	if (START_TRANSITION in React) {
		React[START_TRANSITION](callback);
	} else {
		callback();
	}
}
