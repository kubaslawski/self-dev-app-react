import React, {useRef, useState} from "react";
import uuid from "react-uuid";
import styles from "./Input.module.css";

enum labelPositionEnum {
	default = "default",
	top = "top"
}
type TLabelPosition = labelPositionEnum.default | labelPositionEnum.top;

interface IInput {
	disabled?: boolean;
	error?: string | null;
	errors: Array<string>;
	isError?: boolean;
	onBlur?: (...args: any) => void;
	onChange: (...args: any) => void;
	label: string;
	name?: string;
	type?: "text" | "password";
	value: string;
}

const Input: React.FC<IInput> = ({
	 disabled = false,
	 error,
	 errors = [],
	 isError = false,
	 label,
	 onBlur,
	 onChange,
	 name,
	 type = "text",
	 value
}) => {
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [labelPosition, setLabelPosition] = useState<TLabelPosition>(labelPositionEnum.default);
	const inputRef = useRef<HTMLInputElement>(null);

	const onBlurHandler = () => {
		if (value.trim().length === 0) {
			setTimeout(() => {
				setLabelPosition(labelPositionEnum.default);
				setIsFocused(false);
			}, 200)
		}
	};

	const onFocusHandler = () => {
		setIsFocused(true);
		setLabelPosition(labelPositionEnum.top);
	};

	return (
		<div className={styles.container}>
			<div className={[
				styles.inputContainer,
				isFocused ? styles.inputFocusedContainer : "",
				(errors.length > 0 || isError || error) ? styles.inputErrorContainer : "",
				disabled ? styles.inputDisabledContainer : "",
			].join(" ")}>
				<input
					className={[isFocused ? styles.input_focused : ""].join(" ")}
					disabled={disabled}
					name={name}
					onBlur={onBlur ? onBlur : onBlurHandler}
					onChange={onChange}
					onFocus={onFocusHandler}
					ref={inputRef}
					type={type}
				/>
				<label
					className={
					[labelPosition === labelPositionEnum.top ? styles.labelTop
							: styles.labelDefault,
						(errors.length > 0 || isError || error) ? styles.labelError : ""
					].join(" ")}>
					{label}
				</label>
			</div>
			<div className={styles.errorContainer}>
				{error && <span>{error}</span>}
				{errors.map((err: string) => {
					return (
						<li key={uuid()}>
							<span>{err}</span>
						</li>
					)
				})}
			</div>
		</div>
	);
};

export default Input;
