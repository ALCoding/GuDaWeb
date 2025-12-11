# 固搭羽毛球俱乐部官网 - 开发指南

## 快速开始

### 1. 安装依赖

```bash
cd Web
pnpm install
```

### 2. 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000 查看网站

### 3. 构建生产版本

```bash
pnpm build
```

构建完成后，静态文件将输出到 `out/` 目录

## 项目结构

```
Web/
├── src/
│   ├── app/                    # Next.js 页面路由
│   │   ├── layout.tsx         # 根布局
│   │   ├── page.tsx           # 首页
│   │   ├── tournament/        # 赛事详情页
│   │   └── globals.css        # 全局样式
│   ├── components/            # React 组件
│   │   ├── layout/            # 布局组件（Navbar, Footer）
│   │   ├── home/              # 首页组件
│   │   ├── tournament/        # 赛事页组件
│   │   └── ui/                # 基础 UI 组件
│   ├── data/                  # 数据层
│   │   ├── teams.ts           # 战队数据
│   │   ├── matches.ts         # 比赛数据
│   │   ├── standings.ts       # 积分榜数据
│   │   └── rules.ts           # 规则文案
│   ├── types/                 # TypeScript 类型定义
│   └── utils/                 # 工具函数
├── public/                    # 静态资源
│   └── images/                # 图片资源
├── package.json
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 数据更新

### 更新战队信息

编辑 `src/data/teams.ts`：

```typescript
export const teams: Record<TeamId, Team> = {
  A: {
    id: 'A',
    name: '猛虎队',
    logo: 'A',
    captain: '张三丰',
    members: ['李四', '王五', '赵六', '孙七', '周八', '吴九'],
    theme: { ... },
  },
  // ...
};
```

### 更新比赛数据

编辑 `src/data/matches.ts`，添加新的比赛记录：

```typescript
{
  id: 'R1-MD-1',
  round: 1,
  category: 'MD',
  matchNumber: 1,
  teamA: 'A',
  teamB: 'B',
  playersA: ['张三', '李四'],
  playersB: ['令狐冲', '风清扬'],
  games: [
    { gameNumber: 1, scoreA: 21, scoreB: 19, winner: 'A' },
    { gameNumber: 2, scoreA: 18, scoreB: 21, winner: 'B' },
    { gameNumber: 3, scoreA: 21, scoreB: 15, winner: 'A' },
  ],
  totalGamesPlayed: 3,
  winner: 'A',
  status: 'completed',
}
```

### 更新积分榜

编辑 `src/data/standings.ts`：

```typescript
export const standings: StandingEntry[] = [
  {
    rank: 1,
    rankType: 'champion',
    team: 'A',
    played: 3,
    won: 3,
    lost: 0,
    pointsDiff: 18,
    points: 9,
  },
  // ...
];
```

## 样式定制

### 修改主题色

编辑 `tailwind.config.ts`：

```typescript
colors: {
  brand: {
    dark: '#0F1115',      // 背景色
    accent: '#3B82F6',    // 主色
    secondary: '#06B6D4', // 辅助色
  },
}
```

### 自定义组件样式

全局样式定义在 `src/app/globals.css`

## 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入仓库
3. 自动构建和部署

### 静态文件部署

```bash
pnpm build
```

将 `out/` 目录部署到任意静态托管平台：
- GitHub Pages
- Netlify
- Cloudflare Pages
- 阿里云 OSS
- 腾讯云 COS

## 功能说明

### 首页

- Hero 区域：品牌展示 + CTA 按钮
- 赛事模块：4支战队卡片展示
- 平滑滚动：点击按钮自动滚动到赛事区域

### 赛事详情页

- **积分榜**：展示排名、战绩、积分，前三名特殊样式
- **详细赛程**：按单项分类（男双/女双/混双），显示每局比分
- **比赛规则**：赛制说明
- **参赛战队**：完整队员名单
- **战报海报**：生成含二维码的分享海报

### 响应式设计

- 移动端：汉堡菜单、表格横向滚动
- 平板：优化布局
- 桌面：完整展示

## 常见问题

### 如何添加战队 Logo？

1. 将图片放置在 `public/images/teams/` 目录
2. 更新 `src/data/teams.ts` 中的 `logo` 字段：

```typescript
logo: '/images/teams/team-a-tiger.png'
```

### 如何修改二维码链接？

编辑 `src/components/tournament/PosterModal.tsx`，找到：

```typescript
<QRCodeSVG value="https://gudaclub.com/tournament" />
```

### 如何禁用静态导出模式？

编辑 `next.config.js`，删除或注释 `output: 'export'`

## 技术支持

- Next.js 文档：https://nextjs.org/docs
- Tailwind CSS：https://tailwindcss.com/docs
- TypeScript：https://www.typescriptlang.org/docs

---

Powered by Jalen

