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

import { YamlEnd, YamlProject, YamlSetup } from "./yaml";
import { TomlEnd, TomlProject, TomlSetup } from "./toml";
import { JsonEnd, JsonProject, JsonSetup } from "./json";

export enum Config {
  YAML = "YAML",
  TOML = "TOML",
  JSON = "JSON",
}

export const darkTheme = {
  keyword: "CD3F45",
  variable: "55B5DB",
  number: "9FCA56",
  definition: "E6CD69",
  attribute: "9FCA56",
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
  attribute: "D19A66",
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
  | "attribute"
  | "property"
  | "string"
  | "comment"
  | "operator"
  | "text";

export interface Token {
  type: TokenType;
  content: string;
  link?: {
    value: string;
    umamiId: string;
    quotes: boolean;
    isEmail: boolean;
  };
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
export const att = (v: string): Token => ({ type: "attribute", content: v });
export const prop = (v: string): Token => ({ type: "property", content: v });
export const string = (
  v: string,
  link: string | undefined = undefined,
  umamiId: string | undefined = "unknown-link",
  linkQuotes: boolean | undefined = true,
  isEmail: boolean | undefined = false
): Token => ({
  type: "string",
  content: v,
  link: link
    ? { value: link, umamiId: umamiId, quotes: linkQuotes, isEmail: isEmail }
    : undefined,
});
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
              fontFamily: "Hack",
            }}
          >
            {t.link?.quotes ? <div className="inline-block">{'"'}</div> : null}
            {/* eslint-disable react/jsx-no-target-blank */}
            <a
              href={t.link?.value ?? undefined}
              target={t.link && !t.link.isEmail ? "_blank" : undefined}
              rel={t.link && !t.link.isEmail ? "noreferrer" : undefined}
              translate="no"
              className={
                t.link
                  ? `hover:underline cursor-pointer umami--click--${t.link.umamiId}`
                  : ""
              }
            >{`${i == 0 ? " ".repeat(indentation) : ""}${t.content}`}</a>
            {t.link?.quotes ? <div className="inline-block">{'"'}</div> : null}
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
  forSnippet: string;
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
  forSnippet,
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
            className={`hover:rotate-90 hover:scale-150 transition-all duration-200 cursor-pointer umami--click--${forSnippet}-die`}
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
      forSnippet="intro"
      onRandomClick={onRandomClick}
    />
  );
};

export interface ConfigSnippetProps {
  config: Config;
  alternateColors?: boolean;
  onRandomClick?: () => void;
}

const projects = [
  {
    name: "Port7",
    desc: "An all-in-one platform for web-based games.",
    url: ["github.com/miapolis/port7", "https://github.com/miapolis/port7"],
    languages: ["Elixir", "TypeScript"],
  },
  {
    name: "Brix",
    desc: "A CLI tool for scaffolding and code generation.",
    url: ["crates.io/crates/brix", "https://crates.io/crates/brix"],
    languages: ["Rust"],
  },
  {
    name: "Stratepig",
    desc: "A multiplayer Stratego implementation.",
    url: [
      "github.com/miapolis/stratepig-server",
      "https://github.com/miapolis/stratepig-server",
    ],
    languages: ["Rust", "C#"],
  },
];

const configComponent = (config: Config) => {
  switch (config) {
    case Config.YAML:
      return [YamlSetup, YamlProject, YamlEnd];
    case Config.TOML:
      return [TomlSetup, TomlProject, TomlEnd];
    case Config.JSON:
      return [JsonSetup, JsonProject, JsonEnd];
  }
};

export const ConfigSnippet: React.FC<ConfigSnippetProps> = ({
  config,
  alternateColors = false,
  onRandomClick,
}) => {
  const [SetupComponent, ProjectComponent, EndComponent] =
    configComponent(config);

  return (
    <Snippet
      code={
        <>
          <SetupComponent />
          {projects.map((p, i) => (
            <ProjectComponent
              key={p.name}
              name={p.name}
              desc={p.desc}
              url={p.url}
              languages={p.languages}
              last={i == projects.length - 1}
            />
          ))}
          <EndComponent />
        </>
      }
      alternateColors={alternateColors}
      language={config}
      forSnippet="projects"
      onRandomClick={onRandomClick}
    />
  );
};
