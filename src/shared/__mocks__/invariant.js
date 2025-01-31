export default function invariant(
	cond,
	message,
	...args
) {
	if (cond) {
		return;
	}

	throw new Error(
		args.reduce((msg, arg) => msg.replace('%s', String(arg)), message || '')
	);
}
