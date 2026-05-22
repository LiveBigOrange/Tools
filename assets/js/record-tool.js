(function() {
    const toolInfo = window.TOOL_INFO || { name: document.title.split(' - ')[0], path: window.location.pathname };
    const key = 'tool_history';
    let history = [];
    try {
        history = JSON.parse(localStorage.getItem(key) || '[]');
    } catch(e) {}

    history.push({ name: toolInfo.name, path: toolInfo.path, time: Date.now() });

    const unique = {};
    history.sort((a, b) => b.time - a.time).forEach(item => {
        if (!unique[item.path]) unique[item.path] = item;
    });

    localStorage.setItem(key, JSON.stringify(Object.values(unique).slice(0, 30)));
})();
