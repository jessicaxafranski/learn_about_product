var pageFiles = {
    'critical-thinking':           'strategy/critical-thinking.md',
    'product-roadmap':             'strategy/product-roadmap.md',
    'gtm-strategy':                'strategy/gtm-strategy.md',
    'product-discovery':           'product-discovery/product-discovery.md',
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
    'api-restful':                 'technical/API-restful.md',
    'api-metrics':                 'technical/API-metrics.md',
    'hiring-manager-prompts':      'interviews/hiring-manager-prompts.md',
    'case-interview-guide':        'interviews/case-interview-guide.md',
    'product-podcasts':            'resources/product-podcasts.md',
    'ai-assisted-pb':              'product-case/ai-assisted-pb.md',
    'compliance-rag-case':         'product-case/compliance-rag-case.md'
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

var breadcrumbMap = {
    'critical-thinking':           ['Product Strategy', 'Critical Thinking'],
    'product-roadmap':             ['Product Strategy', 'Building a Product Roadmap'],
    'gtm-strategy':                ['Product Strategy', 'GTM Strategy'],
    'product-discovery':           ['Product Discovery', 'Product Discovery'],
    'data-driven-decisions':       ['Data & Metrics', 'Why Data-Driven?'],
    'performance-indicators':      ['Data & Metrics', 'Performance Indicators'],
    'key-results':                 ['Data & Metrics', 'How to Create KRs'],
    'ab-testing':                  ['Data & Metrics', 'A/B Testing'],
    'funnel':                      ['Data & Metrics', 'Conversion Funnel'],
    'product-kpis-case-study':     ['Data & Metrics', 'Case Study: RandoSando'],
    'analytics-structure':         ['Data & Metrics', 'Analytics Structure'],
    'generative-ai-for-pms':       ['Artificial Intelligence', 'Foundations', 'Generative AI for PMs'],
    'ai-biases-critical-thinking': ['Artificial Intelligence', 'Foundations', 'AI Biases & Critical Thinking'],
    'ai-agents':                   ['Artificial Intelligence', 'Foundations', 'AI Agents'],
    'prompt-anatomy':              ['Artificial Intelligence', 'Foundations', 'Prompt Anatomy'],
    'ai-tools-end-to-end':         ['Artificial Intelligence', 'In Practice', 'AI Tools End-to-End'],
    'n8n':                         ['Artificial Intelligence', 'In Practice', 'N8N Workflow'],
    'rag':                         ['Artificial Intelligence', 'In Practice', 'RAG'],
    'rag-in-practice':             ['Artificial Intelligence', 'In Practice', 'RAG in Practice'],
    'project-layer':               ['Artificial Intelligence', 'In Practice', 'AI Across the Product Lifecycle'],
    'ai-assisted-pb':              ['Artificial Intelligence', 'In Practice', 'AI-Assisted Product Builder'],
    'compliance-rag-case':         ['Artificial Intelligence', 'In Practice', 'Case: RAG for Compliance'],
    'claude-building-blocks':      ['Artificial Intelligence', 'Claude Code', 'Building Blocks'],
    'building-projects':           ['Artificial Intelligence', 'Claude Code', 'Configuration Layers'],
    'project-structure':           ['Artificial Intelligence', 'Claude Code', 'Project Structure'],
    'prompt-injection':            ['Artificial Intelligence', 'Claude Code', 'Prompt Injection'],
    'claude-commands':             ['Artificial Intelligence', 'Claude Code', 'Commands'],
    'ai-os-builder':               ['Artificial Intelligence', 'Claude Code', 'AI OS Builder'],
    'what-is-an-api':              ['Technical', 'What Is an API?'],
    'api-restful':                 ['Technical', 'RESTful APIs'],
    'api-metrics':                 ['Technical', 'API Metrics'],
    'hiring-manager-prompts':      ['Interviews', 'Hiring Manager Prompts'],
    'case-interview-guide':        ['Interviews', 'Case Interview Guide'],
    'product-podcasts':            ['Resources', 'Product Podcasts'],
};

function buildBreadcrumb(pageKey) {
    var nav = document.getElementById('breadcrumbNav');
    var path = breadcrumbMap[pageKey];
    if (!path) { nav.style.display = 'none'; return; }

    nav.innerHTML = '';
    nav.style.display = 'flex';

    var home = document.createElement('span');
    home.className = 'breadcrumb-item';
    home.textContent = 'Home';
    home.onclick = showHome;
    nav.appendChild(home);

    for (var i = 0; i < path.length; i++) {
        var sep = document.createElement('span');
        sep.className = 'breadcrumb-sep';
        sep.textContent = '/';
        nav.appendChild(sep);

        var item = document.createElement('span');
        var isLast = i === path.length - 1;
        item.className = isLast ? 'breadcrumb-current' : 'breadcrumb-item';
        item.textContent = path[i];
        nav.appendChild(item);
    }
}

var pageCache = {};
var searchIndex = {};
var currentPage = 'home';

// --- Rendering ---

function renderMarkdown(content) {
    var html = marked.parse(content);
    html = DOMPurify.sanitize(html);
    return html.replace(/<a href=/g, '<a target="_blank" rel="noopener noreferrer" href=');
}

function wrapTables(container) {
    var tables = container.querySelectorAll('table');
    tables.forEach(function(table) {
        var wrap = document.createElement('div');
        wrap.className = 'table-scroll';
        table.parentNode.insertBefore(wrap, table);
        wrap.appendChild(table);
    });
}

// --- Navigation ---

function showHome() {
    currentPage = 'home';
    document.getElementById('homeContent').style.display = 'grid';
    document.getElementById('pageWrapper').style.display = 'none';
    document.getElementById('contentIframe').style.display = 'none';
    document.getElementById('breadcrumbNav').style.display = 'none';
    document.getElementById('pageTitle').textContent = 'Learn About Product';
    updateActiveNav(null);
    if (window.innerWidth <= 768) closeSidebar();
}

function showHtmlPage(pageKey) {
    if (!htmlPages[pageKey]) return;
    currentPage = pageKey;
    document.getElementById('homeContent').style.display = 'none';
    document.getElementById('pageWrapper').style.display = 'none';
    document.getElementById('breadcrumbNav').style.display = 'none';
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
            document.getElementById('pageWrapper').style.display = 'flex';
            document.getElementById('contentMarkdown').innerHTML = '<p style="color:#6b7280;padding:20px">Page not found.</p>';
            document.getElementById('tocPanel').style.display = 'none';
        });
}

function displayPage(pageKey, content) {
    currentPage = pageKey;
    document.getElementById('homeContent').style.display = 'none';
    document.getElementById('contentIframe').style.display = 'none';
    document.getElementById('pageWrapper').style.display = 'flex';
    buildBreadcrumb(pageKey);

    var contentDiv = document.getElementById('contentMarkdown');
    contentDiv.innerHTML = renderMarkdown(content);
    wrapTables(contentDiv);

    var wordCount = content.replace(/[#*`>\[\]_~]/g, '').split(/\s+/).filter(function(w) { return w.length > 0; }).length;
    var readingTime = Math.max(1, Math.ceil(wordCount / 200));
    var meta = document.createElement('div');
    meta.className = 'page-meta';
    meta.textContent = readingTime + ' min read';
    contentDiv.insertBefore(meta, contentDiv.firstChild);

    var toc = document.getElementById('tocPanel');
    var headings = contentDiv.querySelectorAll('h2');
    if (headings.length > 1) {
        toc.innerHTML = '<div class="toc-title">On this page</div>';
        headings.forEach(function(h, i) {
            h.id = 'section-' + i;
            var link = document.createElement('a');
            link.className = 'toc-item';
            link.textContent = h.textContent;
            link.onclick = function(e) {
                e.preventDefault();
                var container = document.getElementById('contentArea');
                var top = h.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop - 20;
                container.scrollTo({ top: top, behavior: 'smooth' });
            };
            toc.appendChild(link);
        });
        toc.style.display = 'block';
    } else {
        toc.style.display = 'none';
    }

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
        if (!e.target.closest('.header-search-wrap')) {
            document.getElementById('searchResults').classList.remove('show');
        }
    });
});
