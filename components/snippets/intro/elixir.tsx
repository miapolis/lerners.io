import React from "react";
import { ThemeContext } from "../../../pages/_app";

export interface Props {
  discordUsername: string;
  mode: "light" | "dark";
}

const darkTheme = {
  keyword: "E6CD69",
  variable: "55B5DB",
  number: "CD3F45",
  definition: "55B5DB",
  string: "55B5DB",
  comment: "41535B",
  operator: "9FCA56",
  text: "CFD2D1",
};

const lightTheme = {
  keyword: "A626A4",
  variable: "E06C75",
  number: "986801",
  definition: "4078F2",
  string: "50A14F",
  comment: "A0A1A7",
  operator: "0184BC",
  text: "383A42",
};

type TokenType =
  | "keyword"
  | "variable"
  | "number"
  | "definition"
  | "string"
  | "comment"
  | "operator"
  | "text";

export interface Token {
  type: TokenType;
  content: string;
  link?: string;
}

export interface LineProps {
  tokens: Token[];
  indentation?: number;
}

export const Line: React.FC<LineProps> = ({ tokens, indentation = 0 }) => {
  const theme = React.useContext(ThemeContext);

  return (
    <div className={`flex flex-row`}>
      {tokens.map((t, i) => {
        return (
          <div
            key={i}
            className="whitespace-pre flex flex-row"
            style={{
              color: `#${
                theme.value == "dark"
                  ? darkTheme[t.type as keyof typeof darkTheme]
                  : lightTheme[t.type as keyof typeof lightTheme]
              }`,
              fontFamily: "Hack",
            }}
          >
            {t.link ? <div>{'"'}</div> : null}
            <a
              href={t.link ?? undefined}
              className={`${t.link ? "hover:underline cursor-pointer" : ""}`}
            >{`${i == 0 ? " ".repeat(indentation) : ""}${t.content}`}</a>
            {t.link ? <div>{'"'}</div> : null}
          </div>
        );
      })}
    </div>
  );
};

interface CommentProps {
  content: string;
  indentation?: number;
}

const Comment: React.FC<CommentProps> = ({ content, indentation = 0 }) => {
  return (
    <Line
      tokens={[{ content: `# ${content}`, type: "comment" }]}
      indentation={indentation}
    />
  );
};

interface SocialLineProps {
  name: string;
  value: string;
  link?: string;
  last?: boolean;
}

const SocialLine: React.FC<SocialLineProps> = ({
  name,
  value,
  link,
  last = false,
}) => {
  return (
    <Line
      tokens={[
        { content: `${name}: `, type: "number" },
        { content: value, type: "string", link: link },
        ...(!last ? [{ content: ",", type: "text" as TokenType }] : []),
      ]}
      indentation={14}
    />
  );
};

export const Elixir: React.FC<Props> = () => {
  const theme = React.useContext(ThemeContext);

  return (
    <div
      className={`relative h-auto w-min ${
        theme.value == "dark" ? "bg-black" : "bg-white"
      } ml-10 rounded-lg shadow-lg p-4`}
    >
      <div className="relative w-full h-4 flex flex-row gap-[8px] mb-8">
        <div className="h-full w-4 rounded-[50%] bg-[#ff5f56]" />
        <div className="h-full w-4 rounded-[50%] bg-[#ffbd2e]" />
        <div className="h-full w-4 rounded-[50%] bg-[#27c93f]" />
        <div
          className={`absolute right-0 font-bold ${
            theme.value == "dark" ? "text-white" : "text-black"
          }`}
        >
          Elixir
        </div>
      </div>
      <div className="h-auto w-min">
        <Line
          tokens={[
            { content: "defmodule ", type: "keyword" },
            { content: "Person ", type: "definition" },
            { content: "do", type: "keyword" },
          ]}
        />
        <Line
          tokens={[
            { content: "defstruct ", type: "keyword" },
            { content: "name: ", type: "number" },
            { content: '"Ethan Lerner"', type: "string" },
            { content: ",", type: "text" },
          ]}
          indentation={2}
        />
        <Line
          tokens={[
            { content: "aliases: ", type: "number" },
            { content: "[", type: "text" },
            { content: '"miapolis"', type: "string" },
            { content: "],", type: "text" },
          ]}
          indentation={12}
        />
        <Line
          tokens={[
            { content: "socials: ", type: "number" },
            { content: "%{", type: "text" },
          ]}
          indentation={12}
        />
        <SocialLine
          name="email"
          value="ethan@lerners.io"
          link="mailto:ethan@lerners.io"
        />
        <SocialLine
          name="github"
          value="github.com/miapolis"
          link="https://github.com/miapolis"
        />
        <Comment content="Send me a friend request!" indentation={14} />
        <SocialLine name="discord" value='"miapolis#????"' />
        <SocialLine
          name="spotify"
          value="lerners.io/spotify"
          link="https://l.lerners.io/spotify"
        />
        <SocialLine
          name="steam"
          value="lerners.io/steam"
          link="https://l.lerners.io/steam"
          last={true}
        />
        <Line tokens={[{ content: "}", type: "text" }]} indentation={12} />
        <Line tokens={[{ content: "end", type: "keyword" }]} />
      </div>
    </div>
  );
};
