/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // ✅ 이미지 최적화 끄기
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
