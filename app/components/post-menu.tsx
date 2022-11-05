import { IconCircleCheck, IconShare } from "@tabler/icons";
import React from "react";
import slugify from "slugify";
import { SanityPost } from "~/interfaces/post";

export interface PostMenuProps {
  post: SanityPost;
}

interface Link {
  name: string;
  slug: string;
  indent: boolean;
}

let anchorMap = new Map<string, number>();

export const PostMenu: React.FC<PostMenuProps> = ({ post }) => {
  const [links, setLinks] = React.useState<Link[]>([]);
  const [activeLink, setActiveLink] = React.useState<string>("");

  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    setLinks(
      ((post.body as any[]) || [])
        .filter(
          (x) => x._type == "block" && (x.style == "h2" || x.style == "h3")
        )
        .map((x) => ({
          name: x.children[0].text,
          slug: slugify(x.children[0].text).toLowerCase(),
          indent: x.style == "h3",
        }))
    );
  }, [post]);

  React.useEffect(() => {
    if (!links.length) return;

    getAllAnchors();

    const observer = new MutationObserver(getAllAnchors);
    observer.observe(document.getElementById("root")!, {
      childList: true,
      subtree: true,
    });
    window.addEventListener("scroll", handleScroll);
  }, [links]);

  const getAllAnchors = () => {
    const current = window.scrollY;
    const map = new Map<string, number>();
    for (const link of links) {
      map.set(
        link.slug,
        (
          document.getElementById(link.slug) as HTMLAnchorElement
        ).getBoundingClientRect().top +
          current -
          100
      );
    }
    anchorMap = map;

    handleScroll();
  };

  const handleScroll = () => {
    const currentPos = window.scrollY;
    let currentLink = null;

    for (const [anchor, pos] of anchorMap.entries()) {
      currentLink = pos <= currentPos ? anchor : currentLink;
      if (currentLink !== anchor) break;
    }
    if (currentLink != activeLink) setActiveLink(currentLink || "");
  };

  return (
    <div className="sticky top-32 w-64">
      <button className="mb-6 font-bold flex gap-2" onClick={() => {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}>
        {copied ? <IconCircleCheck /> : <IconShare />}
        {copied ? "Link Copied" : "Share"}
      </button>
      <div className="text-zinc-400 dark:text-zinc-600 uppercase font-semibold mb-4">
        In this post
      </div>
      {links.map((x) => (
        <div
          className="cursor-pointer group flex -translate-x-[18px] mb-2"
          onClick={() => {
            const el = document.getElementById(x.slug);
            if (el)
              el.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });

            history.pushState({}, "", `#${x.slug}`);
          }}
        >
          <div
            className={`w-[2px] ${
              x.slug == activeLink ? "bg-indigo-700 dark:bg-yellow-400" : ""
            } mr-4`}
          />
          <div
            className={`whitespace-nowrap overflow-hidden overflow-ellipsis group-hover:text-indigo-700 dark:group-hover:text-yellow-400 ${
              x.indent ? "ml-4" : ""
            } ${
              x.slug == activeLink ? "text-indigo-700 dark:text-yellow-400" : ""
            }`}
          >
            {x.name}
          </div>
        </div>
      ))}
    </div>
  );
};
