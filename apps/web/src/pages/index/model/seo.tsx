import { generateMeta } from "@/shared/utils/generateMeta";

export const generateMetadata = () => {
  return generateMeta({
    meta: {
      title: "Home",
      description: "Home page",
      keywords: [],
      image: "",
    },
    slug: "/",
  });
};
