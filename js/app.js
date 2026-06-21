var pageFiles = {
    'critical-thinking':           'strategy/critical-thinking.md',
    'product-roadmap':             'strategy/product-roadmap.md',
    'data-driven-decisions':       'data-metrics/data-driven-decisions.md',
    'key-results':                 'data-metrics/key-results.md',
    'performance-indicators':      'data-metrics/performance-indicators.md',
    'ab-testing':                  'data-metrics/ab-testing.md',
    'product-kpis-case-study':     'data-metrics/product-kpis-case-study.md',
    'analytics-structure':         'data-metrics/analytics-structure.md',
    'funnel':                      'data-metrics/funnel.md',
    'generative-ai-for-pms':       'ai/foundations/generative-ai-for-pms.md',
    'ai-biases-critical-thinking': 'ai/foundations/ai-biases-critical-thinking.md',
    'ai-agents':                   'ai/agents/ai-agents.md',
    'prompt-anatomy':              'ai/agents/prompt-anatomy.md',
    'ai-tools-end-to-end':         'ai/tools-and-workflows/ai-tools-end-to-end.md',
    'n8n':                         'ai/tools-and-workflows/N8N.md',
    'rag':                         'ai/tools-and-workflows/rag.md',
    'rag-in-practice':             'ai/tools-and-workflows/rag-in-practice.md',
    'claude-building-blocks':      'ai/claude/claude-building-blocks.md',
    'project-layer':               'ai/claude/project_layer.md',
    'prompt-injection':            'ai/claude/prompt_injection.md',
    'claude-commands':             'ai/claude/commands.md',
    'what-is-an-api':              'technical/what-is-an-api.md',
    'hiring-manager-prompts':      'interviews/hiring-manager-prompts.md',
    'case-interview-guide':        'interviews/case-interview-guide.md',
    'product-podcasts':            'resources/product-podcasts.md',
    'ai-assisted-pb':              'product-case/ai-assisted-pb.md'
};

var htmlPages = {
    'ai-os-builder':    'ai/claude/ai-os-builder.html',
    'project-structure':'ai/claude/project-structure.html',
    'building-projects':'ai/claude/configuration-layers.html'
};

var htmlPageTitles = {
    'ai-os-builder':    'AI OS Builder',
    'project-structure':'Project Folder Structure',
    'building-projects':'Configuration Layers'
};

var pageCache = {};
var searchIndex = {};
var currentPage = 'home';

// --- Rendering ---

function renderMarkdown(content) {
    var html = marked.parse(content);
    html = DOMPurify.sanitize(html);
    return html.replace(/<a href=/g, '<a target="_blank" rel="noopener noreferrer" href=');
}

// --- Navigation ---

function showHome() {
    currentPage = 'home';
    document.getElementById('homeContent').style.display = 'grid';
    document.getElementById('contentMarkdown').style.display = 'none';
    document.getElementById('contentIframe').style.display = 'none';
    document.getElementById('pageTitle').textContent = 'Learn About Product';
    updateActiveNav('home');
    if (window.innerWidth <= 768) closeSidebar();
}

function showHtmlPage(pageKey) {
    if (!htmlPages[pageKey]) return;
    currentPage = pageKey;
    document.getElementById('homeContent').style.display = 'none';
    document.getElementById('contentMarkdown').style.display = 'none';
    var iframe = document.getElementById('contentIframe');
    iframe.src = htmlPages[pageKey];
    iframe.style.display = 'block';
    document.getElementById('pageTitle').textContent = htmlPageTitles[pageKey] || pageKey;
    updateActiveNav(pageKey);
    if (window.innerWidth <= 768) closeSidebar();
}

function showPage(pageKey) {
    if (!pageFiles[pageKey]) return;

    if (pageCache[pageKey]) {
        displayPage(pageKey, pageCache[pageKey]);
        return;
    }

    fetch(pageFiles[pageKey])
        .then(function(r) {
            if (!r.ok) throw new Error('Not found');
            return r.text();
        })
        .then(function(content) {
            pageCache[pageKey] = content;
            indexPage(pageKey, content);
            displayPage(pageKey, content);
        })
        .catch(function() {
            document.getElementById('homeContent').style.display = 'none';
            document.getElementById('contentMarkdown').style.display = 'block';
            document.getElementById('contentMarkdown').innerHTML = '<p style="color:#6b7280;padding:20px">Page not found.</p>';
        });
}

function displayPage(pageKey, content) {
    currentPage = pageKey;
    document.getElementById('homeContent').style.display = 'none';
    document.getElementById('contentIframe').style.display = 'none';
    var contentDiv = document.getElementById('contentMarkdown');
    contentDiv.style.display = 'block';
    contentDiv.innerHTML = renderMarkdown(content);

    var wordCount = content.replace(/[#*`>\[\]_~]/g, '').split(/\s+/).filter(function(w) { return w.length > 0; }).length;
    var readingTime = Math.max(1, Math.ceil(wordCount / 200));
    var meta = document.createElement('div');
    meta.className = 'page-meta';
    meta.textContent = readingTime + ' min read';
    contentDiv.insertBefore(meta, contentDiv.firstChild);

    var titleMatch = content.match(/^# (.+)$/m);
    document.getElementById('pageTitle').textContent = titleMatch ? titleMatch[1] : pageKey;
    updateActiveNav(pageKey);
    document.getElementById('contentArea').scrollTop = 0;
    if (window.innerWidth <= 768) closeSidebar();
}

// --- Indexing ---

function indexPage(pageKey, content) {
    var words = content.toLowerCase().split(/\s+/);
    for (var i = 0; i < words.length; i++) {
        var word = words[i].replace(/[^a-z0-9]/g, '');
        if (word.length > 2) {
            if (!searchIndex[word]) searchIndex[word] = [];
            if (searchIndex[word].indexOf(pageKey) === -1) searchIndex[word].push(pageKey);
        }
    }
}

function prefetchAll() {
    var keys = Object.keys(pageFiles);
    keys.forEach(function(key) {
        if (!pageCache[key]) {
            fetch(pageFiles[key])
                .then(function(r) { return r.ok ? r.text() : null; })
                .then(function(content) {
                    if (content) {
                        pageCache[key] = content;
                        indexPage(key, content);
                    }
                })
                .catch(function() {});
        }
    });
}

// --- Sidebar ---

function toggleGroup(groupId) {
    var body = document.getElementById(groupId + '-body');
    var arrow = document.getElementById(groupId + '-arrow');
    if (body.classList.contains('collapsed')) {
        body.classList.remove('collapsed');
        arrow.classList.remove('collapsed');
    } else {
        body.classList.add('collapsed');
        arrow.classList.add('collapsed');
    }
}

function updateActiveNav(pageKey) {
    var items = document.querySelectorAll('.nav-item');
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('active');
        if (items[i].getAttribute('data-page') === pageKey) {
            items[i].classList.add('active');
            var el = items[i].parentElement;
            while (el) {
                if (el.classList && el.classList.contains('nav-group-body') && el.classList.contains('collapsed')) {
                    toggleGroup(el.id.replace('-body', ''));
                }
                el = el.parentElement;
            }
        }
    }
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
}

// --- Search ---

function showResults(pageKeys) {
    var container = document.getElementById('searchResults');
    container.innerHTML = '';
    if (!pageKeys.length) { container.classList.remove('show'); return; }
    for (var j = 0; j < pageKeys.length; j++) {
        (function(pk) {
            var content = pageCache[pk] || pk;
            var firstLine = content.split('\n')[0].replace('# ', '');
            var item = document.createElement('div');
            item.className = 'search-result-item';
            item.textContent = firstLine;
            item.onclick = function() {
                showPage(pk);
                container.classList.remove('show');
                document.getElementById('searchInput').value = '';
            };
            container.appendChild(item);
        })(pageKeys[j]);
    }
    container.classList.add('show');
}

function runKeywordSearch(query) {
    var lowerQuery = query.toLowerCase();
    var results = {};
    for (var word in searchIndex) {
        if (word.indexOf(lowerQuery) !== -1) {
            var pages = searchIndex[word];
            for (var i = 0; i < pages.length; i++) {
                if (!results[pages[i]]) results[pages[i]] = 0;
                results[pages[i]]++;
            }
        }
    }
    var sortedPages = Object.keys(results).sort(function(a, b) {
        return results[b] - results[a];
    }).slice(0, 5);
    showResults(sortedPages);
}

function performSearch(query) {
    if (!query || query.length < 2) {
        document.getElementById('searchResults').classList.remove('show');
        return;
    }

    if (window.ragSearch) {
        window.ragSearch(query).then(function(results) {
            if (results.length > 0) {
                showResults(results.map(function(r) { return r.pageKey; }));
            } else {
                runKeywordSearch(query);
            }
        });
        return;
    }

    runKeywordSearch(query);
}

// --- Init ---

document.addEventListener('DOMContentLoaded', function() {
    prefetchAll();

    document.getElementById('searchInput').addEventListener('input', function(e) {
        performSearch(e.target.value);
    });
    document.getElementById('searchInput').addEventListener('blur', function() {
        setTimeout(function() {
            document.getElementById('searchResults').classList.remove('show');
        }, 200);
    });
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-box')) {
            document.getElementById('searchResults').classList.remove('show');
        }
    });
});
