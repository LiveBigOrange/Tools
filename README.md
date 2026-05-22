# 在线工具箱 - 使用说明

## 🚀 快速开始

### 方式1：直接打开（推荐用于快速预览）
双击 `index.html` 文件，在浏览器中直接打开。

**注意：** 
- 本地文件模式（`file://`协议）下，搜索功能会自动使用内嵌的工具数据
- 所有工具功能都能正常使用
- 控制台可能会显示 "本地模式：使用内嵌工具数据"，这是正常的

### 方式2：本地服务器（推荐用于完整体验）
使用本地HTTP服务器运行，可以获得完整功能：

#### 使用Python（推荐）
```bash
# Python 3
cd D:/Tools
python -m http.server 8080

# 然后访问 http://localhost:8080
```

#### 使用Node.js
```bash
# 安装serve
npm install -g serve

# 运行
cd D:/Tools
serve -p 8080

# 然后访问 http://localhost:8080
```

#### 使用VS Code
1. 安装 "Live Server" 扩展
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

### 方式3：部署到服务器
将整个项目上传到任意Web服务器或静态托管平台：

- **GitHub Pages**: 推送到仓库，开启Pages功能
- **Vercel**: 拖拽文件夹到vercel.com
- **Netlify**: 拖拽文件夹到netlify.com
- **Cloudflare Pages**: 连接GitHub仓库
- **传统服务器**: 上传到Web根目录（Nginx/Apache/IIS）

---

## 📁 项目结构

```
D:/Tools/
├── index.html              # 首页
├── about.html              # 关于页面
├── privacy.html            # 隐私政策页面
├── 404.html                # 404错误页
├── search-index.json       # 工具索引（在线模式使用）
├── site-config.json        # 站点配置（品牌/ICP/GitHub等）
├── manifest.json           # PWA清单文件
├── sw.js                   # Service Worker（离线缓存）
├── sitemap.xml             # SEO网站地图
├── robots.txt              # 爬虫规则
├── assets/
│   ├── css/
│   │   └── global.css      # 全局样式
│   ├── js/
│   │   ├── theme.js        # 多主题系统
│   │   ├── libs.js         # CDN库加载器
│   │   ├── record-tool.js  # 使用历史记录
│   │   └── related-tools.js # 相关工具推荐
│   └── icons/              # PWA图标（72-512px）
├── tools/                  # 129个工具页面
│   ├── json-formatter.html
│   ├── base64.html
│   ├── timestamp.html
│   └── ... (其他工具)
└── generate-*.js           # 构建脚本（开发用）
```

---

## 🔧 工具列表（129个）

### 编码/解码（16个）
- JSON 格式化 - 格式化、校验、压缩
- URL 编解码 - encodeURI/encodeURIComponent
- Base64 编解码 - 编码/解码
- HTML 实体编解码 - 实体编码/解码
- Unicode 转换 - 中文与Unicode互转
- 图片转 Base64 - 图片与Base64互转
- YAML JSON 互转 - YAML/JSON格式转换
- XML JSON 互转 - XML/JSON格式转换
- JSON CSV 互转 - JSON/CSV格式转换
- URL 参数转 JSON - URL参数解析
- ASCII 编码表 - ASCII码对照表
- Base32/Base58/Base62 编码 - 多进制编码
- Punycode 编解码 - 国际化域名编码
- Quoted-Printable 编解码 - 邮件编码
- 文件转 Hex - 文件十六进制查看
- Gzip 压缩解压 - Gzip压缩/解压

### 时间/日期（8个）
- 时间戳转换 - Unix时间戳与日期互转
- 在线秒表 - 计时器
- 日期计算器 - 日期差值计算
- 年龄计算器 - 年龄精确计算
- 公历农历转换 - 农历阳历互转
- 世界时间 - 全球时区对照
- 闰年查询 - 闰年判断
- 日历 - 日历查看

### 开发者工具（25个）
- Cron 表达式生成 - Cron解析生成
- 正则测试 - 正则表达式匹配
- JWT 解析 - Token解析
- HTTP 状态码查询 - 状态码速查
- CSS 代码格式化 - CSS美化与压缩
- Markdown 转 HTML - Markdown实时预览
- SQL 格式化 - SQL美化
- MIME 类型查询 - MIME速查
- chmod 计算器 - 权限计算
- Git 速查表 - Git命令速查
- Slug 生成 - URL友好字符串
- Docker Compose 转换 - YAML/Docker转换
- HTML 格式化 - HTML美化
- JavaScript 格式化 - JS美化
- 键盘 KeyCode 查询 - 键码速查
- 键盘按键测试 - 按键检测
- 剪切板查看器 - 剪贴板内容查看
- 文本转 HTML 表格 - 表格生成
- Nginx 格式化 - Nginx配置美化
- 正则备忘录 - 正则速查
- Meta Tag 提取 - 网页元信息提取
- 随机端口生成 - 端口生成
- HTML 在线运行 - HTML实时预览
- JSON Diff - JSON对比
- SLUG 批量生成 - 批量Slug

### 视频/流媒体（1个）
- M3U8 在线播放器 - HLS视频播放

### 生成器（8个）
- 随机密码生成 - 随机密码
- 条形码生成 - 多种条形码格式
- 二维码生成 - QRCode生成
- UUID 生成器 - 唯一标识符
- Token 生成器 - 自定义Token
- Lorem Ipsum 生成 - 占位文本
- WiFi 二维码 - WiFi连接二维码
- 随机字符串 - 自定义随机字符串

### 设计工具（11个）
- 颜色转换 - HEX/RGB/HSL互转
- 渐变生成器 - 渐变代码生成
- 图片压缩 - 图片大小压缩
- SVG 转 PNG - 格式转换
- 屏幕颜色拾取 - 取色器
- 调色板工具 - 配色方案
- 图片格式转换 - 多格式互转
- 图片转 ICO - ICO图标生成
- 图片自定义大小 - 图片尺寸调整
- 文字生成图片 - 文字图片
- 颜色对比度检查 - 无障碍对比度

### 加密/哈希（14个）
- MD5 加密 - MD5哈希计算
- SHA 加密 - SHA-1/256/512
- AES 加密解密 - 对称加密解密
- RSA 密钥生成 - 密钥对生成
- HMAC 生成器 - HMAC签名
- Bcrypt 哈希 - Bcrypt加密
- OTP 验证码 - 一次性密码
- 摩斯密码 - 摩斯电码
- 凯撒密码 - 凯撒加密
- XOR 异或加密 - 异或加密
- DES 加密解密 - DES加密
- RC4 加密解密 - RC4加密
- Rabbit 加密 - Rabbit加密
- CRC 校验 - CRC校验码

### 网络工具（8个）
- IP 查询 - IP归属地查询
- User-Agent 解析 - UA解析
- WebSocket 测试 - WebSocket调试
- 端口扫描 - 端口检测
- IP 子网计算 - 子网划分
- URL 解析器 - URL结构解析
- IPv4 转 IPv6 - 地址转换
- URL 批量生成器 - 批量URL生成

### 文本工具（21个）
- 文本字数统计 - 字符统计
- 文本对比 - 文本差异
- 繁简转换 - 繁简互换
- 拼音转换 - 中文转拼音
- 词频统计 - 词频分析
- 文本去重 - 行去重
- 文本大小写转换 - 大小写转换
- 文本替换 - 查找替换
- Emoji 选择器 - 表情选择
- 文本逆序 - 文本反转
- 文本分割合并 - 分割/合并
- 标点符号转换 - 标点转换
- 目录树生成 - 目录结构
- 键值对转代码 - KV格式转换
- HTML 标签过滤 - 标签过滤
- 特殊符号大全 - 特殊字符
- 文本行过滤 - 行过滤
- 邮箱规范化 - 邮箱格式化
- 列表去重排序 - 列表处理
- 北约字母 - NATO字母
- 文本统计 - 综合统计

### 数学/计算（17个）
- 进制转换 - 二/八/十/十六进制
- 单位换算 - 长度/重量/温度等
- 科学计算器 - 科学计算器
- 百分比计算 - 百分比运算
- 随机数生成 - 随机数生成器
- 数字转中文 - 数字中文大写
- 温度转换 - 摄氏华氏开尔文
- 原码反码补码 - 二进制表示
- IEEE 754 浮点数 - 浮点数解析
- 十六进制计算器 - Hex运算
- 模幂计算器 - 模幂运算
- 大小端转换 - 字节序转换
- 屏幕 PPI 计算器 - PPI计算
- 数组排序工具 - 数组排序
- 房贷计算器 - 贷款计算
- 数字排序 - 数值排序
- 罗马数字转换 - 罗马数字

---

## ⚠️ 常见问题

### 1. 控制台报错 "CORS policy"
**原因：** 使用`file://`协议打开，浏览器安全策略阻止`fetch`加载本地文件。

**解决：** 
- 这是正常的！代码已自动处理，使用内嵌数据
- 或使用本地服务器（推荐）

### 2. 搜索功能不工作
**原因：** 本地模式下无法加载`search-index.json`

**解决：** 
- 首页会使用内嵌的工具数据，功能正常
- 工具页面的"相关工具"推荐功能在本地模式下会降级
- 使用本地服务器可获得完整体验

### 3. 部分工具需要网络
以下工具需要网络连接：
- IP查询（需要调用IP API）
- M3U8播放器（需要加载HLS.js库）
- Markdown预览（需要加载marked.js库）
- 二维码生成（需要加载QRCode.js库）
- 条形码生成（需要加载JsBarcode库）
- 加密工具（需要加载CryptoJS库）

**注意：** 
- 所有库都是按需加载，首次使用时会从CDN获取
- 数据处理仍在本地完成，不上传服务器

### 4. 如何添加新工具？
1. 在`search-index.json`中添加工具信息
2. 运行`node generate-tools.js`生成工具页面
3. 或手动创建工具页面（参考现有工具）

---

## 🌟 特性

### 隐私优先
- ✅ 所有数据处理在浏览器本地完成
- ✅ 不上传任何数据到服务器
- ✅ 不使用追踪脚本（可选百度统计）

### 无需安装
- ✅ 纯前端实现
- ✅ 打开即用
- ✅ 支持离线使用（大部分工具）

### 性能优化
- ✅ 零依赖（原生JS）
- ✅ 按需加载第三方库
- ✅ CSS变量主题系统
- ✅ 响应式设计

### SEO友好
- ✅ 完整的meta标签
- ✅ Schema.org结构化数据
- ✅ sitemap.xml
- ✅ robots.txt

### PWA支持
- ✅ 可安装到桌面/手机主屏
- ✅ Service Worker离线缓存
- ✅ HTML页面network-first策略（更新即时生效）
- ✅ 静态资源cache-first策略（加速加载）
- ✅ 本地file://协议下自动跳过SW注册

---

## 📝 开发相关

### 修改工具数据
编辑 `search-index.json`，然后：
```bash
# 重新生成工具页面
node generate-tools.js

# 重新生成sitemap
node generate-sitemap.js
```

### 修改站点配置
编辑 `site-config.json`，可自定义以下信息：
```json
{
    "brand": "ToolBox",
    "brandShort": "ToolBox",
    "siteName": "ToolBox在线工具",
    "siteDomain": "tools.yzn123.cc",
    "siteDescription": "纯前端实现，数据不上传服务器，隐私安全有保障",
    "icp": "xxxxxx",
    "github": "https://github.com/LiveBigOrange/Tools",
    "githubLabel": "GitHub",
    "blog": "https://xxx.xxx.xxx",
    "blogLabel": "xxx.xxx.xxx",
    "email": "yzn5555@163.com",
    "author": "xxx"
}
```

**配置说明：**
| 字段 | 说明 | 影响范围 |
|------|------|---------|
| `brand` | 品牌名 | 页头、页脚、SEO |
| `siteName` | 站点全称 | SEO、结构化数据 |
| `siteDomain` | 站点域名 | canonical URL、sitemap |
| `icp` | ICP备案号 | 页脚备案链接 |
| `github` | GitHub仓库地址 | 页脚GitHub链接 |
| `blog` | 博客地址 | 关于页面博客链接 |
| `email` | 联系邮箱 | 隐私政策页面 |

### 自定义样式
编辑 `assets/css/global.css`，修改CSS变量：
```css
:root {
    --primary: #2563eb;      /* 主色调 */
    --bg: #f8fafc;           /* 背景色 */
    --card-bg: #ffffff;      /* 卡片背景 */
    --radius: 12px;          /* 圆角 */
}
```

### 添加CDN库
编辑 `assets/js/libs.js`，在`CDN_LIBS`对象中添加：
```javascript
const CDN_LIBS = {
    myLib: 'https://cdn.jsdelivr.net/npm/my-lib@1.0.0/dist/my-lib.min.js'
};
```

---

## 📄 License

MIT License - 可自由使用、修改、分发

---

## 🙋 反馈与贡献

- **问题反馈：** 在GitHub提Issue
- **功能建议：** 欢迎提交PR
- **联系方式：** yzn5555@163.com

---

## 🎉 开始使用

选择适合你的方式：

| 方式 | 适用场景 | 命令 |
|------|---------|------|
| 直接打开 | 快速预览 | 双击`index.html` |
| Python服务器 | 完整体验 | `python -m http.server 8080` |
| Node服务器 | 完整体验 | `npx serve -p 8080` |
| 部署上线 | 对外服务 | 上传到任意Web服务器 |

**推荐：** 使用本地服务器获得最佳体验！
