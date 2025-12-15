import { AlbumBase } from "./AlbumBase";
import { SimplifiedArtistObject } from "./SimplifiedArtistObject";
import { PagingSimplifiedTrackObject } from "./PagingSimplifiedTrackObject";
import { CopyrightObject } from "./CopyrightObject";
import { ExternalIdObject } from "./ExternalIdObject";

export type AlbumObject = AlbumBase & {
  tracks?: PagingSimplifiedTrackObject,
  external_ids?: ExternalIdObject,
};