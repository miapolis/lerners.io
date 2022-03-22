import React from "react";

interface State {
  index: number;
  set: any[];
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

export function useRandomEnum<T>(obj: any) {
  const [state, dispatch] = React.useReducer(reducer, {
    index: 0,
    set: enumSet<T>(obj),
  } as State);

  const next = () => {
    dispatch({ type: "next" });
  };

  return [state.set[state.index], next];
}

function enumSet<T>(obj: T) {
  return Object.keys(obj)
    .map((key) => obj[key as keyof typeof obj])
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
