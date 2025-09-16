import createNextIntlPlugin from "next-intl/plugin";
import Sonda from "sonda/next";

const withSondaAnalyzer = Sonda();
const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
};

export default withNextIntl(withSondaAnalyzer(nextConfig));
