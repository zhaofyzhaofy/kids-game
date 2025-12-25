# 儿童贪吃蛇游戏

🐍 一个专为儿童设计的贪吃蛇游戏，支持平板和手机触摸操作。

## 功能特点

-  🎮 支持触摸屏操作的移动端适配
-  🎵 内置音效系统
-  📱 响应式设计，支持多种设备
-  🏆 游戏记录和最高分保存
-  ⚡ 四种游戏速度可选
-  💾 本地存储游戏数据

## 本地运行

```bash
# 方法1：使用Python启动本地服务器
python start-server.py

# 方法2：使用其他静态文件服务器
npx http-server -p 8000
```

然后在浏览器打开 http://localhost:8000

## 部署到GitHub Pages

1. 将代码推送到GitHub仓库
2. 进入仓库设置 → Pages
3. 选择部署源为 GitHub Actions
4. 等待部署完成，访问生成的URL

## 技术栈

- HTML5 Canvas
- JavaScript ES6+
- CSS3
- 响应式设计

## 项目结构

```
├── index.html          # 主页面
├── game.js             # 游戏核心逻辑
├── sounds.js           # 音效管理
├── style.css           # 样式文件
├── start-server.py     # 本地服务器
└── README.md           # 项目说明
```