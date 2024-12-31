// 监听URL变化
let lastQuery = '';

function checkForSearch() {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  const query = searchParams.get('q') || '';
  
  if (query.startsWith('@') && query !== lastQuery) {
    lastQuery = query;
    const searchQuery = query.substring(1);
    
    // 重定向到Genspark搜索
    window.location.href = `https://www.genspark.ai/search?query=${encodeURIComponent(searchQuery)}`;
  }
}

// 监听URL变化
const observer = new MutationObserver(checkForSearch);
observer.observe(document.querySelector('title'), { subtree: true, characterData: true, childList: true });

// 初始检查
checkForSearch(); 