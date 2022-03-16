import React from "react";
import { Parallax, useParallax } from "react-scroll-parallax";
import {
  animated,
  config,
  useChain,
  useSpringRef,
  useTransition,
} from "react-spring";
import { Snippet } from "../../components/snippets";
import { ElixirIntro } from "../../components/snippets/elixir";
import { RustIntro } from "../../components/snippets/rust";
import { ThemeContext } from "../../pages/_app";

const Second: React.FC = () => {
  const theme = React.useContext(ThemeContext);

  const [showSnippet, setShowSnippet] = React.useState(false);
  const [showDesc, setShowDesc] = React.useState(false);

  const transition = useTransition(showSnippet, {
    from: { opacity: 0, x: -200 },
    enter: { opacity: 1, x: 0 },
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
        if (!showSnippet && p > 0.2) {
          setShowSnippet(true);
          setTimeout(() => {
            setShowDesc(true);
          }, 500);
        }
      }}
      className={`overflow-hidden relative w-full h-screen ${
        theme.value == "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="relative w-full pt-12 flex justify-center">
        <div className="flex flex-row w-auto">
          {transition((styles, item) => (
            <animated.div
              style={{ visibility: item ? "visible" : "hidden", ...styles }}
            >
              <Snippet code={<RustIntro />} language="Rust" />
            </animated.div>
          ))}
          <div className="ml-6 w-auto h-auto max-w-md">
            {titleTransition((styles, item) => (
              <animated.div
                style={{ visibility: item ? "visible" : "hidden", ...styles }}
              >
                <h1 className="text-2xl mb-4 font-bold text-black dark:text-white">
                  Socials
                </h1>
              </animated.div>
            ))}
            {bodyTransition((styles, item) => (
              <animated.div
                style={{ visibility: item ? "visible" : "hidden", ...styles }}
              >
                <div className="text-gray-800 dark:text-gray-50">
                  Hi! I'm Ethan, and over the last few years I've been working
                  on some stuff and doing some things. If you'd like, feel free
                  to check those things out!
                </div>
              </animated.div>
            ))}
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Second;
