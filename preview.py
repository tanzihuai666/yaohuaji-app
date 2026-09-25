#!/usr/bin/env python3
"""
妖画集 · 本地极速真机与浏览器实时预览服务器
直接在浏览器中体验完整离线功能（数据自动保存在 LocalStorage，真机则使用 Filesystem）
"""

import http.server
import socketserver
import os
import sys
import webbrowser

PORT = 8088
WEB_DIR = os.path.join(os.path.dirname(__file__), "www")

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=WEB_DIR, **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

def main():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 60)
        print("🎨 妖画集 · 本地体验服务器已就绪")
        print(f"📂 资源目录: {WEB_DIR}")
        print(f"🔗 访问地址: {url}")
        print("💡 建议使用 Chrome 检查器开启移动端视图 (iPhone / Pixel) 获得最佳体验")
        print("=" * 60)
        try:
            webbrowser.open(url)
        except Exception:
            pass
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 体验服务已安全停止。")

if __name__ == "__main__":
    main()
