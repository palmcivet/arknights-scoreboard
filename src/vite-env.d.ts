/// <reference types="vite/client" />

declare module '@rules/default';

interface ImportMetaEnv {
  readonly VITE_DEFAULT_RULES_SLUG: string;
}
