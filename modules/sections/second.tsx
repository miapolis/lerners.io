import React from "react";
import { useParallax } from "react-scroll-parallax";
import { Elixir } from "../../components/snippets/intro/elixir";
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
      <Elixir discordUsername={""} mode="dark" />
    </div>
  );
};

export default Second;
