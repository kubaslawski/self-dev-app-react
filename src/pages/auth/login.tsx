import React, {useState, useEffect} from "react";
import styles from "./login.module.css";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
// components
import Button from "../../reusable-components/Button/Button";
import Card from "../../reusable-components/Card/Card";
import Input from "../../reusable-components/Input/Input";
import MainErrorMessage from "../../reusable-components/MainErrorMessage/MainErrorMessage";
// hooks
import useInput from "../../hooks/useInput";
// redux
import {LOGIN_REQUEST} from "../../redux/types";
import store from "../../redux/store";
// interfaces
import {ILoginUserData} from "../../global/interfaces/ILoginUserData";
import {IErrors} from "../../global/interfaces/IErrors";

interface ILoginFormErrors {
	email: Array<string>;
	password: Array<string>;
	general: Array<string>;
}

const LoginPage: React.FC = () => {

	const errors: IErrors = useSelector((state: any) => state.ui.errors);

	const [formDataErrors, setFormDataErrors] = useState<ILoginFormErrors>({
		email: [],
		password: [],
		general: [],
	});

	const {
		value: enteredEmail,
		isValid: enteredEmailIsValid,
		hasError: enteredEmailHasError,
		valueChangeHandler: enteredEmailChangeHandler,
		inputBlurHandler: enteredEmailBlurHandler,
		reset: enteredEmailReset,
		errorsArray: emailErrorsArray,
	} = useInput((value: string) => value.includes("@") && value.length > 3, formDataErrors.email)

	const {
		value: enteredPassword,
		isValid: enteredPasswordIsValid,
		hasError: enteredPasswordHasError,
		valueChangeHandler: enteredPasswordChangeHandler,
		inputBlurHandler: enteredPasswordBlurHandler,
		reset: enteredPasswordReset,
		errorsArray: passwordErrorsArray,
	} = useInput((value: string) => value.trim().length > 0, formDataErrors.password);

	const [isFormValid, setIsFormValid] = useState<boolean>(false);

	useEffect(() => {
		setIsFormValid(enteredEmailIsValid && enteredPasswordIsValid)
	}, [enteredEmail, enteredPassword]);

	useEffect(() => {
		if(errors.main.length > 0){
			setIsFormValid(false);
		}
	}, [errors]);

	const handleSubmitForm = (event: React.FormEvent) => {
		event.preventDefault();
		const userData: ILoginUserData = {
			email: enteredEmail,
		  password: enteredPassword
		}
		store.dispatch({
			type: LOGIN_REQUEST,
			payload: userData
		})
		// resetInputs();
		// dispatch(loginUser(userData));
	};

	return (
		<div>
			<div className={styles.formContainer}>
				<Card>
					<h2 className={styles.formTitle}>Login</h2>
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
							error={enteredPasswordHasError ? "Password cannot be empty" : null}
							errors={passwordErrorsArray || []}
							onBlur={enteredPasswordBlurHandler}
							onChange={enteredPasswordChangeHandler}
							label={"Password"}
							name={"password"}
							type={"password"}
							value={enteredPassword}
						/>
						<MainErrorMessage errors={errors.main}/>
						<div className={styles.forgotPasswordContainer}>
							<Link to={"/auth/forgot-password"}>
								Don't remember your password? Click here
							</Link>
						</div>
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
	);
};

export default LoginPage;
