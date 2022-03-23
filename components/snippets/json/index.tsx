import { comma, Line, prop, string, text, Token } from "..";

const Setup = () => {
  return (
    <>
      <Line tokens={[text("{")]} />
      <Line tokens={[prop('"projects"'), text(": {")]} indentation={2} />
    </>
  );
};

const End = () => {
  return (
    <>
      <Line tokens={[text("}")]} indentation={2} />
      <Line tokens={[text("}")]} />
    </>
  );
};

const Project = ({ name, desc, url, languages, last = false }: any) => {
  return (
    <>
      <Line tokens={[prop(`"${name}"`), text(": {")]} indentation={4} />
      <Line
        tokens={[prop('"description"'), text(": "), string(`"${desc}"`), comma]}
        indentation={6}
      />
      <Line
        tokens={[prop('"url"'), text(": "), string(url[0], url[1]), comma]}
        indentation={6}
      />
      <Line
        tokens={[
          prop('"languages"'),
          text(": ["),
          ...mapLanguages(languages),
          text("]"),
        ]}
        indentation={6}
      />
      <Line tokens={[text(`}${!last ? "," : ""}`)]} indentation={4} />
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

export { Setup as JsonSetup, End as JsonEnd, Project as JsonProject };
