import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "spotpro-website-assets-392362834769-ap-south-2-an.s3.ap-south-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
