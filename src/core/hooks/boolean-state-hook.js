import { useState } from "react";

const useBooleanState = (initialValue) => {
	const [state, setState] = useState(initialValue);
	const setStateToTrue = () => setState(true);
	const setStateToFalse = () => setState(false);
	const toggleState = () => setState((prevState) => !prevState);
	return [state, toggleState, setStateToTrue, setStateToFalse];
};

export default useBooleanState;
