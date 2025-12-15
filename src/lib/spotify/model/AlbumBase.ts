import { ExternalUrlObject } from "./ExternalUrlObject";
import { ImageObject } from "./ImageObject";
import { AlbumRestrictionObject } from "./AlbumRestrictionObject";

export type AlbumBase = {
  external_urls: ExternalUrlObject,
  restrictions?: AlbumRestrictionObject,
};