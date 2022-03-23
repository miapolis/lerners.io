import { comma, CommentProps, Line, LinkKeyValueProps, prop, string, TokenType } from "..";
import ElixirIntro from "./intro";

export { ElixirIntro };

export const Comment: React.FC<CommentProps> = ({ content, indentation = 0 }) => {
  return (
    <Line
      tokens={[{ content: `# ${content}`, type: "comment" }]}
      indentation={indentation}
    />
  );
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
        prop(`${name}: `),
        string(value, link),
        ...(!last ? [comma] : []),
      ]}
      indentation={14}
    />
  );
};
