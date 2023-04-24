import React from "react";
import styles from "./MainErrorMessage.module.css";

interface IMainErrorMessage {
	errors: Array<string>;
}

const MainErrorMessage: React.FC<IMainErrorMessage> = ({errors}) => {
	return (
		<div className={styles.container}>
			{errors.map((err) => {
				return <span className={styles.errorMessage}>{err}</span>
			})}
		</div>
	);
};

export default MainErrorMessage;
