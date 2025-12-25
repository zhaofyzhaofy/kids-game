#!/usr/bin/env python3
import http.server
import socketserver
import os
import socket

def get_ip():
    """获取本机IP地址"""
    try:
        # 创建一个临时socket连接来获取本机IP
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "localhost"

def main():
    PORT = 8000
    IP = get_ip()
    
    # 切换到当前目录
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    Handler = http.server.SimpleHTTPRequestHandler
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("=" * 60)
        print("贪吃蛇游戏服务器已启动！")
        print("=" * 60)
        print("本地访问: http://localhost:%s" % PORT)
        print("本机IP: %s" % IP)
        print("平板访问: http://%s:%s" % (IP, PORT))
        print("=" * 60)
        print("按 Ctrl+C 停止服务器")
        print("=" * 60)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n服务器已停止")

if __name__ == "__main__":
    main()