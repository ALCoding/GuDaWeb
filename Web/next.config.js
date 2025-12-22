/** @type {import('next').NextConfig} */

// 判断是否使用自定义域名（使用自定义域名时不需要 basePath）
const useCustomDomain = process.env.CUSTOM_DOMAIN === 'true';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

// 只有在 GitHub Pages 且没有自定义域名时才需要 basePath
const basePath = (isGitHubPages && !useCustomDomain) ? '/GuDaWeb' : '';

const nextConfig = {
  // 启用静态导出模式，生成纯静态文件
  output: 'export',
  
  // 静态导出时禁用图片优化
  images: {
    unoptimized: true,
  },
  
  // URL 末尾加斜杠，兼容静态托管
  trailingSlash: true,
  
  // GitHub Pages 部署时需要配置基础路径（使用自定义域名时不需要）
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  
  // 环境变量
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
