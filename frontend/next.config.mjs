// frontend/next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  
  // -----------------------------------------------------------
  // 1. ADD: Image Configuration for External Hosts (ImgBB)
  // -----------------------------------------------------------
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com', // Allowing images from the ImgBB domain
        port: '',
        pathname: '/**', 
      },
    ],
  },
  // -----------------------------------------------------------

  reactCompiler: true, // Keeping your existing setting
};

export default nextConfig;