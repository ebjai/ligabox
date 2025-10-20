/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Enables remote image loading (YouTube thumbnails, etc.)
  images: {
    domains: [
      "i.ytimg.com",          // YouTube
      "img.youtube.com",      // YouTube fallback
      "images.unsplash.com",  // Stock demo
      "placehold.co",         // Placeholder generator
      "res.cloudinary.com",   // Optional for uploads
    ],
  },
};

module.exports = nextConfig;
