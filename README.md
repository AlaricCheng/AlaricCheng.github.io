# Bin Cheng 的个人网站

## 本地预览

需要 Node.js 22 或以上。在项目根目录运行：

```bash
npm ci
npm run dev
```

打开 http://localhost:8080。修改文件后自动刷新，按 `Ctrl+C` 停止。

## 修改内容

| 内容 | 文件 |
| --- | --- |
| 简介 | `src/content/about.md` |
| News | `src/content/news.md` |
| 论文及 Preprints | `src/content/publications.md` |
| 报告 | `src/content/talks.md` |
| 个人资料、链接及导航 | `src/_data/site.json` |
| CV | `files/CV.pdf` |
| 头像 | `images/profile.png` |
| 页面布局 | `src/index.njk` |
| 样式 | `assets/css/main.css` |
| 交互 | `assets/js/main.js` |

正文使用 Markdown，主标题由模板提供。News 最新条目放在最前面。

## 构建与发布

```bash
npm run build
```

输出目录为 `_site/`。提交源码和 `package-lock.json`，不提交 `_site/` 或 `node_modules/`。

GitHub 仓库 **Settings → Pages → Source** 选择 **GitHub Actions**。推送到 `main` 后，`.github/workflows/pages.yml` 自动构建并发布；pull request 只检查构建。

许可证见 [LICENSE](LICENSE)。
