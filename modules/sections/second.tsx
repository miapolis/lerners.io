import React from "react";
import { Parallax } from "react-scroll-parallax";
import {
  animated,
  config,
  useChain,
  useSpringRef,
  useTransition,
} from "react-spring";
import { IntroSnippet, Language } from "../../components/snippets";
import { ThemeContext } from "../../pages/_app";

const Second: React.FC = () => {
  const theme = React.useContext(ThemeContext);

  const [revealed, setRevealed] = React.useState(false);
  const [snippet, setSnippet] = React.useState<Language | undefined>();
  const [showDesc, setShowDesc] = React.useState(false);

  const changeSnippet = () => {
    const prev = snippet;

    setSnippet(undefined);
    setTimeout(() => {
      setSnippet(prev == "Elixir" ? "Rust" : "Elixir");
    }, 200);
  };

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
        if (!revealed && p > 0.2) {
          setSnippet("Elixir");

          setTimeout(() => {
            setRevealed(true);
            setShowDesc(true);
          }, 500);
        }
      }}
      className={`overflow-hidden relative w-full h-screen ${
        theme.value == "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="relative w-full pt-12">
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
                  Hi! I'm Ethan
                </h1>
              </animated.div>
            ))}
            {bodyTransition((styles, item) => (
              <animated.div
                style={{ visibility: item ? "visible" : "hidden", ...styles }}
              >
                <div className="text-gray-800 dark:text-gray-50">
                  Over the last few years I've been working on some stuff and
                  doing some things. If you'd like, feel free to check those
                  things out!
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
