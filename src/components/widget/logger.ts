export const logger = {
  info(scope: string, ...args: Array<any>) {
    console.info(`[${scope}]`, ...args);
  },
  error(scope: string, ...args: Array<any>) {
    console.error(`[${scope}]`, ...args);
  },
};
