import React from "react";
import styles from "./Button.module.css";

interface IButton {
	className?: string;
	disabled?: boolean;
	onClick?: (...args: Array<unknown>) => void;
	outlined?: boolean;
	text: string;
}

const Button: React.FC<IButton> = ({
  disabled = false,
	onClick = () => {},
	outlined = false,
	text,
}) => {
	return (
		<div className={styles.container}>
			<button
				className={[
					outlined ? styles.buttonOutlined : styles.buttonFilled,
					disabled ? styles.buttonDisabled : "",
				].join(" ")}
				disabled={disabled}
				onClick={onClick}
			>
				{text}
			</button>
		</div>
	);
};

export default Button;
