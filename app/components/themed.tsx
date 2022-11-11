import React from "react";
import { ClientOnly } from "remix-utils";
import { useTheme } from "~/hooks/use-theme";

export interface ThemedProps {
  dark: React.ReactNode | string;
  light: React.ReactNode | string;
  initialOnly?: boolean;
}

/**
 * Render a component based on the current theme without knowing SSR state.
 * https://github.com/kentcdodds/kentcdodds.com/blob/main/app/utils/theme-provider.tsx#L189
 */
export const Themed: React.FC<ThemedProps> = ({
  dark,
  light,
  initialOnly = false,
}) => {
  const [theme] = useTheme();
  const [initialTheme] = React.useState(theme);
  const themeToReference = initialOnly ? initialTheme : theme;

  return (
    <ClientOnly>
      {() => (themeToReference === "dark" ? dark : light)}
    </ClientOnly>
  );
};
