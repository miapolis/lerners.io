import React from "react";
import { Link } from "@remix-run/react";
import { Theme, useTheme } from "remix-themes";
import { Themed } from "./themed";
import { LogoIcon } from "~/icons/logo";
import { IconMoon, IconSun } from "@tabler/icons";

export const Navbar: React.FC = () => {
  const [_, setTheme] = useTheme();

  return (
    <header className="flex items-center justify-between py-4 flex-initial gap-4">
      <Link to="/" className="h-8">
        <Themed
          dark={
            <LogoIcon
              width={32}
              height={32}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          }
          light={<LogoIcon width={32} height={32} />}
        />
      </Link>
      <button
        onClick={() => {
          setTheme((prev) => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK));
        }}
      >
        <Themed dark={<IconMoon />} light={<IconSun />} />
      </button>
    </header>
  );
};
