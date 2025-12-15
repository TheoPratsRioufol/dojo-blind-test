import { ExternalUrlObject } from "./ExternalUrlObject";
import { FollowersObject } from "./FollowersObject";
import { ImageObject } from "./ImageObject";
import { PlaylistOwnerObject } from "./PlaylistOwnerObject";
import { PagingPlaylistTrackObject } from "./PagingPlaylistTrackObject";

export type PlaylistObject = {
  external_urls?: ExternalUrlObject,
  followers?: FollowersObject,
  owner?: PlaylistOwnerObject,
  tracks?: PagingPlaylistTrackObject,
};