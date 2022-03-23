import React from "react";
import { dot, LinkKeyValue, Comment } from ".";
import { BlankLine, comma, def, key, Line, prop, semi, string, text } from "..";

const Intro: React.FC = () => {
  return (
    <>
      <Line
        tokens={[
          key("using "),
          def("System"),
          dot,
          def("Collections"),
          dot,
          def("Generic"),
          semi,
        ]}
      />
      <BlankLine />
      <Line tokens={[key("struct "), def("Person")]} />
      <Line tokens={[text("{")]} />
      <Line
        tokens={[key("public "), def("Person"), text("()")]}
        indentation={4}
      />
      <Line tokens={[text("{")]} indentation={4} />
      <Line
        tokens={[
          key("this."),
          prop("name"),
          key(" = "),
          string('"Ethan Lerner"'),
          semi,
        ]}
        indentation={8}
      />
      <Line
        tokens={[
          key("this."),
          prop("aliases"),
          key(" = new string"),
          text("[] {"),
          string(' "miapolis" '),
          text("}"),
          semi,
        ]}
        indentation={8}
      />
      <Line
        tokens={[
          key("this."),
          prop("socials"),
          key(" = new "),
          def("Dictionary"),
          text("<"),
          key("string"),
          comma,
          key(" string"),
          text(">"),
          text("()"),
        ]}
        indentation={8}
      />
      <Line tokens={[text("{")]} indentation={8} />
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
      <Line tokens={[text("};")]} indentation={8} />
      <Line tokens={[text("}")]} indentation={4} />
      <Line tokens={[text("}")]} indentation={0} />
    </>
  );
};

export default Intro;
