import React from "react";
import { LinkKeyValue, Comment } from ".";
import { BlankLine, comma, def, key, Line, num, semi, string, text } from "..";

const Intro: React.FC = () => {
  return (
    <>
      <Line tokens={[key("#include "), string("<string>")]} />
      <Line tokens={[key("#include "), string("<map>")]} />
      <BlankLine />
      <Line tokens={[key("using namespace "), def("std"), semi]} />
      <BlankLine />
      <Line tokens={[key("struct "), def("Person")]} />
      <Line tokens={[text("{")]} />
      <Line
        tokens={[
          def("string "),
          text("name"),
          key(" = "),
          string('"Ethan Lerner"'),
          semi,
        ]}
        indentation={4}
      />
      <Line
        tokens={[
          def("string "),
          text("aliases["),
          num("1"),
          text("]"),
          key(" = "),
          text("{"),
          string('"miapolis"'),
          text("};"),
        ]}
        indentation={4}
      />
      <Line
        tokens={[
          def("map"),
          key("<"),
          def("string"),
          comma,
          def(" string"),
          key("> "),
          text("socials"),
          key(" = "),
          text("{"),
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
      <Comment content="Send me a friend request!" indentation={12} />
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
        last={true}
      />
      <Line tokens={[text("};")]} />
    </>
  );
};

export default Intro;
