import React from "react";
import { colon, doubleColon, LinkKeyValue, Comment } from ".";
import { BlankLine, comma, def, key, Line, prop, semi, string, text } from "..";

const Intro: React.FC = () => {
  return (
    <>
      <Line
        tokens={[
          key("use "),
          def("std"),
          doubleColon,
          def("collections"),
          doubleColon,
          def("HashMap"),
          semi,
        ]}
      />
      <BlankLine />
      <Line tokens={[key("impl "), def("Person "), text("{")]} />
      <Line
        tokens={[
          key("fn "),
          prop("new"),
          text("() "),
          key("-> "),
          def("Self "),
          text("{"),
        ]}
        indentation={4}
      />
      <Line tokens={[def("Self "), text("{")]} indentation={8} />
      <Line
        tokens={[text("name"), colon, string(' "Ethan Lerner"'), comma]}
        indentation={12}
      />
      <Line
        tokens={[
          text("aliases"),
          colon,
          prop(" vec!"),
          text("["),
          string('"miapolis"'),
          text("]"),
          comma,
        ]}
        indentation={12}
      />
      <Line
        tokens={[
          text("socials"),
          colon,
          def(" HashMap"),
          doubleColon,
          prop("from"),
          text("(["),
        ]}
        indentation={12}
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
      <Comment content="Send me a friend request!" indentation={16} />
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
      <Line tokens={[text("]),")]} indentation={12} />
      <Line tokens={[text("}")]} indentation={8} />
      <Line tokens={[text("}")]} indentation={4} />
      <Line tokens={[text("}")]} />
    </>
  );
};

export default Intro;
