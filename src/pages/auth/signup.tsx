import React, {useEffect, useState} from "react";
import axios, {AxiosError, AxiosResponse} from "axios";
import styles from "./signup.module.css";
// components
import Button from "../../reusable-components/Button/Button";
import Card from "../../reusable-components/Card/Card";
import Input from "../../reusable-components/Input/Input";
// hooks
import useInput from "../../hooks/useInput";

interface IRegistrationUserData {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
}

interface IRegistrationFormErrors {
	email: Array<string>;
	username: Array<string>;
	password: Array<string>;
	confirmPassword: Array<string>;
}


const SignUpPage: React.FC = () => {

	const [formDataErrors, setFormDataErrors] = useState<IRegistrationFormErrors>({
		email: [],
		username: [],
		password: [],
		confirmPassword: [],
	})

	const {
		value: enteredEmail,
		isValid: enteredEmailIsValid,
		hasError: enteredEmailHasError,
		valueChangeHandler: enteredEmailChangeHandler,
		inputBlurHandler: enteredEmailBlurHandler,
		reset: enteredEmailReset,
		errorsArray: emailErrorsArray,
	} = useInput((value: string) => value.includes("@") && value.length > 3, formDataErrors.email);

	const {
		value: enteredUsername,
		isValid: enteredUsernameIsValid,
		hasError: enteredUsernameHasError,
		valueChangeHandler: enteredUsernameChangeHandler,
		inputBlurHandler: enteredUsernameBlurHandler,
		reset: enteredUsernameReset,
		errorsArray: usernameErrorsArray,
	} = useInput((value: string) => value.length >= 3, formDataErrors.username);

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


	const [isFormValid, setIsFormValid] = useState<boolean>(false);

	const resetAllInputs = () => {
		enteredEmailReset();
		enteredUsernameReset();
		enteredPasswordReset();
		enteredConfirmPasswordReset();
	};

	useEffect(() => {
		setIsFormValid(enteredEmailIsValid && enteredUsernameIsValid && enteredPasswordIsValid && enteredConfirmPasswordIsValid)
	}, [enteredEmailIsValid, enteredUsernameIsValid, enteredPasswordIsValid, enteredConfirmPasswordIsValid])

	const handleSubmitForm = (event: React.FormEvent) => {
		event.preventDefault();
		const newUser: IRegistrationUserData = {
			email: enteredEmail,
			username: enteredUsername,
			password: enteredPassword,
			confirmPassword: enteredConfirmPassword
		}
		axios.post("register/", newUser)
			.then((res: AxiosResponse) => console.log(res))
			.catch((err: AxiosError) => {
				setIsFormValid(false);
				// @ts-ignore
				setFormDataErrors(err.response?.data);
				resetAllInputs();
			});
	};

	return (
		<div>
			<div className={styles.formContainer}>
				<Card>
					<h2 className={styles.formTitle}>Registration</h2>
					<form
						onSubmit={handleSubmitForm}
						className={styles.form}
					>
						<Input
							error={enteredEmailHasError ? "Please enter a valid email address" : null}
							errors={emailErrorsArray || []}
							onBlur={enteredEmailBlurHandler}
							onChange={enteredEmailChangeHandler}
							label={"Email"}
							name={"email"}
							value={enteredEmail}
						/>
						<Input
							error={enteredUsernameHasError ? "Username must have at least 3 characters" : null}
							errors={usernameErrorsArray || []}
							onBlur={enteredUsernameBlurHandler}
							onChange={enteredUsernameChangeHandler}
							label={"Username"}
							name={"username"}
							value={enteredUsername}
						/>
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
};

export default SignUpPage;
