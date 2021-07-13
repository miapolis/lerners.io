import React from "react";
import styles from "./profile-area.module.css";

import OrbitIcon from "./orbit-icon";

const ProfileArea: React.FC = () => {
  const [init, setInit] = React.useState(false);
  const [profileScale, setProfileScale] = React.useState<number | undefined>();

  React.useEffect(() => {
    calcProfileScale();
    window.addEventListener("resize", () => {
      calcProfileScale();
    });

    setTimeout(() => {
      setInit(true);
    }, 100);
  }, []);

  const calcProfileScale = () => {
    const width = window.innerWidth;
    setProfileScale(Math.min(1, width / 600));
  };

  return (
    <div className={styles.centralContainer}>
      <div
        className={styles.centralGroup}
        style={{ transform: `scale(${profileScale})` }}
      >
        <img
          className={styles.profileCenter}
          src="https://avatars.githubusercontent.com/u/41233357?s=200"
          width="200"
          height="200"
          alt="Profile Picture"
        />
        <OrbitIcon
          src="/images/github.svg"
          alt="github"
          url="https://github.com/miapolis"
          angle={150}
          accent="#6e5494"
          fadeInTime="0.3"
          initialized={init}
        />
        <OrbitIcon
          src="/images/discord.svg"
          alt="discord"
          url="https://discord.com/users/508420859476836364"
          angle={120}
          accent="#5865F2"
          fadeInTime="0.4"
          initialized={init}
        />
        <OrbitIcon
          src="/images/spotify.svg"
          alt="spotify"
          url="https://open.spotify.com/user/jy417zjjgr7hbklbwy8jh0js0"
          angle={90}
          accent="#1DB954"
          fadeInTime="0.5"
          initialized={init}
        />
        <OrbitIcon
          src="/images/xbox.svg"
          alt="xbox"
          url="http://live.xbox.com/en-US/Profile?gamertag=Miapolis"
          angle={60}
          accent="#107C10"
          fadeInTime="0.6"
          initialized={init}
        />
        <OrbitIcon
          src="/images/steam.svg"
          alt="steam"
          url="https://steamcommunity.com/profiles/76561199072450059"
          angle={30}
          accent="#2a475e"
          fadeInTime="0.7"
          initialized={init}
        />
      </div>
    </div>
  );
};

export default ProfileArea;
