import { comment, CommentProps, Line, LinkKeyValueProps, string, text } from "..";

import GoIntro from "./intro";
export { GoIntro };

export const Comment: React.FC<CommentProps> = ({
  content,
  indentation = 0,
}) => {
  return <Line tokens={[comment(`// ${content}`)]} indentation={indentation} />;
};

export const LinkKeyValue: React.FC<LinkKeyValueProps & { spacing: number }> = ({
  name,
  value,
  link,
  spacing,
}) => {
  return (
    <Line
      tokens={[
        string(`"${name}"`),
        text(`:${" ".repeat(spacing)}`),
        string(value, link),
        text(","),
      ]}
      indentation={12}
    />
  );
};
