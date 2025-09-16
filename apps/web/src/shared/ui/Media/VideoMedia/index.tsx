"use client";

import type { Props as MediaProps } from "../types";

import { cn } from "@workspace/ui/lib/utils";
import React, { useEffect, useRef } from "react";

import { getMediaUrl } from "@/shared/utils/getMediaUrl";

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName } = props;

  const videoRef = useRef<HTMLVideoElement>(null);
  // const [showFallback] = useState<boolean>()

  useEffect(() => {
    const { current: video } = videoRef;

    if (video) {
      video.addEventListener("suspend", () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      });
    }
  }, []);

  if (resource && typeof resource === "object") {
    const { src } = resource;

    return (
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className={cn(videoClassName)}
        controls={false}
        onClick={onClick}
      >
        <source src={getMediaUrl(src)} />
      </video>
    );
  }

  return null;
};
