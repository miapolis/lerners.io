import {
  comma,
  comment,
  CommentProps,
  Line,
  LinkKeyValueProps,
  string,
  text,
  Token,
} from "..";
import RustIntro from "./intro";

export { RustIntro };

export const colon = { content: ":", type: "keyword" } as Token;
export const doubleColon = { content: "::", type: "keyword" } as Token;

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
        text("("),
        string(`"${name}"`),
        text(", "),
        { content: value, type: "string", link: link },
        text("),"),
      ]}
      indentation={16}
    />
  );
};
