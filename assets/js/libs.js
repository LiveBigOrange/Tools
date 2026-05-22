/**
 * CDN库加载配置
 * 在需要时动态加载第三方库，避免首屏加载过多资源
 */

const CDN_LIBS = {
    crypto: 'https://unpkg.com/crypto-js@4.2.0/crypto-js.min.js',
    qrcode: 'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js',
    jsbarcode: 'https://unpkg.com/jsbarcode@3.11.5/dist/JsBarcode.all.min.js',
    marked: 'https://unpkg.com/marked@9.1.6/marked.min.js',
    highlight: 'https://unpkg.com/highlight.js@11.9.0/lib/highlight.min.js',
    highlightCss: 'https://unpkg.com/highlight.js@11.9.0/styles/github.min.css',
    hls: 'https://unpkg.com/hls.js@1.4.10/dist/hls.min.js',
    diff: 'https://unpkg.com/diff@5.1.0/dist/diff.min.js',
    pinyin: 'https://unpkg.com/pinyin-pro@3.18.2/dist/index.js',
    opencc: 'https://unpkg.com/opencc-js@1.0.5/dist/umd/converter.min.js',
    cleanCss: 'https://unpkg.com/clean-css@5.3.2/dist/clean-css.min.js',
    terser: 'https://unpkg.com/terser@5.24.0/dist/bundle.min.js',
    jsyaml: 'https://unpkg.com/js-yaml@4.1.0/dist/js-yaml.min.js',
    uuid: 'https://unpkg.com/uuid@9.0.1/dist/umd/uuidv4.min.js',
    bcryptjs: 'https://unpkg.com/bcryptjs@2.4.3/dist/bcrypt.min.js',
    pako: 'https://unpkg.com/pako@2.1.0/dist/pako.min.js'
};

const loadedLibs = new Set();

function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (loadedLibs.has(src)) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            loadedLibs.add(src);
            resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function loadStyle(href) {
    return new Promise((resolve, reject) => {
        if (loadedLibs.has(href)) {
            resolve();
            return;
        }
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = () => {
            loadedLibs.add(href);
            resolve();
        };
        link.onerror = reject;
        document.head.appendChild(link);
    });
}

async function loadLibs(...libNames) {
    const promises = libNames.map(name => {
        const src = CDN_LIBS[name];
        if (!src) return Promise.resolve();
        if (src.endsWith('.css')) {
            return loadStyle(src);
        }
        return loadScript(src);
    });
    await Promise.all(promises);
}

window.loadLibs = loadLibs;
window.CDN_LIBS = CDN_LIBS;

function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
    }
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return Promise.resolve();
}
window.copyText = copyText;
