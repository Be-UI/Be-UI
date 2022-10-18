import type { App, Component } from "vue";
import {SFCWithInstall} from "./types";

export const withInstall = <T>(comp: T) => {
   (comp as SFCWithInstall<T>).install = function (app: App) {
     app.component((comp as any).name, comp as Component);
   };
   return comp as SFCWithInstall<T>;
 };