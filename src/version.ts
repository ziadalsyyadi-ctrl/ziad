declare const __APP_VERSION__: string | undefined;

export const APP_VERSION: string =
  typeof __APP_VERSION__ === 'string' && __APP_VERSION__.trim()
    ? __APP_VERSION__.trim()
    : '1.2.0';
