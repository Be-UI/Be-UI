export const hashRE = /#.*$/;
export const extRE = /(index)?\.(md|html)$/;
export const endingSlashRE = /\/$/;
export const outboundRE = /^[a-z]+:/i;
export function isActive(route, path) {
  if (path === undefined) {
    return false;
  }
  const routePath = normalize(`/${route.data.relativePath}`);
  const pagePath = normalize(path);
  return routePath === pagePath;
}
export function isActiveIntro(href:string,path:string) {
  return decodeURI(href.split('.html#')[1]) === path
}
export function normalize(path) {
  return decodeURI(path).replace(hashRE, '').replace(extRE, '');
}