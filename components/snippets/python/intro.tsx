import React from "react";
import { colon, Comment, LinkKeyValue } from ".";
import { BlankLine, comma, def, key, Line, prop, string, text } from "..";

const Intro: React.FC = () => {
  return (
    <>
      <Line
        tokens={[
          key("from "),
          def("dataclasses "),
          key("import "),
          prop("dataclass"),
          comma,
          prop(" field"),
        ]}
      />
      <Line
        tokens={[
          key("from "),
          def("typing "),
          key("import "),
          text("List, Dict "),
        ]}
      />
      <BlankLine />
      <Line tokens={[prop("@dataclass")]} />
      <Line tokens={[key("class "), def("Person"), colon]} />
      <Line
        tokens={[
          text("name: "),
          def("str"),
          key(" = "),
          string('"Ethan Lerner"'),
        ]}
        indentation={4}
      />
      <Line
        tokens={[
          text("aliases: List["),
          def("str"),
          text("]"),
          key(" = "),
          prop("field"),
          text("("),
          def("default_factory"),
          key("=lambda"),
          text(": ["),
          string('"miapolis"'),
          text("])")
        ]}
        indentation={4}
      />
      <Line
        tokens={[
          text("socials: Dict["),
          def("str"),
          text(", "),
          def("str"),
          text("]"),
          key(" = "),
          prop("field"),
          text("("),
          def("default_factory"),
          key("=lambda"),
          text(": {"),
        ]}
        indentation={4}
      />
      <LinkKeyValue
        name="Email"
        value="ethan@lerners.io"
        link="mailto:ethan@lerners.io"
      />
      <LinkKeyValue
        name="GitHub"
        value="github.com/miapolis"
        link="https://github.com/miapolis"
      />
      <Comment content="Send me a friend request!" indentation={8} />
      <LinkKeyValue name="Discord" value='"miapolis#????"' />
      <LinkKeyValue
        name="Spotify"
        value="lerners.io/spotify"
        link="https://l.lerners.io/spotify"
      />
      <LinkKeyValue
        name="Steam"
        value="lerners.io/steam"
        link="https://l.lerners.io/steam"
      />
      <Line tokens={[text("})")]} indentation={4} />
    </>
  );
};

export default Intro;
