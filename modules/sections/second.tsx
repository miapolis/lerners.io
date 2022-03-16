import React from "react";
import { useParallax } from "react-scroll-parallax";
import { Snippet } from "../../components/snippets";
import { ElixirIntro } from "../../components/snippets/elixir";
import { RustIntro } from "../../components/snippets/rust";
import { ThemeContext } from "../../pages/_app";

const Second: React.FC = () => {
  const parallax = useParallax<HTMLDivElement>({});
  const theme = React.useContext(ThemeContext);

  return (
    <div
      ref={parallax.ref}
      className={`w-full h-screen ${
        theme.value == "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <Snippet code={<ElixirIntro />} language="Elixir" />
      <div className="h-6" />
      <Snippet code={<RustIntro />} language="Rust" />
    </div>
  );
};

export default Second;
