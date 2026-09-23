import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  turbopack: {},
  transpilePackages: ["@flu-wop/design-system"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
}

export default nextConfig
