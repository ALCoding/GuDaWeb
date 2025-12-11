/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用静态导出模式，生成纯静态文件
  output: 'export',
  
  // 静态导出时禁用图片优化
  images: {
    unoptimized: true,
  },
  
  // URL 末尾加斜杠，兼容静态托管
  trailingSlash: true,
  
  // 基础路径（如果部署在子目录下需要配置）
  // basePath: '',
};

module.exports = nextConfig;
