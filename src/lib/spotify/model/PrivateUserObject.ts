import { ExplicitContentSettingsObject } from "./ExplicitContentSettingsObject";
import { ExternalUrlObject } from "./ExternalUrlObject";
import { FollowersObject } from "./FollowersObject";
import { ImageObject } from "./ImageObject";

export type PrivateUserObject = {
  explicit_content?: ExplicitContentSettingsObject,
  external_urls?: ExternalUrlObject,
  followers?: FollowersObject,
};