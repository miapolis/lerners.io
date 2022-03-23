import React from "react";
import { LinkKeyValue, Comment } from ".";
import { comma, def, key, Line, string, text } from "..";

const Intro: React.FC = () => {
  return (
    <>
      <Line tokens={[key("const "), def("person"), key(" = "), text("{")]} />
      <Line
        tokens={[text("name: "), string('"Ethan Lerner"'), comma]}
        indentation={2}
      />
      <Line
        tokens={[text("aliases: ["), string('"miapolis"'), text("],")]}
        indentation={2}
      />
      <Line
        tokens={[
          text("socials: "),
          key("new "),
          def("Map"),
          text("<"),
          def("string"),
          text(", "),
          def("string"),
          text(">(["),
        ]}
        indentation={2}
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
      <Comment content="Send me a friend request!" indentation={4} />
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
      <Line tokens={[text("]);")]} indentation={2} />
      <Line tokens={[text("};")]} />
    </>
  );
};

export default Intro;
