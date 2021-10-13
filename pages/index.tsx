import React from "react";
import styles from "../styles/home.module.css";

import Head from "next/head";
import HomeHeader from "../modules/home/home-header";
import ProfileArea from "../modules/home/profile-area";
import Projects from "../modules/home/projects";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ethan Lerner</title>
        <meta
          name="description"
          content="Yet another personal website on the internet."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <HomeHeader />
        <ProfileArea />
        <Projects />
        <div style={{ height: "40px" }} />
      </main>
    </div>
  );
}
