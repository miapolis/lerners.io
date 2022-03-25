import {
  comment,
  CommentProps,
  Line,
  LinkKeyValueProps,
  string,
  text,
  Token,
} from "..";
import CSharpIntro from "./intro";

export { CSharpIntro };

export const dot = { content: ".", type: "keyword" } as Token;

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
  last = false,
}) => {
  return (
    <Line
      tokens={[
        text("{ "),
        string(`"${name}"`),
        text(", "),
        string(
          value,
          link,
          `${name.toLowerCase()}-link`,
          true,
          name.toLowerCase() == "email"
        ),
        text(` }${!last ? "," : ""}`),
      ]}
      indentation={12}
    />
  );
};
