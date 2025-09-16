"use client";

import type { StaticImageData } from "next/image";
import type { Props as MediaProps } from "../types";

import { cn } from "@workspace/ui/lib/utils";
import NextImage from "next/image";
import React from "react";

import { getMediaUrl } from "@/shared/utils/getMediaUrl";

// const { breakpoints } = cssVariables;

// A base64 encoded image to use as a placeholder while the image is loading
const placeholderBlur = undefined;

export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    imgClassName,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
  } = props;

  let width: number | undefined;
  let height: number | undefined;
  let alt = altFromProps;
  let src: StaticImageData | string = srcFromProps || "";

  if (!src && resource && typeof resource === "object") {
    const { height: fullHeight, src: url, width: fullWidth } = resource;

    width = fullWidth!;
    height = fullHeight!;
    alt = altFromProps || "";

    const cacheTag = null;

    src = getMediaUrl(url, cacheTag);
  }

  const loading = loadingFromProps || (!priority ? "lazy" : undefined);

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  // const sizes = sizeFromProps
  //   ? sizeFromProps
  //   : Object.entries(breakpoints)
  //       .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
  //       .join(", ");

  return (
    <NextImage
      alt={alt || ""}
      className={cn(imgClassName)}
      fill={fill}
      height={!fill ? height : undefined}
      // placeholder="blur"
      // blurDataURL={placeholderBlur}
      loading={loading}
      priority={priority}
      quality={100}
      sizes={sizeFromProps}
      src={src}
      width={!fill ? width : undefined}
    />
  );
};
