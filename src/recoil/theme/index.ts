import type { ThemeState as ts } from "./atom";
import { useColors as uc } from "./useTheme";
export { default as themeState } from "./atom";
export { default as useTheme } from "./useTheme";

export { uc as useColors };
export type { ts as ThemeState };
