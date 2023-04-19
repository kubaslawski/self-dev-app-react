import React from "react";
import styles from "./Home.module.css";
// components
import Card from "../reusable-components/Card/Card";

const HomePage: React.FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.targetsContainer}>
				<Card>
					Targets
				</Card>
			</div>
			<div className={styles.statsContainer}>
				<Card>
					Stats
				</Card>
			</div>
		</div>
	)
};

export default HomePage;
