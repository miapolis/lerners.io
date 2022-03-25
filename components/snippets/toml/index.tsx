import { att, text, Line, prop, string, Token, BlankLine } from "..";

const Setup = () => <></>;
const End = () => <></>;

const Project = ({ name, desc, url, languages, last = false }: any) => {
  return (
    <>
      <Line
        tokens={[text("["), att("projects"), text("."), att(name), text("]")]}
      />
      <Line tokens={[prop("description"), text(" = "), string(`"${desc}"`)]} />
      <Line
        tokens={[
          prop("url"),
          text(" = "),
          string(url[0], url[1], `project-url-${name.toLowerCase()}`),
        ]}
      />
      <Line
        tokens={[
          prop("languages"),
          text(" = ["),
          ...mapLanguages(languages),
          text("]"),
        ]}
      />
      {!last ? <BlankLine /> : ""}
    </>
  );
};

const mapLanguages = (languages: string[]): Token[] => {
  const arr = languages.map((x, i) => [
    string(`"${x}"`),
    i < languages.length - 1 ? text(", ") : text(""),
  ]);
  return ([] as Token[]).concat(...arr);
};

export { Setup as TomlSetup, End as TomlEnd, Project as TomlProject };
