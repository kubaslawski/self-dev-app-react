import React from "react";
import styles from "./Navbar.module.css";
import {Link, useLocation} from "react-router-dom";

const Navbar: React.FC = () => {

	const location = useLocation();

	return (
		<nav className={styles.navbarContainer}>
			<div className={styles.linksContainer}>
				<div className={styles.leftLinks}>
					<Link className={[styles.link, location.pathname === "/" ? styles.active : ""].join(" ")} to={"/"}>
						Home
					</Link>
					<Link className={[styles.link, location.pathname === "/tasks" ? styles.active : ""].join(" ")} to={"/tasks"}>
						Tasks
					</Link>
					<Link className={[styles.link, location.pathname === "/habits" ? styles.active : ""].join(" ")} to={"/habits"}>
						Habits
					</Link>
				</div>
				<div className={styles.rightLinks}>
					<Link
						className={[styles.link, location.pathname === "/login" ? styles.active : ""].join(" ")}
						to={"/auth/login"}
					>
						Login
					</Link>
					<Link className={[styles.link, location.pathname === "/signup" ? styles.active : ""].join(" ")} to={"/auth/signup"}>
						Register
					</Link>
					<Link className={[styles.link, location.pathname === "/my-profile" ? styles.active : ""].join(" ")} to={"/my-profile"}>
						My Profile
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
