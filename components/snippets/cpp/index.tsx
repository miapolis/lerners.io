import {
  comment,
  CommentProps,
  Line,
  LinkKeyValueProps,
  string,
  text,
} from "..";
import CppIntro from "./intro";

export { CppIntro };

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
        text("{"),
        string(`"${name}"`),
        text(", "),
        { content: value, type: "string", link: link },
        text(!last ? "}," : "}};"),
      ]}
      indentation={12}
    />
  );
};
