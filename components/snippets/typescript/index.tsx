import {
  comment,
  CommentProps,
  Line,
  LinkKeyValueProps,
  string,
  text,
} from "..";
import TypeScriptIntro from "./intro";
export { TypeScriptIntro };

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
}) => {
  return (
    <Line
      tokens={[
        text("["),
        string(`"${name}"`),
        text(", "),
        string(value, link),
        text("],"),
      ]}
      indentation={4}
    />
  );
};
