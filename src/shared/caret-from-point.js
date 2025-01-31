export default function caretFromPoint(
	x,
	y
) {
	if (typeof document.caretRangeFromPoint !== 'undefined') {
		const range = document.caretRangeFromPoint(x, y);
		if (range === null) {
			return null;
		}
		return {
			node: range.startContainer,
			offset: range.startOffset
		};
	} else if (document.caretPositionFromPoint) {
		const range = document.caretPositionFromPoint(x, y);
		if (range === null) {
			return null;
		}
		return {
			node: range.offsetNode,
			offset: range.offset
		};
	} else {
		return null;
	}
}
