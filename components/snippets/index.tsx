import React from "react";
import { ThemeContext } from "../../pages/_app";

export const darkTheme = {
  keyword: "CD3F45",
  variable: "55B5DB",
  number: "E6CD69",
  definition: "E6CD69",
  property: "A074C4",
  string: "55B5DB",
  comment: "41535B",
  operator: "9FCA56",
  text: "CFD2D1",
};

export const lightTheme = {
  keyword: "A626A4",
  variable: "E06C75",
  number: "986801",
  definition: "4078F2",
  property: "4078F2",
  string: "50A14F",
  comment: "A0A1A7",
  operator: "0184BC",
  text: "383A42",
};

export type TokenType =
  | "keyword"
  | "variable"
  | "number"
  | "definition"
  | "property"
  | "string"
  | "comment"
  | "operator"
  | "text";

export interface Token {
  type: TokenType;
  content: string;
  link?: string;
}

export const key = (v: string): Token => ({ type: "keyword", content: v });
export const variable = (v: string): Token => ({
  type: "variable",
  content: v,
});
export const num = (v: string): Token => ({ type: "number", content: v });
export const def = (v: string): Token => ({
  type: "definition",
  content: v,
});
export const prop = (v: string): Token => ({ type: "property", content: v });
export const string = (v: string): Token => ({ type: "string", content: v });
export const comment = (v: string): Token => ({ type: "comment", content: v });
export const operator = (v: string): Token => ({
  type: "operator",
  content: v,
});
export const text = (v: string): Token => ({ type: "text", content: v });

// Common tokens
export const semi: Token = { type: "text", content: ";" };
export const comma: Token = { type: "text", content: "," };

// Common interfaces

export interface CommentProps {
  content: string;
  indentation?: number;
}

export interface LinkKeyValueProps {
  name: string;
  value: string;
  link?: string;
  last?: boolean;
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

export const BlankLine: React.FC = () => {
  return <Line tokens={[{ content: " ", type: "text" }]} />;
};

export interface SnippetProps {
  code: React.ReactNode;
  language: string;
}

export const Snippet: React.FC<SnippetProps> = ({ code, language }) => {
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
          {language}
        </div>
      </div>
      <div className="h-auto w-min">{code}</div>
    </div>
  );
};
