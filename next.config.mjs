/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SOCKET_URL: process.env.SOCKET_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*res.cloudinary.com*",
      },
    ],
  },
};

export default nextConfig;
