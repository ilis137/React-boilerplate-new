/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import styles from "./App.css";
import reactLogo from "./assets/React-icon.png";

class App extends Component {
  render() {
    return (
      <main className={styles.container}>
        <h1 className={styles.container__title}>Hello React World!</h1>
        <img className={styles.container__image} alt="react logo" src={reactLogo} />
      </main>
    );
  }
}
export default App;
