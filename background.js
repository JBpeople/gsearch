// 监听web导航事件
chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
  const url = new URL(details.url);
  
  // 检查是否是搜索请求
  if (url.pathname.startsWith('/search') && url.searchParams.has('q')) {
    const searchQuery = url.searchParams.get('q');
    
    // 检查是否以@开头
    if (searchQuery.startsWith('@')) {
      const query = encodeURIComponent(searchQuery.substring(1));
      const gensparkUrl = `https://www.genspark.ai/search?query=${query}`;
      
      // 重定向到GenSpark搜索
      chrome.tabs.update(details.tabId, {
        url: gensparkUrl
      });
    }
  }
}, {
  url: [{
    // 匹配常见搜索引擎
    hostContains: '.google.',
    pathContains: '/search'
  }, {
    hostContains: '.bing.',
    pathContains: '/search'
  }]
}); 