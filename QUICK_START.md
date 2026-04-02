# 🚀 项目启动 - 3 步完成

你的项目已经**完全准备好**，只需 3 步即可看到网页！

---

## ⚡ 最快方案（推荐）

### 双击启动脚本
1. 找到项目文件夹：`d:\Objection_detection\saline-water-dashboard`
2. **双击** `START.bat` 文件
3. 选择 `1`（同时启动后端+前端）
4. 等待 3-5 秒
5. 打开浏览器访问 `http://localhost:5173`

✨ **完成！** 你应该看到科技感运维大屏了。

---

## 📝 如果 START.bat 不工作

### 方案 A：使用 CMD（命令提示符）- 最稳定

**第一个 CMD 窗口（后端）：**
```cmd
cd d:\Objection_detection\saline-water-dashboard\backend
npm run dev
```
等到看到：✅ `Backend running on http://localhost:4000`

**第二个 CMD 窗口（前端）：**
```cmd
cd d:\Objection_detection\saline-water-dashboard\frontend
npm run dev
```
等到看到：✅ `VITE v5.0.0...`

**打开浏览器：**
```
http://localhost:5173
```

---

## 🆘 可能的问题

| 问题 | 解决方案 |
|------|--------|
| **npm: 命令不存在** | 确保已安装 Node.js（https://nodejs.org/） |
| **端口 4000/5173 被占用** | 修改 `package.json` 或杀死占用进程 |
| **页面加载但显示空白** | Ctrl+F5 强制刷新，或检查浏览器控制台报错 |
| **无法连接到后端** | 确保后端也在运行，且未被防火墙阻止 |

---

## 📊 成功的标志

✅ 后端输出：`Backend running on http://localhost:4000`
✅ 前端输出：`VITE v5.0.0 ready in XXX ms`
✅ 网页地址栏显示：`http://localhost:5173`
✅ 页面显示 6 个彩色指标卡 + 地图 + 警报区域

---

## 🎯 组件清单（已全部完成）

- [x] 后端 Express 服务器
- [x] 前端 React + Vite 大屏
- [x] 地图组件（Mapbox）
- [x] ECharts 趋势图
- [x] WebSocket 实时推送
- [x] REST API（6 个端点）
- [x] 样式和动画
- [x] HTML 入口文件（关键！已修复）

---

**现在就试试吧！** 🎉
