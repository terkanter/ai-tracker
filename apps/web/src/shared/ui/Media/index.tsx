import type { Props } from "./types";

import React, { Fragment } from "react";

import { ImageMedia } from "./ImageMedia";
import { VideoMedia } from "./VideoMedia";

function getIsVideo(resource: Props["resource"]) {
  if (typeof resource === "object") {
    return resource?.src?.includes(".mp4");
  }

  if (typeof resource === "string") {
    return resource?.includes(".mp4");
  }

  return false;
}

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = "div", resource } = props;

  const isVideo = getIsVideo(resource);
  const Tag = htmlElement || Fragment;

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </Tag>
  );
};
