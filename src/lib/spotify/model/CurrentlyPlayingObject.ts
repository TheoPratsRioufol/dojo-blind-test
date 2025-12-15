import { ContextObject } from "./ContextObject";
import { TrackObject } from "./TrackObject";
import { EpisodeObject } from "./EpisodeObject";
import { DisallowsObject } from "./DisallowsObject";

export type CurrentlyPlayingObject = {
  context?: ContextObject,
  actions?: DisallowsObject,
};