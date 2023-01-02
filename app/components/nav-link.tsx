import { Link } from "@remix-run/react";
import { IconArrowRight } from "@tabler/icons";

export interface NavLinkProps {
  to: string;
  className?: string;
  text: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ to, className, text }) => {
  return (
    <Link
      to={to}
      className={`w-max mt-10 text-sm flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-indigo-700 dark:hover:text-yellow-400 ${className}`}
    >
      {text}
      <IconArrowRight size={18} />
    </Link>
  );
};
