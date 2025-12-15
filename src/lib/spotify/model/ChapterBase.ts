import { ExternalUrlObject } from "./ExternalUrlObject";
import { ImageObject } from "./ImageObject";
import { ResumePointObject } from "./ResumePointObject";
import { ChapterRestrictionObject } from "./ChapterRestrictionObject";

export type ChapterBase = {
  external_urls: ExternalUrlObject,
  resume_point: ResumePointObject,
  restrictions?: ChapterRestrictionObject,
};