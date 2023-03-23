import React, {} from "react";
import styles from "./Modal.module.css";

interface IModal {
	children: React.ReactNode;
	isOpen: boolean;
}

const Modal: React.FC<IModal> = (
	{
		children,
		isOpen = false,
	}) => {

	return (
			<div className={isOpen ? styles.modalContainer : ""	}>
				<div className={[styles.modal, isOpen ? styles.modalOpen : styles.modalClosed].join(" ")}>
					{children}
				</div>
			</div>
	);

}

export default Modal;
