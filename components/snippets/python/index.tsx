import {
  comment,
  CommentProps,
  Line,
  LinkKeyValueProps,
  string,
  text,
  Token,
} from "..";

import PythonIntro from "./intro";
export { PythonIntro };

export const colon = { content: ":", type: "text" } as Token;

export const Comment: React.FC<CommentProps> = ({
  content,
  indentation = 0,
}) => {
  return <Line tokens={[comment(`# ${content}`)]} indentation={indentation} />;
};

export const LinkKeyValue: React.FC<LinkKeyValueProps> = ({
  name,
  value,
  link,
}) => {
  return (
    <Line
      tokens={[
        string(`"${name}"`),
        text(": "),
        string(value, link),
        text(","),
      ]}
      indentation={8}
    />
  );
};
