import { SimplifiedAlbumObject } from "./SimplifiedAlbumObject";
import { ArtistObject } from "./ArtistObject";
import { ExternalIdObject } from "./ExternalIdObject";
import { ExternalUrlObject } from "./ExternalUrlObject";
import { LinkedTrackObject } from "./LinkedTrackObject";
import { TrackRestrictionObject } from "./TrackRestrictionObject";

export type TrackObject = {
  album?: SimplifiedAlbumObject,
  external_ids?: ExternalIdObject,
  external_urls?: ExternalUrlObject,
  linked_from?: LinkedTrackObject,
  restrictions?: TrackRestrictionObject,
};