import { Link } from "@remix-run/react";
import { Themed } from "./themed";
import { LogoIcon } from "~/icons/logo";

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-[200] backdrop-blur-xl w-full border-t-2 border-t-zinc-200 dark:border-t-zinc-800 flex flex-col px-4">
      <div className="max-w-7xl py-8 mx-auto sm:px-6 xl:px-20 min-h-full w-full flex-1">
        <div className="flex flex-col gap-4 items-center sm:items-start sm:gap-0 sm:flex-row sm:justify-between">
          <Link to="/" className="flex gap-4 w-max h-max items-center">
            <Themed
              dark={
                <LogoIcon
                  width={24}
                  height={24}
                  bgColor="#ffffff"
                  fgColor="#000000"
                />
              }
              light={<LogoIcon width={24} height={24} />}
            />
            <h3 className="font-semibold m-0">Ethan Lerner</h3>
          </Link>
          <div className="flex w-max gap-8">
            <div className="flex flex-col gap-2">
              <div className="text-zinc-500">Links</div>
              <FooterLink href="/about" name="About" umamiId="about" />
              <FooterLink href="/blog" name="Blog" umamiId="blog" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-zinc-500">Contact</div>
              <FooterLink
                href="mailto:ethan@lerners.io"
                name="Email"
                umamiId="email"
              />
              <FooterLink
                href="https://github.com/miapolis"
                name="GitHub"
                umamiId="github"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ href: string; name: string; umamiId: string }> = ({
  href,
  name,
  umamiId,
}) => {
  const Comp = href.startsWith("/") ? Link : "a";

  return (
    <Comp
      to={href}
      href={href}
      className={`umami--click--footer-${umamiId} transition-all text-base hover:text-indigo-700 dark:hover:text-yellow-400`}
    >
      {name}
    </Comp>
  );
};
