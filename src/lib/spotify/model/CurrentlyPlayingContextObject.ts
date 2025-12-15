import { DeviceObject } from "./DeviceObject";
import { ContextObject } from "./ContextObject";
import { TrackObject } from "./TrackObject";
import { EpisodeObject } from "./EpisodeObject";
import { DisallowsObject } from "./DisallowsObject";

export type CurrentlyPlayingContextObject = {
  device?: DeviceObject,
  context?: ContextObject,
  actions?: DisallowsObject,
};