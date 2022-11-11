import React from "react";
import slugify from "slugify";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableTextReactComponents, toPlainText } from "@portabletext/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { IconArrowRight, IconLink } from "@tabler/icons";
import { sanityClient } from "~/config/sanity";
import { Sidenote } from "./sidenote";

import { coy, nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CodeWrapper } from "./code-wrapper";
import { useTheme } from "~/hooks/use-theme";
import { Theme } from "./theme-provider";

const slugFn = (v: any) => slugify(toPlainText(v)).toLowerCase();

interface LinkableProps {
  children: React.ReactNode;
  value: any;
  type: "h2" | "h3";
}

const Linkable: React.FC<LinkableProps> = ({ children, value, type }) => {
  const [anchorTarget, setAnchorTarget] =
    React.useState<HTMLAnchorElement | null>(null);

  const slug = slugFn(value);
  React.useEffect(() => {
    setAnchorTarget(document.getElementById(slug) as HTMLAnchorElement);
  }, []);

  const anchorClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    anchorTarget!.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState({}, "", `#${slug}`);
  };

  const Anchor = type;

  return (
    <Anchor
      id={slug}
      className={`anchor-group group ${
        type == "h2" ? "-ml-[38px]" : "-ml-8"
      } flex items-center`}
    >
      <a
        href={`#${slug}`}
        onClick={anchorClick}
        className="transition-all opacity-0 xl:group-hover:opacity-100 mr-2"
        aria-label={`Scroll to ${slug}`}
      >
        <IconLink size={type == "h2" ? 28 : 24} />
      </a>
      {children}
    </Anchor>
  );
};

export const portableTextMap: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }: { value: SanityImageSource }) => {
      const builder = imageUrlBuilder(sanityClient);
      return (
        <div className="mt-8 mb-12">
          <img
            src={builder.image(value).auto("format").fit("max").url()}
            className="mx-auto rounded-lg"
          />
        </div>
      );
    },
    codeBlock: ({ value }) => {
      const [theme] = useTheme();
      const [landed, setLanded] = React.useState(false);

      React.useEffect(() => {
        setLanded(true);
      }, []);

      if (!landed) {
        return (
          <CodeWrapper language={value.language} code={value.code}>
            <pre className="code-highlight">
              <code>{value.code}</code>
            </pre>
          </CodeWrapper>
        );
      }

      return (
        <CodeWrapper language={value.language} code={value.code}>
          <div className="code-highlight">
            <SyntaxHighlighter
              language={value.language}
              style={theme == Theme.DARK ? nightOwl : coy}
            >
              {value.code}
            </SyntaxHighlighter>
          </div>
        </CodeWrapper>
      );
    },
    sidenote: ({ value }) => {
      return <Sidenote {...value} />;
    },
  },
  block: {
    h2: ({ children, value }) => (
      <Linkable children={children} value={value} type="h2" />
    ),
    h3: ({ children, value }) => (
      <Linkable children={children} value={value} type="h3" />
    ),
  },
  listItem: {
    bullet: ({ children }) => {
      return (
        <li className="flex items-start">
          <span className="mr-3 mt-[2px]">
            <IconArrowRight className="stroke-indigo-500" />
          </span>
          <div className="flex-1">{children}</div>
        </li>
      );
    },
  },
};
