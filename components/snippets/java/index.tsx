import {
  comment,
  CommentProps,
  Line,
  LinkKeyValueProps,
  string,
  text,
  Token,
} from "..";

import JavaIntro from "./intro";
export { JavaIntro };

export const dot = { content: ".", type: "text" } as Token;

export const Comment: React.FC<CommentProps> = ({
  content,
  indentation = 0,
}) => {
  return <Line tokens={[comment(`// ${content}`)]} indentation={indentation} />;
};

export const LinkKeyValue: React.FC<LinkKeyValueProps> = ({
  name,
  value,
  link,
  last,
}) => {
  return (
    <Line
      tokens={[
        string(`"${name}"`),
        text(", "),
        string(
          value,
          link,
          `${name.toLowerCase()}-link`,
          true,
          name.toLowerCase() == "email"
        ),
        text(!last ? "," : ");"),
      ]}
      indentation={12}
    />
  );
};
