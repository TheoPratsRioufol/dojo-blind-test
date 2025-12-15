import { SimplifiedArtistObject } from "./SimplifiedArtistObject";
import { ExternalUrlObject } from "./ExternalUrlObject";
import { LinkedTrackObject } from "./LinkedTrackObject";
import { TrackRestrictionObject } from "./TrackRestrictionObject";

export type SimplifiedTrackObject = {
  external_urls?: ExternalUrlObject,
  linked_from?: LinkedTrackObject,
  restrictions?: TrackRestrictionObject,
};