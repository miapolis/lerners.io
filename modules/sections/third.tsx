import React from "react";
import { Parallax, useParallax } from "react-scroll-parallax";
import {
  animated,
  config,
  useChain,
  useSpringRef,
  useTransition,
} from "react-spring";
import { IntroSnippet, Language } from "../../components/snippets";
import { useRandomLanguage } from "../../hooks/use-random-language";
import { ThemeContext } from "../../pages/_app";
import One from "./shapes/one";
import Three from "./shapes/three";
import Two from "./shapes/two";
import styles from "./third.module.css";

const Third: React.FC = () => {
  const theme = React.useContext(ThemeContext);

  const [randomLanguage, nextLanguage] = useRandomLanguage();
  const centralParallax = useParallax<HTMLDivElement>({
    rotate: [0, 360],
    translateY: ["15px", "15px"],
    translateX: ["-50%", "-50%"],
  });
  const rightParallax = useParallax<HTMLDivElement>({
    rotate: [0, -900],
    translateY: ["100px", "40px"],
    translateX: ["500px", "0px"],
    easing: "easeOut",
    speed: 10,
    opacity: [0, 1],
  });
  const leftParallax = useParallax<HTMLDivElement>({
    rotate: [0, -200],
    translateY: ["0px", "35px"],
    translateX: ["-500px", "0px"],
    easing: "easeOut",
    speed: 10,
    opacity: [0, 1],
  });

  const [initial, setInitial] = React.useState(false);
  const [revealed, setRevealed] = React.useState(false);
  const [snippet, setSnippet] = React.useState<Language | undefined>();
  const [showDesc, setShowDesc] = React.useState(false);

  const changeSnippet = () => {
    setSnippet(undefined);
    nextLanguage();

    setTimeout(() => {
      setSnippet(randomLanguage);
    }, 200);
  };

  React.useEffect(() => {
    if (!initial) return;

    setSnippet(randomLanguage);
    nextLanguage();

    setTimeout(() => {
      setRevealed(true);
      setShowDesc(true);
    }, 500);
  }, [initial]);

  const transition = useTransition(snippet, {
    from: !revealed
      ? { opacity: 0, x: -200, y: 0 }
      : { opacity: 0, x: 0, y: -40 },
    enter: { opacity: 1, x: 0, y: 0 },
    leave: { opacity: 0, x: 0, y: 40 },
    config: config.slow,
  });

  const titleRef = useSpringRef();
  const titleTransition = useTransition(showDesc, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    ref: titleRef,
  });
  const bodyRef = useSpringRef();
  const bodyTransition = useTransition(showDesc, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    ref: bodyRef,
  });

  useChain([titleRef, bodyRef], [0, 0.3]);

  return (
    <Parallax
      onProgressChange={(p) => {
        if (!initial && p > 0.2) {
          setInitial(true);
        }
      }}
      className="relative w-full h-[850px] md:h-[950px] lg:h-[750px] bg-white dark:bg-black"
    >
      <div className={styles.divider}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            style={{ fill: theme.value == "dark" ? "#0f172a" : "#f3f4f6" }}
          ></path>
        </svg>
      </div>
      <div ref={centralParallax.ref} className="absolute left-[50%]">
        <One
          size={80}
          color={theme.value == "dark" ? "ffffff" : "000000"}
          opacity={"f"}
        />
      </div>
      <div
        ref={rightParallax.ref}
        className="absolute"
        style={{ left: "calc(50% + 80px)" }}
      >
        <Two
          size={30}
          color={theme.value == "dark" ? "ffffff" : "000000"}
          opacity={"e"}
        />
      </div>
      <div
        ref={leftParallax.ref}
        className="absolute"
        style={{ left: "calc(50% - 100px)" }}
      >
        <Three
          size={24}
          color={theme.value == "dark" ? "ffffff" : "000000"}
          opacity={"e"}
        />
      </div>
      <div className="relative w-full pt-40">
        <div className="flex flex-col-reverse lg:flex-row w-auto">
          <div className="h-full w-full lg:w-1/2 flex justify-center lg:justify-end">
            {transition(
              (styles, item) =>
                item && (
                  <animated.div
                    style={styles}
                    className="absolute w-screen sm:w-auto"
                  >
                    <IntroSnippet
                      language={item}
                      alternateColors={true}
                      onRandomClick={changeSnippet}
                    />
                  </animated.div>
                )
            )}
          </div>
          <div className="flex flex-col mx-6 lg:mx-0 lg:ml-6 mb-8 w-auto h-auto max-w-md self-center lg:self-start">
            {titleTransition((styles, item) => (
              <animated.div
                style={{ visibility: item ? "visible" : "hidden", ...styles }}
              >
                <h1 className="text-2xl mb-4 font-bold text-black dark:text-white">
                  Projects
                </h1>
              </animated.div>
            ))}
            {bodyTransition((styles, item) => (
              <animated.div
                style={{ visibility: item ? "visible" : "hidden", ...styles }}
              >
                <div className="text-gray-800 dark:text-gray-50 mb-4">
                  My main project right now is <b>Port7</b>, a dedicated
                  platform for web-based games, written in Elixir. I'm also
                  working on{"  "}
                  <a
                    className="hover:text-blue-400 font-bold"
                    href="https://crates.io/crates/brix"
                  >
                    Brix
                  </a>
                  , a CLI tool for scaffolding and code generation. Almost
                  everything I work on is open-source.
                </div>
              </animated.div>
            ))}
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Third;
