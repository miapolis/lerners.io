import React from "react";
import styles from "./projects.module.css";

import Project from "./project";

const Projects: React.FC = () => {
  React.useEffect(() => {
    calcScale();
    window.addEventListener("resize", () => {
      calcScale();
    });
  }, []);

  const calcScale = () => {
    const width = window.innerWidth;
    setScale(Math.min(1, width / 600));
  };

  const [scale, setScale] = React.useState<number | undefined>();

  return (
    <section className={styles.projects}>
      <h3>— Projects —</h3>
      <div className={styles.projectContainer}>
        <Project
          name="QSpy"
          description="A social deduction web-app game based on Spyfall"
          src="/images/projects/qspy.png"
          alt="QSpy"
          githubPath="miapolis/qspy"
          websiteUrl="https://qspy.xyz"
          websiteName="qspy.xyz"
          scale={scale}
        />
        <Project
          name="Stratepig"
          description="A two-player turn-based game inspired by Stratego"
          src="/images/projects/stratepig.png"
          alt="Stratepig"
          githubPath="miapolis/stratepig-server"
          websiteUrl="https://stratepig.com"
          websiteName="stratepig.com"
          scale={scale}
        />
        <Project
          name="Brix"
          description="A CLI tool written in Rust for scaffolding and code generation"
          src="/images/projects/brix.png"
          alt="Brix"
          githubPath="miapolis/brix"
          scale={scale}
        />
        <Project
          name="OasisBot"
          description="A general-purpose Discord bot packed with features"
          src="/images/projects/oasisbot.png"
          alt="OasisBot"
          githubPath="oasisbot/oasisbot"
          websiteUrl="https://docs.oasisbot.xyz"
          websiteName="docs.oasisbot.xyz"
          scale={scale}
        />
        <Project
          name="Desk"
          description="A very basic attempt at a Discord clone"
          src="/images/projects/desk.png"
          alt="Desk"
          githubPath="miapolis/desk"
          scale={scale}
        />
      </div>
    </section>
  );
};

export default Projects;
