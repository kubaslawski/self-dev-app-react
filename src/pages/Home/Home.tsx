import React from "react";
import styles from "./Home.module.css";
// components
import Button from "../../reusable-components/Button/Button";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Button text={"Click me"}/>
    </div>
  );
};

export default Home;
