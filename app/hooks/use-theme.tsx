import React from "react";
import { Theme, ThemeContext, themes } from "~/components/theme-provider";

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const isTheme = (value: unknown): value is Theme =>
  typeof value === "string" && themes.includes(value as Theme);
