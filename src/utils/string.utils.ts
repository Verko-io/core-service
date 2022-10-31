// TODO: Warning:(16, 26) Unnecessary non-capturing group '(?:^\w|[A-Z]|\b\w|\s+)'
export function toCamelCase(string: string): string {
  return string.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match: string, index: number): string {
    if (+match === 0) return '';
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}
