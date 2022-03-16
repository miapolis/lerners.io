import React from "react";
import { Parallax, useParallax } from "react-scroll-parallax";
import { animated, config, useTransition } from "react-spring";
import { Snippet } from "../../components/snippets";
import { ElixirIntro } from "../../components/snippets/elixir";
import { RustIntro } from "../../components/snippets/rust";
import { ThemeContext } from "../../pages/_app";

const Second: React.FC = () => {
  const theme = React.useContext(ThemeContext);

  const [showSnippet, setShowSnippet] = React.useState(false);

  const transition = useTransition(showSnippet, {
    from: { opacity: 0, x: -200 },
    enter: { opacity: 1, x: 0 },
    config: config.slow,
  });

  return (
    <Parallax
      onProgressChange={(p) => {
        if (!showSnippet && p > 0.2) {
          setShowSnippet(true);
        }
      }}
      className={`overflow-hidden relative w-full h-screen ${
        theme.value == "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="relative w-full pt-12 flex justify-center">
        {transition(
          (styles, item) =>
            item && (
              <animated.div style={styles} className="absolute">
                <Snippet code={<ElixirIntro />} language="Elixir" />
              </animated.div>
            )
        )}
      </div>
    </Parallax>
  );
};

export default Second;
