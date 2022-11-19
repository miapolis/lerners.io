import type { TypedObject } from "@portabletext/types";

export type SidenoteTone = "info" | "warning" | "correct" | "incorrect";

export interface Sidenote {
  tone: SidenoteTone;
  title: string;
  content: TypedObject | TypedObject[];
}
