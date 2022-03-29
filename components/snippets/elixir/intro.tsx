import React from "react";
import { Comment, LinkKeyValue } from ".";
import { comma, def, key, Line, prop, string, text } from "..";
import { useDiscordUsername } from "../../../hooks/use-discord-username";

const Intro: React.FC = () => {
  const username = useDiscordUsername();

  return (
    <>
      <Line tokens={[key("defmodule "), def("Person "), key("do")]} />
      <Line
        tokens={[
          key("defstruct "),
          prop("name: "),
          string('"Ethan Lerner"'),
          comma,
        ]}
        indentation={2}
      />
      <Line
        tokens={[
          prop("aliases: "),
          text("["),
          string('"miapolis"'),
          text("]"),
          comma,
        ]}
        indentation={12}
      />
      <Line tokens={[prop("socials: "), text("%{")]} indentation={12} />
      <LinkKeyValue
        name="email"
        value="ethan@lerners.io"
        link="mailto:ethan@lerners.io"
      />
      <LinkKeyValue
        name="github"
        value="github.com/miapolis"
        link="https://github.com/miapolis"
      />
      <Comment content="Send me a friend request!" indentation={14} />
      <LinkKeyValue name="discord" value={`"${username}"`} />
      <LinkKeyValue
        name="spotify"
        value="lerners.io/spotify"
        link="https://l.lerners.io/spotify"
      />
      <LinkKeyValue
        name="steam"
        value="lerners.io/steam"
        link="https://l.lerners.io/steam"
        last={true}
      />
      <Line tokens={[text("}")]} indentation={12} />
      <Line tokens={[key("end")]} />
    </>
  );
};

export default Intro;
