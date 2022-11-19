import React from "react";
import { IconCheck, IconCopy } from "@tabler/icons";
import { formatLanguage } from "~/utils/languages";

export interface CodeWrapperProps {
  language: string;
  code: string;
}

export const CodeWrapper: React.FC<
  React.PropsWithChildren<CodeWrapperProps>
> = ({ language, code, children }) => {
  return (
    <div className="relative rounded-lg border-2 border-zinc-300 dark:border-zinc-700 mb-8 w-full">
      <div className="w-full border-b-2 border-b-zinc-300 dark:border-b-zinc-700 text-zinc-700 dark:text-zinc-300 flex">
        <div className="flex-1 pl-5 py-3">{formatLanguage(language)}</div>
        <CopyCodeButton code={code} />
      </div>
      <div className="py-2 px-5">{children}</div>
    </div>
  );
};

const CopyCodeButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <button
      onClick={copy}
      className="transition-all dark:hover:bg-opacity-20 hover:bg-opacity-20 hover:bg-zinc-300 dark:hover:bg-zinc-700 border-l-2 py-3 px-5 border-l-zinc-300 dark:border-l-zinc-700 flex gap-2 items-center"
    >
      {copied ? <IconCheck /> : <IconCopy />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
};
