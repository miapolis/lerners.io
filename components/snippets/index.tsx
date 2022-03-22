import React from "react";
import { useTheme } from "../../pages/_app";
import { Die } from "../icons/die";

import { CppIntro } from "./cpp";
import { CSharpIntro } from "./csharp";
import { ElixirIntro } from "./elixir";
import { RustIntro } from "./rust";
import { TypeScriptIntro } from "./typescript";
import { GoIntro } from "./go";
import { JavaIntro } from "./java";
import { PythonIntro } from "./python";

export enum Language {
  PYTHON = "Python",
  JAVA = "Java",
  GO = "Go",
  TYPESCRIPT = "TypeScript",
  ELIXIR = "Elixir",
  CPP = "C++",
  CSHARP = "C#",
  RUST = "Rust",
}

export const darkTheme = {
  keyword: "CD3F45",
  variable: "55B5DB",
  number: "9FCA56",
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
  const { dark } = useTheme();

  return (
    <div
      className={`inline-block whitespace-nowrap line`}
      style={{ lineHeight: 1 }}
    >
      {tokens.map((t, i) => {
        return (
          <div
            key={i}
            className="whitespace-pre inline-block text-xs sm:text-sm md:text-base"
            style={{
              color: `#${
                dark
                  ? darkTheme[t.type as keyof typeof darkTheme]
                  : lightTheme[t.type as keyof typeof lightTheme]
              }`,
              // lineHeight: 0,
              fontFamily: "Hack",
            }}
          >
            {t.link ? <div className="inline-block">{'"'}</div> : null}
            <a
              href={t.link ?? undefined}
              className={`${t.link ? "hover:underline cursor-pointer" : ""}`}
            >{`${i == 0 ? " ".repeat(indentation) : ""}${t.content}`}</a>
            {t.link ? <div className="inline-block">{'"'}</div> : null}
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
  alternateColors: boolean;
  onRandomClick?: () => void;
}

const dieColor = {
  light: ["rgb(148 163 184)", "rgb(0 0 0)"],
  dark: ["rgb(148 163 184)", "rgb(255 255 255)"],
};

export const Snippet: React.FC<SnippetProps> = ({
  code,
  language,
  alternateColors,
  onRandomClick,
}) => {
  const { theme, dark } = useTheme();

  const [dieHovered, setDieHovered] = React.useState(false);

  return (
    <div
      className={`transition-all relative ${
        dark
          ? alternateColors
            ? "bg-slate-900"
            : "bg-black"
          : alternateColors
          ? "bg-gray-100"
          : "bg-white"
      } rounded-lg shadow-lg p-4`}
    >
      <div className="relative w-full h-4 flex flex-row gap-[8px] mb-8">
        <div className="h-full w-4 rounded-[50%] bg-[#ff5f56]" />
        <div className="h-full w-4 rounded-[50%] bg-[#ffbd2e]" />
        <div className="h-full w-4 rounded-[50%] bg-[#27c93f]" />
        <div className="absolute right-0 font-bold flex flex-row items-center gap-3 text-black dark:text-white">
          {language}
          <div
            className="hover:rotate-90 hover:scale-150 transition-all duration-200 cursor-pointer"
            onMouseEnter={() => setDieHovered(true)}
            onMouseLeave={() => setDieHovered(false)}
            onClick={onRandomClick}
          >
            <Die
              size={18}
              color={
                dieColor[theme as keyof typeof dieColor][dieHovered ? 1 : 0]
              }
            />
          </div>
        </div>
      </div>
      <div className="h-auto overflow-x-auto flex flex-col">{code}</div>
    </div>
  );
};

export interface IntroSnippetProps {
  language: Language;
  alternateColors?: boolean;
  onRandomClick?: () => void;
}

export const IntroSnippet: React.FC<IntroSnippetProps> = ({
  language,
  alternateColors = false,
  onRandomClick,
}) => {
  const [component, setComponent] = React.useState<React.ReactNode>(undefined);

  React.useEffect(() => {
    switch (language) {
      case Language.PYTHON:
        setComponent(<PythonIntro />);
        break;
      case Language.JAVA:
        setComponent(<JavaIntro />);
        break;
      case Language.GO:
        setComponent(<GoIntro />);
        break;
      case Language.TYPESCRIPT:
        setComponent(<TypeScriptIntro />);
        break;
      case Language.ELIXIR:
        setComponent(<ElixirIntro />);
        break;
      case Language.RUST:
        setComponent(<RustIntro />);
        break;
      case Language.CPP:
        setComponent(<CppIntro />);
        break;
      case Language.CSHARP:
        setComponent(<CSharpIntro />);
        break;
    }
  }, [language]);

  return (
    <Snippet
      code={component}
      language={language}
      alternateColors={alternateColors}
      onRandomClick={onRandomClick}
    />
  );
};
