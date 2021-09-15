import React from "react";
import styles from "./home-header.module.css";

import Typewriter from "typewriter-effect";

const HomeHeader: React.FC = () => {
  return (
    <section className={styles.headerSection}>
      <h1>Ethan Lerner</h1>
      <div>
        <h3>AKA</h3>
        <span className={styles.aka}>Miapolis</span>
      </div>
      <p>
        <Typewriter
          options={{
            loop: true,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString("I am a developer")
              .pauseFor(1000)
              .deleteChars(9)
              .typeString("student")
              .pauseFor(1000)
              .deleteChars(7)
              .typeString("Discord enthusiast")
              .pauseFor(1000)
              .deleteChars(19)
              .typeString("n occasional gamer")
              .pauseFor(1000)
              .start();
          }}
        />
      </p>
    </section>
  );
};

export default HomeHeader;
