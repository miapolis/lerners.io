import { att, comma, Line, string, text, Token } from "..";

const Setup = () => (
  <>
    <Line tokens={[att("projects"), text(":")]} />
  </>
);
const End = () => <></>;

const Project = ({ name, desc, url, languages, last = false }: any) => {
  return (
    <>
      <Line tokens={[text("- "), att(name), text(":")]} indentation={2} />
      <Line
        tokens={[att("description"), text(": "), string(desc)]}
        indentation={6}
      />
      <Line
        tokens={[att("url"), text(": "), string(url[0], url[1], false)]}
        indentation={6}
      />
      <Line
        tokens={[
          att("languages"),
          text(": ["),
          ...mapLanguages(languages),
          text("]"),
        ]}
        indentation={6}
      />
    </>
  );
};

const mapLanguages = (languages: string[]): Token[] => {
  const arr = languages.map((x, i) => [
    string(x),
    i < languages.length - 1 ? text(", ") : text(""),
  ]);
  return ([] as Token[]).concat(...arr);
};

export { Setup as YamlSetup, End as YamlEnd, Project as YamlProject };
