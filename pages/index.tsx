declare var umami: any;

import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { Parallax } from "react-scroll-parallax";

import { IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import { useTheme } from "./_app";
import FirstSection from "../modules/sections/first";
import SecondSection from "../modules/sections/second";
import ThirdSection from "../modules/sections/third";
import FourthSection from "../modules/sections/fourth";

const Home: NextPage = () => {
  const { dark, theme, toggleTheme } = useTheme();
  const [navbarBlur, setNavbarBlur] = React.useState(false);

  const setIsPastTop = (v: boolean) => {
    setNavbarBlur(v);
  };

  React.useEffect(() => {
    setTimeout(() => {
      try {
        umami.trackEvent(theme, "theme-log");
      } catch {}
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, grey 1px, ${
          dark ? "black" : "white"
        } 0)`,
        backgroundSize: "40px 40px",
      }}
      className={`relative overflow-hidden ${theme}`}
    >
      <Parallax
        className={`fixed top-0 w-full z-20 h-16 flex items-center flex-row-reverse px-3 transition-all ${
          navbarBlur == true ? "shadow-md" : ""
        }`}
        style={
          navbarBlur
            ? {
                backdropFilter: "blur(3px)",
                background: dark
                  ? "rgb(0, 0, 0, 0.2)"
                  : "rgb(255, 255, 255, 0.5)",
              }
            : { backdropFilter: "none" }
        }
      >
        <div className="flex">
          <IconButton
            size="large"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {dark ? (
              <DarkModeOutlinedIcon style={{ color: "white" }} />
            ) : (
              <LightModeOutlinedIcon style={{ color: "black" }} />
            )}
          </IconButton>
        </div>
        {navbarBlur ? (
          <div className="flex flex-1 h-full flex-row items-center px-3 gap-4 text-black dark:text-white">
            <Link href="/">
              <a className="font-bold">Ethan Lerner</a>
            </Link>
            <div className="text-gray-500 dark:text-slate-300">|</div>
            <a
              target="_blank"
              rel="noreferrer"
              className="unmami--click--navbar-email-link"
              href="mailto:ethan@lerners.io"
            >
              Email
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              className="umami--click--navbar-github-link"
              href="https://github.com/miapolis"
            >
              GitHub
            </a>
          </div>
        ) : (
          ""
        )}
      </Parallax>
      <FirstSection />
      <SecondSection setIsPastTop={setIsPastTop} />
      <ThirdSection />
      <FourthSection />
    </div>
  );
};

export default Home;
