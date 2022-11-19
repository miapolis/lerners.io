import { PortableText } from "@portabletext/react";
import {
  IconAlertCircle,
  IconCircleCheck,
  IconCircleX,
  IconInfoCircle,
} from "@tabler/icons";
import { Sidenote as SidenoteType, SidenoteTone } from "~/interfaces/sidenote";
import { portableTextMap } from "./portable-text-map";

export const Sidenote: React.FC<SidenoteType> = ({ tone, title, content }) => {
  const [bgColor, borderColor] = colorValues(tone);

  return (
    <div
      className={`sidenote xl:-ml-[calc(32px+3px)] xl:w-[calc(100%+70px)] ${bgColor} bg-opacity-10 px-8 pt-6 pb-2 mt-12 mb-16 rounded-lg border-0 border-l-[3px] ${borderColor} relative shadow-lg`}
    >
      <h4 className="text-lg font-bold mb-4">{title}</h4>
      <PortableText value={content} components={portableTextMap} />
      <div className="p-2 bg-zinc-50 dark:bg-zinc-900 absolute rounded-full -top-6 -left-[26px] hidden sm:block">
        {toneComp(tone)}
      </div>
    </div>
  );
};

const colorValues = (tone: SidenoteTone) => {
  switch (tone) {
    case "info":
      return ["bg-indigo-400", "border-l-indigo-500"];
    case "warning":
      return ["bg-amber-400", "border-l-amber-500"];
    case "correct":
      return ["bg-green-400", "border-l-green-500"];
    case "incorrect":
      return ["bg-red-400", "border-l-red-500"];
  }
};

export const toneComp = (tone: SidenoteTone) => {
  switch (tone) {
    case "info":
      return <IconInfoCircle className="stroke-indigo-500" size={32} />;
    case "warning":
      return <IconAlertCircle className="stroke-amber-500" size={32} />;
    case "correct":
      return <IconCircleCheck className="stroke-green-500" size={32} />;
    case "incorrect":
      return <IconCircleX className="stroke-red-500" size={32} />;
  }
};
