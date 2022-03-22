import React from "react";
import { Parallax } from "react-scroll-parallax";
import {
  animated,
  config,
  useChain,
  useSpringRef,
  useTransition,
} from "react-spring";
import { Presence } from "../../components/presence";
import { IntroSnippet, Language } from "../../components/snippets";
import { useRandomLanguage } from "../../hooks/use-random-language";

export interface SecondProps {
  setIsPastTop: (boolean: boolean) => void;
}

const Second: React.FC<SecondProps> = ({ setIsPastTop }) => {
  const [randomLanguage, nextLanguage] = useRandomLanguage();

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
  const presenceRef = useSpringRef();
  const presenceTransition = useTransition(showDesc, {
    from: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    ref: presenceRef,
  });

  useChain([titleRef, bodyRef, presenceRef], [0, 0.3, 0.7]);

  React.useEffect(() => {
    if (!initial) return;

    setSnippet(randomLanguage);
    nextLanguage();

    setTimeout(() => {
      setRevealed(true);
      setShowDesc(true);
    }, 500);
  }, [initial]);

  return (
    <Parallax
      onProgressChange={(p) => {
        if (!initial && p > 0.2) {
          setInitial(true);
        }
      }}
      className="overflow-hidden relative w-full h-[850px] md:h-[950px] lg:h-[650px] bg-gray-100 dark:bg-slate-900"
    >
      <Parallax
        className="w-full"
        onProgressChange={(p) => {
          setIsPastTop(p >= 1);
        }}
      />
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
                <div className="text-gray-800 dark:text-gray-50 mb-4">
                  I'm a student and programmer with an interest in servers and
                  backend architecture, web development, and game engines.
                </div>
              </animated.div>
            ))}
            {presenceTransition((styles, item) => (
              <animated.div
                style={{ visibility: item ? "visible" : "hidden", ...styles }}
              >
                <Presence />
              </animated.div>
            ))}
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Second;
