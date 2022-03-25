import React from "react";
import { Comment, dot, LinkKeyValue } from ".";
import { BlankLine, def, key, Line, prop, semi, string, text } from "..";
import { useDiscordUsername } from "../../../hooks/use-discord-username";

const Intro: React.FC = () => {
  const username = useDiscordUsername();

  return (
    <>
      <Line
        tokens={[
          key("import "),
          def("java"),
          dot,
          def("util"),
          dot,
          def("Map"),
          semi,
        ]}
      />
      <BlankLine />
      <Line tokens={[key("class "), def("Person "), text("{")]} />
      <Line
        tokens={[
          def("String "),
          text("name"),
          key(" = "),
          string('"Ethan Lerner"'),
          semi,
        ]}
        indentation={4}
      />
      <Line
        tokens={[
          def("String[] "),
          text("aliases"),
          key(" = "),
          text("{ "),
          string('"miapolis" '),
          text("};"),
        ]}
        indentation={4}
      />
      <BlankLine />
      <Line
        tokens={[
          def("Map<String, String> "),
          text("socials"),
          def(" = "),
          def("Map"),
          dot,
          prop("of"),
          text("("),
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
      <LinkKeyValue name="Discord" value={`"${username}"`} />
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
      <Line tokens={[text("}")]} />
    </>
  );
};

export default Intro;
