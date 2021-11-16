import React from "react";
import styles from "./project.module.css";

import SyncLoader from "react-spinners/SyncLoader";

import { fetchStars } from "@miapolis/api/github/fetch-stars";
import { useQuery } from "react-query";

export interface ProjectProps {
  name: string;
  description: string;
  src: string;
  alt: string;
  githubPath: string;
  websiteUrl?: string | undefined;
  websiteName?: string | undefined;
}

const Project: React.FC<ProjectProps> = ({
  name,
  description,
  src,
  alt,
  githubPath,
  websiteUrl,
  websiteName,
}) => {
  const [hovered, setHovered] = React.useState(false);

  const { isLoading, data } = useQuery(`get-project-${name}`, () =>
    fetchStars(githubPath)
  );

  return (
    <div
      className={styles.project}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        className={styles.coverImg}
        src={src}
        alt={alt}
        style={hovered ? { transform: "scale(110%)" } : {}}
        onClick={() => {
          const url = websiteUrl || `https://github.com/${githubPath}`;
          window.open(url, "_blank", "noopener,noreferrer");
        }}
      />
      <div className={styles.headerPanel} />
      <div className={styles.header}>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div className={styles.footer}>
        <img
          className={styles.starImg}
          src="/images/misc/star.svg"
          alt="star image"
        />
        <p className={styles.starCount}>{data ? data.stargazers_count : 0}</p>
        <a
          target="_blank"
          className={styles.projectLink}
          href={`https://github.com/${githubPath}`}
        >
          github
        </a>
        {websiteUrl && websiteName ? (
          <>
            <p>|</p>
            <a target="_blank" className={styles.projectLink} href={websiteUrl}>
              {websiteName}
            </a>
          </>
        ) : undefined}
      </div>
      <div
        className={styles.loaderCover}
        style={{ opacity: isLoading ? 1 : 0, transition: "opacity 0.5s ease" }}
      >
        {isLoading ? (
          <div className={styles.loader}>
            <SyncLoader color={"#141414ff"} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Project;
