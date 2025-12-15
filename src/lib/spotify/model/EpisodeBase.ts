import { ExternalUrlObject } from "./ExternalUrlObject";
import { ImageObject } from "./ImageObject";
import { ResumePointObject } from "./ResumePointObject";
import { EpisodeRestrictionObject } from "./EpisodeRestrictionObject";

export type EpisodeBase = {
  external_urls: ExternalUrlObject,
  resume_point: ResumePointObject,
  restrictions?: EpisodeRestrictionObject,
};