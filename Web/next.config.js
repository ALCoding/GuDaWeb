/** @type {import('next').NextConfig} */

// 判断是否为 GitHub Pages 构建
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGitHubPages ? '/GuDaWeb' : '';

const nextConfig = {
  // 启用静态导出模式，生成纯静态文件
  output: 'export',
  
  // 静态导出时禁用图片优化
  images: {
    unoptimized: true,
  },
  
  // URL 末尾加斜杠，兼容静态托管
  trailingSlash: true,
  
  // GitHub Pages 部署时需要配置基础路径
  basePath: basePath,
  assetPrefix: isGitHubPages ? '/GuDaWeb/' : '',
  
  // 环境变量
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
