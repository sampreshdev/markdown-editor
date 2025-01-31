import {
	useFlashMessageContext
} from '../context/flash-message-context';

export default function useFlashMessage() {
	return useFlashMessageContext();
}
