import { ExternalUrlObject } from "./ExternalUrlObject";
import { FollowersObject } from "./FollowersObject";
import { ImageObject } from "./ImageObject";

export type ArtistObject = {
  external_urls?: ExternalUrlObject,
  followers?: FollowersObject,
};