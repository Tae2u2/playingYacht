/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],

  // GitHub Pages 배포를 위한 설정
  output: 'export',

  // GitHub Pages는 trailing slash가 필요합니다
  trailingSlash: true,

  // GitHub repository 이름 (playingYacht)
  basePath: '/playingYacht',

  // 이미지 최적화는 정적 export에서 지원되지 않으므로 비활성화
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
