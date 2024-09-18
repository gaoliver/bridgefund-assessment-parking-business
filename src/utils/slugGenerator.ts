export const slugGenerator = (prefix: string) => {
  return prefix.toLowerCase().replace(/ /g, "-");
};