import React from "react";
import { Link } from "@remix-run/react";
import { Theme } from "./theme-provider";
import { useTheme } from "~/hooks/use-theme";
import { Themed } from "./themed";
import { LogoIcon } from "~/icons/logo";
import { IconMoon, IconSun } from "@tabler/icons";

export const Navbar: React.FC = () => {
  const [_, setTheme] = useTheme();

  return (
    <header className="flex items-center justify-between py-4 flex-initial gap-4 relative z-[100]">
      <Link to="/" className="h-8 w-8">
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
      <div className="flex gap-6">
        <MainLink href="/about" name="About" umamiId="about" />
        <MainLink href="/blog" name="Blog" umamiId="blog" />
        <MainLink href="mailto:ethan@lerners.io" name="Email" umamiId="email" />
      </div>
      <button
        className="w-6 h-6"
        onClick={() => {
          setTheme((prev) => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK));
        }}
      >
        <Themed
          dark={
            <IconMoon className="transition-all hover:stroke-yellow-400 hover:-rotate-[30deg]" />
          }
          light={
            <IconSun className="transition-all hover:stroke-indigo-700 hover:-rotate-[30deg]" />
          }
        />
      </button>
    </header>
  );
};

const MainLink: React.FC<{ href: string; name: string; umamiId: string }> = ({
  href,
  name,
  umamiId,
}) => {
  const Comp = href.startsWith("/") ? Link : "a";

  return (
    <Comp
      to={href}
      href={href}
      className={`umami--click--navbar-${umamiId} transition-all text-base font-semibold hover:text-indigo-700 dark:hover:text-yellow-400`}
    >
      {name}
    </Comp>
  );
};
