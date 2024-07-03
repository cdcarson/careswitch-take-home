export const uniqueId = (): string => {
  return 'ui-' + Math.random().toString(36).slice(2);
};
