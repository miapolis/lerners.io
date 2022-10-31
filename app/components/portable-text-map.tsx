import React from "react";
import slugify from "slugify";
import { Theme, useTheme } from "remix-themes";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableTextReactComponents, toPlainText } from "@portabletext/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { IconArrowRight, IconLink } from "@tabler/icons";
import { sanityClient } from "~/config/sanity";
import { Sidenote } from "./sidenote";

import { coy, nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CodeWrapper } from "./code-wrapper";

const slugFn = (v: any) => slugify(toPlainText(v)).toLowerCase();

const LinkableH2 = ({ children, value }: any) => {
  const slug = slugFn(value);
  return (
    <h2 id={slug} className="group -ml-[38px] flex items-center">
      <a
        href={`#${slug}`}
        className="transition-all opacity-0 xl:group-hover:opacity-100 mr-2"
      >
        <IconLink size={28} />
      </a>
      {children}
    </h2>
  );
};

const LinkableH3 = ({ children, value }: any) => {
  const slug = slugFn(value);
  return (
    <h3 id={slug} className="group -ml-8 flex items-center">
      <a
        href={`#${slug}`}
        className="transition-all opacity-0 xl:group-hover:opacity-100 mr-2"
      >
        <IconLink />
      </a>
      {children}
    </h3>
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
    h2: LinkableH2,
    h3: LinkableH3,
  },
  listItem: {
    bullet: ({ children }) => {
      return (
        <li>
          <IconArrowRight className="inline-block stroke-indigo-500 mr-3 align-middle" />
          {children}
        </li>
      );
    },
  },
};
