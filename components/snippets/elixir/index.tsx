import { comma, CommentProps, Line, LinkKeyValueProps, prop, TokenType } from "..";
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
        { content: value, type: "string", link: link },
        ...(!last ? [comma] : []),
      ]}
      indentation={14}
    />
  );
};
