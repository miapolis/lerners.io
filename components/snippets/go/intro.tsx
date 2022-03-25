import React from "react";
import {
  BlankLine,
  comma,
  def,
  variable,
  key,
  Line,
  prop,
  string,
  text,
} from "..";
import { Comment, LinkKeyValue } from ".";
import { useDiscordUsername } from "../../../hooks/use-discord-username";

const Intro: React.FC = () => {
  const username = useDiscordUsername();

  return (
    <>
      <Line
        tokens={[key("type "), def("Person "), key("struct "), text("{")]}
      />
      <Comment content=" ..." indentation={4} />
      <Line tokens={[text("}")]} />
      <BlankLine />
      <Line tokens={[key("func "), prop("main"), text("() {")]} />
      <Line
        tokens={[text("ethan"), key(" := "), def("Person"), text("{")]}
        indentation={4}
      />
      <Line
        tokens={[text("name:    "), string('"Ethan Lerner"'), comma]}
        indentation={8}
      />
      <Line
        tokens={[
          text("aliases: []"),
          variable("string"),
          text("{"),
          string('"miapolis"'),
          text("},"),
        ]}
        indentation={8}
      />
      <Line
        tokens={[
          text("socials: "),
          key("map"),
          text("["),
          variable("string"),
          text("]"),
          variable("string"),
          text("{"),
        ]}
        indentation={8}
      />
      <LinkKeyValue
        name="Email"
        value="ethan@lerners.io"
        link="mailto:ethan@lerners.io"
        spacing={3}
      />
      <LinkKeyValue
        name="GitHub"
        value="github.com/miapolis"
        link="https://github.com/miapolis"
        spacing={2}
      />
      <Comment content="Send me a friend request!" indentation={12} />
      <LinkKeyValue name="Discord" value={`"${username}"`} spacing={1} />
      <LinkKeyValue
        name="Spotify"
        value="lerners.io/spotify"
        link="https://l.lerners.io/spotify"
        spacing={1}
      />
      <LinkKeyValue
        name="Steam"
        value="lerners.io/steam"
        link="https://l.lerners.io/steam"
        spacing={3}
      />
      <Line tokens={[text("},")]} indentation={8} />
      <Line tokens={[text("}")]} indentation={4} />
      <Line tokens={[text("}")]} />
    </>
  );
};

export default Intro;
