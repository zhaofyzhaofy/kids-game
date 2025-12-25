# GitHub仓库设置指南

##   快速开始

### 1. 创建GitHub仓库
1. 访问 [github.com](https://github.com)
2. 点击右上角 **+** → **New repository**
3. 填写信息：
   - **仓库名**: `kids-snake-game`（推荐）
   - **描述**: （可选）儿童贪吃蛇游戏
   - **公开/私有**: 选择 **Public**
   - **初始化README**: **不要勾选**
4. 点击 **Create repository**

### 2. 获取仓库URL
创建成功后，页面会显示您的仓库URL：
```
https://github.com/你的用户名/kids-snake-game.git
```

### 3. 推送代码到GitHub
```bash
# 在项目根目录执行以下命令：

# 初始化Git
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "初始提交: 儿童贪吃蛇游戏"

# 连接远程仓库（替换为你的实际URL）
git remote add origin https://github.com/你的用户名/kids-snake-game.git

# 推送代码
git branch -M main
git push -u origin main
```

### 4. 启用GitHub Pages
1. 进入仓库 **Settings** 标签页
2. 左侧选择 **Pages**
3. **Source** 选择 **GitHub Actions**
4. 保存设置，等待自动部署

##  🔗 访问地址

部署成功后访问：
```
https://你的用户名.github.io/kids-snake-game
```

##  ❓ 常见问题

**Q: 忘记仓库URL怎么办？**
A: 进入GitHub → Your repositories → 点击仓库名 → 页面顶部就是URL

**Q: 推送代码时提示认证失败？**
A: 需要设置GitHub个人访问令牌或使用SSH密钥

**Q: 如何修改远程仓库URL？**
```bash
git remote set-url origin 新的URL
```

##  📞 获取帮助

- GitHub官方文档: [docs.github.com](https://docs.github.com)
- Git教程: [git-scm.com/doc](https://git-scm.com/doc)

---
*提示：每次修改代码后，使用 `git add . && git commit -m "描述" && git push` 更新在线版本*