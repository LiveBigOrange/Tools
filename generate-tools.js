const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'tools');
const templatePath = path.join(toolsDir, 'tool-template.html');
const indexPath = path.join(__dirname, 'search-index.json');

const template = fs.readFileSync(templatePath, 'utf-8');
const tools = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'site-config.json'), 'utf-8'));

const featuresMap = {
    '编码/解码': [
        { icon: '✨', title: '多种编码格式', desc: '支持 Base64、URL 编码、Unicode、HTML 实体等多种常见编码格式。' },
        { icon: '⚡', title: '实时预览', desc: '输入内容后即时显示转换结果，无需等待。' },
        { icon: '📋', title: '一键复制', desc: '转换结果可直接复制，方便使用。' }
    ],
    '时间/日期': [
        { icon: '🌍', title: '多时区支持', desc: '支持全球所有标准时区，包括 UTC、GMT 以及各主要城市时区。' },
        { icon: '⚡', title: '实时显示', desc: '自动显示当前时间，支持自定义日期格式。' },
        { icon: '🎯', title: '高精度计算', desc: '支持秒级和毫秒级时间戳，精确到毫秒。' }
    ],
    '开发者工具': [
        { icon: '🎨', title: '语法高亮', desc: '支持多种编程语言语法高亮显示。' },
        { icon: '⚡', title: '实时预览', desc: '输入内容后即时显示处理结果。' },
        { icon: '📋', title: '多种模板', desc: '内置多种预设模板，快速开始使用。' }
    ],
    '视频/流媒体': [
        { icon: '📺', title: 'HLS/M3U8 支持', desc: '支持 HLS/M3U8 流媒体协议播放。' },
        { icon: '🔗', title: '自定义源', desc: '可输入自定义视频源地址。' },
        { icon: '🖥️', title: '全屏播放', desc: '支持全屏播放，沉浸式观看体验。' }
    ],
    '生成器': [
        { icon: '📦', title: '批量生成', desc: '支持批量生成，设置数量一次生成多个结果。' },
        { icon: '⚙️', title: '自定义参数', desc: '灵活设置生成参数，满足个性化需求。' },
        { icon: '📋', title: '一键复制', desc: '生成结果可直接复制，方便使用。' }
    ],
    '设计工具': [
        { icon: '👁️', title: '实时预览', desc: '操作后即时显示效果，所见即所得。' },
        { icon: '🔄', title: '格式转换', desc: '支持多种格式之间的互相转换。' },
        { icon: '📥', title: '高质量导出', desc: '导出高质量结果文件，满足专业需求。' }
    ],
    '加密/哈希': [
        { icon: '🔐', title: '多种算法', desc: '支持 MD5、SHA、AES、RSA 等多种加密算法。' },
        { icon: '⚡', title: '实时计算', desc: '输入内容后即时显示计算结果。' },
        { icon: '📁', title: '文件哈希', desc: '支持上传文件计算哈希值，校验完整性。' }
    ],
    '网络工具': [
        { icon: '🔍', title: '实时查询', desc: '快速查询网络信息，即时显示结果。' },
        { icon: '🌐', title: '多种协议', desc: '支持 HTTP、WebSocket 等多种网络协议。' },
        { icon: '📊', title: '详细信息', desc: '展示详细的查询结果和分析信息。' }
    ],
    '文本工具': [
        { icon: '📊', title: '多维统计', desc: '支持字符数、单词数、行数等多种统计维度。' },
        { icon: '⚡', title: '实时处理', desc: '输入文本时即时处理，无需等待。' },
        { icon: '🀄', title: '中文支持', desc: '完全支持中文文本的处理、统计和转换。' }
    ],
    '数学/计算': [
        { icon: '🔢', title: '多种运算', desc: '支持四则运算、三角函数、对数、幂运算等。' },
        { icon: '⚡', title: '实时计算', desc: '输入数值后即时显示计算结果。' },
        { icon: '🎯', title: '高精度', desc: '浮点数精度可达小数点后 15 位。' }
    ]
};

const faqMap = {
    '编码/解码': [
        { q: '数据会被上传到服务器吗？', a: '不会。所有编码和解码操作都在您的浏览器本地完成，数据不会经过任何服务器。' },
        { q: '支持哪些编码格式？', a: '支持 Base64、URL 编码、Unicode、HTML 实体、XML 等多种常见编码格式。' },
        { q: '可以处理大文件吗？', a: '可以处理较大的文本内容，但建议单次处理不超过 10MB，以保证浏览器性能。' }
    ],
    '时间/日期': [
        { q: '时间戳的精度是多少？', a: '支持秒级和毫秒级时间戳，可以精确到毫秒。' },
        { q: '支持哪些时区？', a: '支持全球所有标准时区，包括 UTC、GMT 以及各主要城市时区。' },
        { q: '如何获取当前时间戳？', a: '页面打开时会自动显示当前时间的时间戳，您也可以点击按钮一键复制。' }
    ],
    '开发者工具': [
        { q: '这些工具需要联网使用吗？', a: '大部分工具可以在离线状态下使用，因为所有处理都在浏览器本地完成。' },
        { q: '支持哪些编程语言？', a: '工具支持多种常见编程语言格式，包括 JavaScript、CSS、HTML、JSON 等。' },
        { q: '数据安全如何保障？', a: '所有数据处理均在您的设备本地完成，不会上传到任何服务器。' }
    ],
    '视频/流媒体': [
        { q: '支持哪些视频格式？', a: '主要支持 M3U8/HLS 流媒体格式，也支持常见的 MP4 等格式。' },
        { q: '可以播放本地视频吗？', a: '可以输入本地视频文件的 URL 或路径进行播放。' },
        { q: '播放卡顿怎么办？', a: '请检查网络连接，或尝试降低视频源的质量设置。' }
    ],
    '生成器': [
        { q: '生成的内容安全吗？', a: '所有生成操作均在浏览器本地完成，生成的内容不会上传到服务器。' },
        { q: '可以批量生成吗？', a: '支持批量生成，您可以设置生成数量，一次性生成多个结果。' },
        { q: '如何复制生成的内容？', a: '点击复制按钮即可将生成的内容复制到剪贴板。' }
    ],
    '设计工具': [
        { q: '支持哪些颜色格式？', a: '支持 HEX、RGB、HSL 等常见颜色格式的互相转换。' },
        { q: '图片处理会压缩质量吗？', a: '您可以自定义压缩比例，在文件大小和画质之间取得平衡。' },
        { q: '导出格式有哪些？', a: '支持 PNG、JPEG、WebP 等常见图片格式导出。' }
    ],
    '加密/哈希': [
        { q: '加密后的数据可以解密吗？', a: '哈希算法（MD5、SHA）是单向的，不可逆。AES 等对称加密可以通过密钥解密。' },
        { q: '哪种加密方式更安全？', a: '推荐使用 SHA-256 或更高强度的哈希算法，加密推荐 AES-256。' },
        { q: '我的数据会被存储吗？', a: '不会。所有加密/哈希计算均在浏览器本地完成，数据不会上传或存储。' }
    ],
    '网络工具': [
        { q: '查询结果准确吗？', a: '查询结果基于公开数据库，准确性较高，但可能存在少量延迟。' },
        { q: '为什么我的 IP 显示不准确？', a: 'IP 归属地数据库可能未及时更新，建议参考多个数据源。' },
        { q: '这些工具需要安装插件吗？', a: '不需要。所有工具均为纯网页实现，打开浏览器即可使用。' }
    ],
    '文本工具': [
        { q: '支持中文处理吗？', a: '完全支持中文文本的处理、统计和转换。' },
        { q: '可以处理多大的文本？', a: '建议单次处理不超过 5MB 的文本，以保证浏览器响应速度。' },
        { q: '统计结果准确吗？', a: '统计基于标准算法，中文字数和字符数分别计算，结果准确可靠。' }
    ],
    '数学/计算': [
        { q: '计算精度如何？', a: '支持高精度计算，浮点数精度可达小数点后 15 位。' },
        { q: '支持哪些运算？', a: '支持基本四则运算、三角函数、对数、幂运算等科学计算功能。' },
        { q: '可以在手机上使用吗？', a: '可以。网站完全适配移动端，在手机浏览器上也能正常使用。' }
    ]
};

function generateSlug(name) {
    return name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '-').toLowerCase();
}

function getFilePath(toolName) {
    const slug = toolName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    return `/tools/${slug}.html`;
}

for (const tool of tools) {
    const category = tool.category;
    const features = featuresMap[category] || [
        { icon: '✨', title: '功能强大', desc: '操作简单，纯前端处理，数据安全。' },
        { icon: '⚡', title: '快速高效', desc: '支持多种常见场景，实时处理。' },
        { icon: '🔒', title: '隐私保护', desc: '数据在浏览器本地处理，不上传服务器。' }
    ];
    const faqs = faqMap[category] || [
        { q: '这个工具怎么用？', a: '在输入框中输入内容，点击执行按钮即可查看结果。' },
        { q: '数据安全吗？', a: '所有处理均在浏览器本地完成，数据不会上传到服务器。' },
        { q: '可以离线使用吗？', a: '页面加载完成后可以离线使用，无需网络连接。' }
    ];

    let html = template
        .replace(/\{\{TOOL_NAME\}\}/g, tool.name)
        .replace(/\{\{TOOL_DESCRIPTION\}\}/g, tool.description)
        .replace(/\{\{TOOL_KEYWORDS\}\}/g, tool.keywords.join(', '))
        .replace(/\{\{TOOL_PATH\}\}/g, tool.path)
        .replace(/\{\{CATEGORY\}\}/g, category)
        .replace(/\{\{CATEGORY_SLUG\}\}/g, generateSlug(category))
        .replace(/\{\{FEATURE_1_TITLE\}\}/g, features[0].title)
        .replace(/\{\{FEATURE_1_DESC\}\}/g, features[0].desc)
        .replace(/\{\{FEATURE_2_TITLE\}\}/g, features[1].title)
        .replace(/\{\{FEATURE_2_DESC\}\}/g, features[1].desc)
        .replace(/\{\{FAQ_Q1\}\}/g, faqs[0].q)
        .replace(/\{\{FAQ_A1\}\}/g, faqs[0].a)
        .replace(/\{\{FAQ_Q2\}\}/g, faqs[1].q)
        .replace(/\{\{FAQ_A2\}\}/g, faqs[1].a)
        .replace(/\{\{FAQ_Q3\}\}/g, faqs[2].q)
        .replace(/\{\{FAQ_A3\}\}/g, faqs[2].a)
        .replace(/\{\{BRAND\}\}/g, config.brand)
        .replace(/\{\{SITE_DESC\}\}/g, config.siteDescription)
        .replace(/\{\{ICP_NUM\}\}/g, config.icp)
        .replace(/\{\{GITHUB_URL\}\}/g, config.github);

    const fileName = tool.path.split('/').pop();
    const filePath = path.join(toolsDir, fileName);
    if (fs.existsSync(filePath)) {
        var existing = fs.readFileSync(filePath, 'utf-8');
        var newStyle = html.match(/<style>[\s\S]*?<\/style>/)?.[0];
        var existingStyle = existing.match(/<style>[\s\S]*?<\/style>/)?.[0];
        if (existingStyle && newStyle && existingStyle !== newStyle) {
            if (existingStyle.length <= newStyle.length + 50) {
                existing = existing.replace(existingStyle, newStyle);
            }
        }
        var oldHeader = existing.match(/<header[\s\S]*?<\/header>/)?.[0];
        var newHeader = html.match(/<header[\s\S]*?<\/header>/)?.[0];
        if (oldHeader && newHeader) {
            existing = existing.replace(oldHeader, newHeader);
        }
        var oldFooter = existing.match(/<footer[\s\S]*?<\/footer>/)?.[0];
        var newFooter = html.match(/<footer[\s\S]*?<\/footer>/)?.[0];
        if (oldFooter && newFooter) {
            existing = existing.replace(oldFooter, newFooter);
        }
        var oldLd = existing.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/)?.[0];
        var newLd = html.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/)?.[0];
        if (oldLd && newLd) {
            existing = existing.replace(oldLd, newLd);
        }
        existing = existing.replace(/ToolBoxTheme\.applyFromStorage\(\)/g, 'ToolBoxTheme.setupToggle()');
        if (existing !== fs.readFileSync(filePath, 'utf-8')) {
            fs.writeFileSync(filePath, existing, 'utf-8');
            console.log(`Updated (shell): ${fileName}`);
        } else {
            console.log(`Skipped (unchanged): ${fileName}`);
        }
        continue;
    }
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`Generated: ${fileName}`);
}

console.log(`\nDone! Generated ${tools.length} tool pages.`);
