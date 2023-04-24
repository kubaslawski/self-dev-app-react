import React, {useEffect, useState} from "react";
import styles from "./reset-password.module.css"
// components
import Button from "../../../reusable-components/Button/Button";
import Card from "../../../reusable-components/Card/Card";
import Input from "../../../reusable-components/Input/Input";
// hooks
import useInput from "../../../hooks/useInput";
// external
import axios from "axios";
import {useParams} from "react-router-dom";


const ResetPasswordPage: React.FC = () => {
	const params = useParams()
	const token = params;

	const [formDataErrors, setFormDataErrors] = useState({
		password: [],
		confirmPassword: [],
	});
	const [isFormValid, setIsFormValid] = useState<boolean>(false);

	const {
		value: enteredPassword,
		isValid: enteredPasswordIsValid,
		hasError: enteredPasswordHasError,
		valueChangeHandler: enteredPasswordChangeHandler,
		inputBlurHandler: enteredPasswordBlurHandler,
		reset: enteredPasswordReset,
		errorsArray: passwordErrorsArray,
	} = useInput((value: string) => value.length >= 8, formDataErrors.password);

	const {
		value: enteredConfirmPassword,
		isValid: enteredConfirmPasswordIsValid,
		hasError: enteredConfirmPasswordHasError,
		valueChangeHandler: enteredConfirmPasswordChangeHandler,
		inputBlurHandler: enteredConfirmPasswordBlurHandler,
		reset: enteredConfirmPasswordReset,
		errorsArray: confirmPasswordErrorsArray,
	} = useInput((value: string) => value.length >= 8, formDataErrors.confirmPassword);

	useEffect(() => {
		setIsFormValid(enteredPasswordIsValid && enteredConfirmPasswordIsValid)
	}, [enteredPasswordIsValid, enteredConfirmPasswordIsValid]);

	useEffect(() => {
		if(token){
			// TODO: Check if token is active
			console.log(token)
		}
	}, [token])


	const handleSubmitForm = (event: React.FormEvent) => {
		event.preventDefault();
		const newPassword = {
			password: enteredPassword,
			confirmPassword: enteredConfirmPassword,
		};
		axios.post("/")
	};

	return (
		<div>
			<div className={styles.formContainer}>
				<Card>
					<h2 className={styles.formTitle}>Password Reset</h2>
					<form
						onSubmit={handleSubmitForm}
						className={styles.form}
					>
						<Input
							error={enteredPasswordHasError ? "Password must have at least 8 characters and both passwords must match" : null}
							errors={passwordErrorsArray || []}
							onBlur={enteredPasswordBlurHandler}
							onChange={enteredPasswordChangeHandler}
							label={"Password"}
							name={"password"}
							type={"password"}
							value={enteredPassword}
						/>
						<Input
							error={enteredConfirmPasswordHasError ? "Password must have at least 8 characters and both passwords must match" : null}
							errors={confirmPasswordErrorsArray || []}
							onBlur={enteredConfirmPasswordBlurHandler}
							onChange={enteredConfirmPasswordChangeHandler}
							label={"Confirm Password"}
							name={"confirmPassword"}
							type={"password"}
							value={enteredConfirmPassword}
						/>
						<div className={styles.submitButtonContainer}>
							<Button
								disabled={!isFormValid}
								text={"Submit"}
							/>
						</div>
					</form>
				</Card>
			</div>
		</div>
	)
}

export default ResetPasswordPage;
