#!/bin/bash

# 贪吃蛇游戏部署设置脚本

echo "🐍 儿童贪吃蛇游戏部署助手"
echo "=========================="

# 检查是否在Git仓库中
if [ ! -d ".git" ]; then
    echo "⚠️  当前目录不是Git仓库，正在初始化..."
    git init
    git add .
    git commit -m "初始提交: 儿童贪吃蛇游戏"
    echo "✅ Git仓库初始化完成"
fi

echo ""
echo "📋 部署选项："
echo "1. GitHub Pages (推荐)"
echo "2. Netlify"
echo "3. Vercel"
echo "4. 显示详细部署指南"
echo ""

read -p "请选择部署方式 (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🚀 GitHub Pages部署步骤："
        echo "1. 在GitHub上创建新仓库"
        echo "2. 将本地代码推送到GitHub："
        echo "   git remote add origin <你的仓库URL>"
        echo "   git push -u origin main"
        echo "3. 进入仓库设置 Settings → Pages"
        echo "4. 选择 Source: GitHub Actions"
        echo "5. 等待部署完成，访问 https://你的用户名.github.io/仓库名"
        ;;
    2)
        echo ""
        echo "🌐 Netlify部署步骤："
        echo "1. 访问 https://netlify.com"
        echo "2. 连接GitHub账号"
        echo "3. 导入你的仓库"
        echo "4. 部署设置保持默认"
        echo "5. 访问生成的自定义域名"
        ;;
    3)
        echo ""
        echo "⚡ Vercel部署步骤："
        echo "1. 访问 https://vercel.com"
        echo "2. 连接GitHub账号"
        echo "3. 导入你的仓库"
        echo "4. 框架预设选 Other"
        echo "5. 访问生成的自定义域名"
        ;;
    4)
        echo ""
        echo "📖 详细部署指南："
        echo ""
        echo "🌟 GitHub Pages (免费)："
        echo "- 适合静态网站"
        echo "- 自动SSL证书"
        echo "- 自定义域名支持"
        echo ""
        echo "🌟 Netlify (免费套餐)："
        echo "- 更快的全球CDN"
        echo "- 自动HTTPS"
        echo "- 表单处理功能"
        echo ""
        echo "🌟 Vercel (免费套餐)："
        echo "- 极速部署"
        echo "- 自动SSL"
        echo "- 边缘网络优化"
        ;;
    *)
        echo "无效选择"
        ;;
esac

echo ""
echo "🔗 访问方式："
echo "- 本地访问: python start-server.py"
echo "- GitHub Pages: https://用户名.github.io/仓库名"
echo "- Netlify/Vercel: 自动生成的域名"
echo ""
echo "✅ 部署文件已准备就绪！"