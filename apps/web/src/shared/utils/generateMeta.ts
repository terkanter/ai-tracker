import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { getServerSideURL } from "./getURL";
import { mergeOpenGraph } from "./mergeOpenGraph";

const getImageURL = (image?: string | null) => {
  const serverUrl = getServerSideURL();

  let url = serverUrl + "/og.webp";

  url = image ? serverUrl + image : serverUrl + "/og.webp";

  return url;
};

type Doc = {
  meta: {
    title: string;
    description: string;
    keywords: string[];
    image: string;
  };
  slug: string;
};

export const generateMeta = async (doc: Doc): Promise<Metadata> => {
  const t = await getTranslations();

  const ogImage = getImageURL(doc?.meta?.image);

  const title = doc?.meta?.title ? doc?.meta?.title : t("meta.title");

  return {
    description: doc?.meta?.description,
    keywords: doc?.meta?.keywords?.map((keyword) => keyword),
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || "",
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join("/") : "/",
    }),
    title,
  };
};
