export const keyGenerator = (prefix: string) => {
  const prefixWithUnderscore = prefix.toLowerCase().replace(/ /g, "_");
  return `${prefixWithUnderscore}_${Math.random().toString(36).substr(2, 9)}`;
}