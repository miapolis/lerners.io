import React from "react";
import { Language } from "../components/snippets";

interface State {
  index: number;
  set: Language[];
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "next":
      return {
        set: state.set,
        index: state.index + 1 == state.set.length ? 0 : state.index + 1,
      };
    default:
      throw new Error();
  }
};

export const useRandomLanguage = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    index: 0,
    set: languageSet(),
  } as State);

  const next = () => {
    dispatch({ type: "next" });
  };

  return [state.set[state.index], next];
};

const languageSet = (): Language[] => {
  return Object.keys(Language)
    .map((key) => Language[key as keyof typeof Language])
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};
