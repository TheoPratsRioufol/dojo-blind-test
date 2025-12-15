import { ExternalUrlObject } from "./ExternalUrlObject";
import { ImageObject } from "./ImageObject";
import { PlaylistOwnerObject } from "./PlaylistOwnerObject";
import { PlaylistTracksRefObject } from "./PlaylistTracksRefObject";

export type SimplifiedPlaylistObject = {
  external_urls?: ExternalUrlObject,
  owner?: PlaylistOwnerObject,
  tracks?: PlaylistTracksRefObject,
};