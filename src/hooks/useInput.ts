import {ChangeEvent, useEffect, useState} from 'react';

const useInput = (validateValue: any, errors: Array<string>) => {
	const [enteredValue, setEnteredValue] = useState('');
	const [isTouched, setIsTouched] = useState(false);
	const [errorsArray, setErrorsArray] = useState<string []>([]);

	useEffect(() => {
		setErrorsArray(errors);
	}, [errors]);

	const valueIsValid = validateValue(enteredValue);
	const hasError = !valueIsValid && isTouched;

	const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setEnteredValue(event.target.value);
		setErrorsArray([]);
	};

	const inputBlurHandler = () => {
		setIsTouched(true);
	};

	const reset = () => {
		setEnteredValue('');
		setIsTouched(false);
	};

	return {
		value: enteredValue,
		isValid: valueIsValid,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
		reset,
		errorsArray,
	};
};

export default useInput;
