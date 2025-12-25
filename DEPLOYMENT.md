# 贪吃蛇游戏部署指南

##   快速部署

### 方法一：GitHub Pages（推荐）
1. **创建GitHub仓库**
   ```bash
   git init
   git add .
   git commit -m "初始提交: 儿童贪吃蛇游戏"
   git branch -M main
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   git push -u origin main
   ```

2. **启用GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 **GitHub Actions**
   - 保存设置，等待自动部署

3. **访问地址**
   - `https://你的用户名.github.io/你的仓库名`

### 方法二：Netlify
1. 访问 [netlify.com](https://netlify.com)
2. 拖拽项目文件夹或连接GitHub仓库
3. 自动部署，访问生成的域名

### 方法三：Vercel
1. 访问 [vercel.com](https://vercel.com)
2. 连接GitHub仓库
3. 框架预设选择 **Other**
4. 自动部署

##  🖥️ 本地开发

### 启动本地服务器
```bash
# Python 3
python start-server.py

# 或使用Node.js
npx http-server -p 8000
```

访问: http://localhost:8000

### 项目文件说明
- `index.html` - 主页面
- `game.js` - 游戏核心逻辑
- `sounds.js` - 音效系统
- `style.css` - 样式文件
- `start-server.py` - 本地服务器

##  🌐 支持的部署平台

| 平台 | 费用 | 特点 | 推荐度 |
|------|------|------|--------|
| GitHub Pages | 免费 | 简单易用，自动SSL | ★★★★★ |
| Netlify | 免费 | 全球CDN，自动HTTPS | ★★★★☆ |
| Vercel | 免费 | 极速部署，边缘网络 | ★★★★☆ |

##  📱 移动端适配

游戏已完全优化移动设备：
- ✅ 触摸屏操作支持
- ✅ 响应式设计
- ✅ 移动端手势优化
- ✅ 平板设备适配

## 🔧 部署检查清单

- [ ] 所有文件已提交到Git
- [ ] `.gitignore` 配置正确
- [ ] GitHub Actions配置就绪
- [ ] 本地测试通过
- [ ] 移动端功能验证

##  🆘 常见问题

**Q: 部署后页面空白？**
A: 检查文件路径，确保所有文件在根目录

**Q: 移动端触摸无效？**
A: 游戏已优化触摸事件，可能是缓存问题

**Q: 音频不工作？**
A: 现代浏览器要求用户交互后播放音频

##  📞 技术支持

如有部署问题，请检查：
1. 浏览器控制台错误信息
2. 网络连接状态
3. 文件权限设置

**部署成功标志：** 能够在浏览器中正常运行游戏，触摸操作灵敏，音效正常！

---
*最后更新: 2025-12-24*