import React, {useState, useEffect} from "react";
import styles from "./forgot-password.module.css";
// components
import Button from "../../../reusable-components/Button/Button";
import Card from "../../../reusable-components/Card/Card";
import Input from "../../../reusable-components/Input/Input";
import Modal from "../../../reusable-components/Modal/Modal";
// hooks
import useInput from "../../../hooks/useInput";
// ext libraries
import {Link} from "react-router-dom";


interface IFormDataErrors {
	email: Array<string>
}

const ForgotPasswordPage: React.FC = () => {

	const [formDataErrors, setFormDataErrors] = useState<any>({
		email: []
	});
	const [isFormValid, setIsFormValid] = useState<boolean>(false);
	const [isModalOpen, setModalIsOpen] = useState<boolean>(false);
	const [savedEmail, setSavedEmail] = useState<string>("")


	const {
		value: enteredEmail,
		isValid: enteredEmailIsValid,
		hasError: enteredEmailHasError,
		valueChangeHandler: enteredEmailChangeHandler,
		inputBlurHandler: enteredEmailBlurHandler,
		reset: enteredEmailReset,
		errorsArray: emailErrorsArray,
	} = useInput((value: string) => value.includes("@") && value.length > 3, formDataErrors.email);

	useEffect(() => {
		setIsFormValid(enteredEmailIsValid);
	}, [enteredEmailIsValid])


	const handleSubmitForm = (event: React.FormEvent) => {
		event.preventDefault();
		setModalIsOpen(true);
		setSavedEmail(enteredEmail);
		enteredEmailReset();
		// axios.post("forgot-password/", enteredEmail)
		// 	.then((res) => {
		// 		console.log(res);
		// 	})
		// 	.catch((err) => {
		// 		setIsFormValid(false);
		//
		// 	})
		// enteredEmailReset();
	}


	return (
		<div>
			<Modal
				isOpen={isModalOpen}
			>
				<p className={styles.modalText}>An email with a password reset link has been sent to {savedEmail}</p>
				<div className={styles.modalLinkContainer}>
					<Link
						className={styles.modalLink}
						to={"/auth/login"}
					>
						Go to login page
					</Link>
				</div>

				<Button
					onClick={() => setModalIsOpen(false)}
					text={"Close"}
				/>
			</Modal>
			<div className={styles.formContainer}>
				<Card>
					<h2 className={styles.formTitle}>
						Forgot Password
					</h2>
					<form
						className={styles.form}
						onSubmit={handleSubmitForm}
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
						<div className={styles.submitButtonContainer}>
							<Button
								disabled={!isFormValid}
								text={"Send a password reset link"}
							/>
						</div>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default ForgotPasswordPage;
