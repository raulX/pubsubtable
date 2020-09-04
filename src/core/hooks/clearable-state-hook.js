import { useState } from "react";

const useClearableState = (initialValue) => {
	const [state, setState] = useState(initialValue);
	const resetState = () => setState(null);
	return [state, setState, resetState];
};

export default useClearableState;
