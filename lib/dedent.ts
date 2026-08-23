// Source - https://stackoverflow.com/a/63346501
// Posted by Tomas Langkaas, modified by community. See post 'Timeline' for change history
// Retrieved 2026-08-23, License - CC BY-SA 4.0

export function dontIndent(str: string){
  return ('' + str).replace(/  +/g, '');
}
