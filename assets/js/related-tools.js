var RelatedTools = (function() {
    var indexCache = null;

    var FALLBACK_TOOLS = [
        {name:"JSON 格式化",category:"编码/解码",path:"tools/json-formatter.html",keywords:["json","格式化","校验"],aliases:["json","格式化json"]},
        {name:"Base64 编解码",category:"编码/解码",path:"tools/base64.html",keywords:["base64","编码","解码"],aliases:["base64","base64编码"]},
        {name:"URL 编码解码",category:"编码/解码",path:"tools/url-encode.html",keywords:["url","编码","解码"],aliases:["url编码","urldecode"]},
        {name:"Unicode 转换",category:"编码/解码",path:"tools/unicode.html",keywords:["unicode","编码","转换"],aliases:["unicode","中文转unicode"]},
        {name:"HTML 实体编码",category:"编码/解码",path:"tools/html-entities.html",keywords:["html","实体","编码"],aliases:["html实体","html编码"]},
        {name:"XML 格式化",category:"编码/解码",path:"tools/xml-formatter.html",keywords:["xml","格式化","校验"],aliases:["xml","xml格式化"]},
        {name:"JWT 解码",category:"编码/解码",path:"tools/jwt-decoder.html",keywords:["jwt","解码","token"],aliases:["jwt","jwt解码"]},
        {name:"时间戳转换",category:"时间/日期",path:"tools/timestamp.html",keywords:["时间戳","timestamp","日期"],aliases:["时间戳","timestamp"]},
        {name:"日期计算",category:"时间/日期",path:"tools/date-calc.html",keywords:["日期","计算","天数"],aliases:["日期计算","天数计算"]},
        {name:"倒计时器",category:"时间/日期",path:"tools/countdown.html",keywords:["倒计时","计时器"],aliases:["倒计时","countdown"]},
        {name:"正则表达式测试",category:"开发者工具",path:"tools/regex.html",keywords:["正则","regex","匹配"],aliases:["正则","regex"]},
        {name:"Markdown 预览",category:"开发者工具",path:"tools/markdown.html",keywords:["markdown","预览","转换"],aliases:["markdown","md预览"]},
        {name:"CSS 格式化",category:"开发者工具",path:"tools/css-formatter.html",keywords:["css","格式化","压缩"],aliases:["css","css格式化"]},
        {name:"JS 压缩",category:"开发者工具",path:"tools/js-minify.html",keywords:["js","压缩","混淆"],aliases:["js压缩","javascript压缩"]},
        {name:"HTTP 状态码",category:"开发者工具",path:"tools/http-status.html",keywords:["http","状态码"],aliases:["http状态码","status"]},
        {name:"JSON 对比",category:"开发者工具",path:"tools/json-diff.html",keywords:["json","对比","diff"],aliases:["json对比","json diff"]},
        {name:"Cron 表达式生成",category:"开发者工具",path:"tools/cron.html",keywords:["cron","表达式","定时"],aliases:["cron","crontab"]},
        {name:"代码差异对比",category:"开发者工具",path:"tools/diff.html",keywords:["diff","对比","差异"],aliases:["diff","代码对比"]},
        {name:"M3U8 播放器",category:"视频/流媒体",path:"tools/m3u8-player.html",keywords:["m3u8","播放器","hls"],aliases:["m3u8","hls播放器"]},
        {name:"二维码生成",category:"生成器",path:"tools/qrcode.html",keywords:["二维码","qrcode","生成"],aliases:["二维码","qrcode"]},
        {name:"UUID 生成",category:"生成器",path:"tools/uuid.html",keywords:["uuid","guid","生成"],aliases:["uuid","guid"]},
        {name:"随机密码生成",category:"生成器",path:"tools/password.html",keywords:["密码","生成","随机"],aliases:["密码生成","随机密码"]},
        {name:"条形码生成",category:"生成器",path:"tools/barcode.html",keywords:["条形码","barcode"],aliases:["条形码","barcode"]},
        {name:"颜色转换",category:"设计工具",path:"tools/color-convert.html",keywords:["颜色","hex","rgb","hsl"],aliases:["颜色转换","颜色选择器"]},
        {name:"渐变生成器",category:"设计工具",path:"tools/gradient.html",keywords:["渐变","gradient","css"],aliases:["渐变","css渐变"]},
        {name:"图片压缩",category:"设计工具",path:"tools/image-compress.html",keywords:["图片","压缩","优化"],aliases:["图片压缩","压缩图片"]},
        {name:"SVG 转 PNG",category:"设计工具",path:"tools/svg-to-png.html",keywords:["svg","png","转换"],aliases:["svg转png","svg转换"]},
        {name:"MD5 加密",category:"加密/哈希",path:"tools/md5.html",keywords:["md5","加密","哈希"],aliases:["md5","md5加密"]},
        {name:"SHA 加密",category:"加密/哈希",path:"tools/sha.html",keywords:["sha","sha256","哈希"],aliases:["sha","sha256"]},
        {name:"AES 加密解密",category:"加密/哈希",path:"tools/aes.html",keywords:["aes","加密","解密"],aliases:["aes","aes加密"]},
        {name:"RSA 密钥生成",category:"加密/哈希",path:"tools/rsa.html",keywords:["rsa","密钥","公私钥"],aliases:["rsa","非对称加密"]},
        {name:"IP 查询",category:"网络工具",path:"tools/ip-lookup.html",keywords:["ip","查询","归属地"],aliases:["ip查询","ip地址"]},
        {name:"User-Agent 解析",category:"网络工具",path:"tools/ua-parser.html",keywords:["ua","user-agent","解析"],aliases:["ua解析","浏览器信息"]},
        {name:"WebSocket 测试",category:"网络工具",path:"tools/websocket.html",keywords:["websocket","ws","测试"],aliases:["websocket","ws测试"]},
        {name:"端口扫描",category:"网络工具",path:"tools/port-scan.html",keywords:["端口","扫描","检测"],aliases:["端口扫描","port scan"]},
        {name:"文本字数统计",category:"文本工具",path:"tools/word-count.html",keywords:["字数","统计","字符"],aliases:["字数统计","word count"]},
        {name:"文本对比",category:"文本工具",path:"tools/text-diff.html",keywords:["文本","对比","diff"],aliases:["文本对比","文本diff"]},
        {name:"繁简转换",category:"文本工具",path:"tools/traditional-simplified.html",keywords:["繁体","简体","转换"],aliases:["繁简转换","繁转简"]},
        {name:"拼音转换",category:"文本工具",path:"tools/pinyin.html",keywords:["拼音","汉字","转换"],aliases:["拼音","pinyin"]},
        {name:"词频统计",category:"文本工具",path:"tools/word-frequency.html",keywords:["词频","统计","关键词"],aliases:["词频","词频统计"]},
        {name:"进制转换",category:"数学/计算",path:"tools/base-converter.html",keywords:["进制","转换","二进制"],aliases:["进制转换","十六进制"]},
        {name:"单位换算",category:"数学/计算",path:"tools/unit-converter.html",keywords:["单位","换算","长度"],aliases:["单位换算","长度换算"]},
        {name:"科学计算器",category:"数学/计算",path:"tools/calculator.html",keywords:["计算器","科学","计算"],aliases:["计算器","calc"]},
        {name:"百分比计算",category:"数学/计算",path:"tools/percentage.html",keywords:["百分比","折扣","计算"],aliases:["百分比","百分比计算"]},
        {name:"随机数生成",category:"数学/计算",path:"tools/random.html",keywords:["随机数","random","生成"],aliases:["随机数","random"]}
    ];

    function getIndexUrl() {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            var src = scripts[i].src || '';
            if (src.indexOf('related-tools.js') > -1) {
                return src.replace('assets/js/related-tools.js', 'search-index.json');
            }
        }
        return '../search-index.json';
    }

    function loadIndex() {
        if (indexCache) return Promise.resolve(indexCache);
        return fetch(getIndexUrl(), { mode: 'cors' }).then(function(r) { return r.json(); }).then(function(data) {
            indexCache = data;
            return data;
        });
    }

    function getUserHistory() {
        try {
            return JSON.parse(localStorage.getItem('tool_history') || '[]');
        } catch(e) {
            return [];
        }
    }

    function computeScore(tool, currentTool, currentKeywords, recentPaths) {
        if (tool.path === currentTool.path) return -1;
        var score = 0;
        if (tool.category === currentTool.category) score += 3;
        var toolKw = (tool.keywords || []).concat(tool.aliases || []);
        for (var i = 0; i < currentKeywords.length; i++) {
            if (toolKw.indexOf(currentKeywords[i]) > -1) score += 1;
        }
        if (recentPaths.indexOf(tool.path) > -1) score += 2;
        return score;
    }

    function getRelated(currentTool, tools, count) {
        var currentKeywords = (currentTool.keywords || []).concat(currentTool.aliases || []);
        var history = getUserHistory();
        var recentPaths = history.slice(0, 10).map(function(h) { return h.path; });
        var scored = tools.map(function(tool) {
            return { tool: tool, score: computeScore(tool, currentTool, currentKeywords, recentPaths) };
        });
        scored.sort(function(a, b) { return b.score - a.score; });
        return scored.filter(function(s) { return s.score >= 0; }).slice(0, count || 5).map(function(s) { return s.tool; });
    }

    function findToolByPath(tools, path) {
        var normalized = path.replace(/^.*tools\//, 'tools/');
        for (var i = 0; i < tools.length; i++) {
            if (tools[i].path === normalized || tools[i].path.replace(/^.*tools\//, 'tools/') === normalized) {
                return tools[i];
            }
        }
        return null;
    }

    function render(container, tools) {
        if (!container || !tools || tools.length === 0) return;
        var section = container.closest('.related');
        if (!section) return;
        var html = '';
        for (var i = 0; i < tools.length; i++) {
            var t = tools[i];
            var fileName = t.path.split('/').pop();
            html += '<a href="' + fileName + '" class="related-card">' +
                '<div class="related-card-name">' + t.name + '</div>' +
                '<div class="related-card-desc">' + (t.description || '') + '</div>' +
                '</a>';
        }
        container.innerHTML = html;
        section.style.display = '';
    }

    function init(containerId) {
        var container = document.getElementById(containerId);
        if (!container) return;

        var toolInfo = window.TOOL_INFO || { name: document.title.split(' - ')[0], path: window.location.pathname };
        var currentPath = toolInfo.path || '';

        loadIndex().then(function(tools) {
            var currentTool = findToolByPath(tools, currentPath);
            if (!currentTool) currentTool = { path: currentPath, category: '', keywords: [], aliases: [] };
            var related = getRelated(currentTool, tools, 5);
            render(container, related);
        }).catch(function() {
            var currentTool = findToolByPath(FALLBACK_TOOLS, currentPath);
            if (!currentTool) currentTool = { path: currentPath, category: '', keywords: [], aliases: [] };
            var related = getRelated(currentTool, FALLBACK_TOOLS, 5);
            if (related.length > 0) {
                render(container, related);
            } else {
                var section = container.closest('.related');
                if (section) section.style.display = 'none';
            }
        });
    }

    return { init: init };
})();
