document.addEventListener('DOMContentLoaded', function() {
    // 1. Calculate path to root
    const path = window.location.pathname;
    const htmlIndex = path.indexOf('/html/');
    let rootPath = '../../'; // Default fallback
    
    if (htmlIndex !== -1) {
        const afterHtml = path.substring(htmlIndex + 6); // +6 for '/html/'
        const segments = afterHtml.split('/').filter(s => s.length > 0);
        // If we are in html/subdir/file.html, segments is 2. We need ../../ to get to root.
        // If html/subdir/nested/file.html, segments is 3. We need ../../../
        rootPath = '../'.repeat(segments.length);
    }

    const sidebarNav = document.getElementById('layoutSidenav_nav');
    const layoutSidenav = document.getElementById('layoutSidenav');

    if (!layoutSidenav) {
        console.error('Layout Sidenav container not found.');
        return;
    }

    // If sidebarNav doesn't exist, create it
    let navElement = sidebarNav;
    if (!navElement) {
        navElement = document.createElement('div');
        navElement.id = 'layoutSidenav_nav';
        layoutSidenav.prepend(navElement);
    }

    // Define sidebar structure
    const sidebarContent = `
        <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div class="sb-sidenav-menu">
                <div class="nav">
                    <div class="sb-sidenav-menu-heading">Core</div>
                    
                    <!-- ABOUT PROJECT -->
                    <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseAbout" aria-expanded="false" aria-controls="collapseAbout" id="navAbout">
                        <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                        ABOUT PROJECT
                        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                    </a>
                    <div class="collapse" id="collapseAbout" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav class="sb-sidenav-menu-nested nav">
                            <a class="nav-link" href="${rootPath}html/about_project/layout-static_1.html">프로젝트 소개</a>
                            <a class="nav-link" href="${rootPath}html/about_project/layout-static_4.html">데이터</a>
                        </nav>
                    </div>

                    <!-- ANALYSIS -->
                    <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseAnalysis" aria-expanded="false" aria-controls="collapseAnalysis" id="navAnalysis">
                        <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                        ANALYSIS
                        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                    </a>
                    <div class="collapse" id="collapseAnalysis" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                        <nav class="sb-sidenav-menu-nested nav">
                            <a class="nav-link" href="${rootPath}html/analysis/research_layout_1.html">주요 분석 프로세스</a>
                            <a class="nav-link" href="${rootPath}html/analysis/research_layout_2.html">시각화 차트</a>
                        </nav>
                    </div>

                    <!-- DATA -->
                    <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseData" aria-expanded="false" aria-controls="collapseData" id="navData">
                        <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                        DATA
                        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                    </a>
                    <div class="collapse" id="collapseData" aria-labelledby="headingThree" data-bs-parent="#sidenavAccordion">
                        <nav class="sb-sidenav-menu-nested nav">
                            <a class="nav-link" href="${rootPath}html/data/analysis_1.html">국가별 데이터</a>
                            
                            <!-- Company Data Sub-menu -->
                            <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseCompany" aria-expanded="false" aria-controls="collapseCompany">
                                기업별 데이터
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                            <div class="collapse" id="collapseCompany" aria-labelledby="headingCompany" data-bs-parent="#collapseData"> <!-- Parent is collapseData -->
                                <nav class="sb-sidenav-menu-nested nav">
                                    <a class="nav-link" href="${rootPath}html/data/analysis_2.html">기업별 데이터 개요</a>
                                    <a class="nav-link" href="${rootPath}html/data/company/항공및우주기술.html"><i class="fas fa-plane"></i> &nbsp; 항공 및 우주기술</a>
                                    <a class="nav-link" href="${rootPath}html/data/company/해양방위및조선업.html"><i class="fas fa-ship"></i> &nbsp; 해양방위</a>
                                    <a class="nav-link" href="${rootPath}html/data/company/전자및시스템주요제품.html"><i class="fas fa-microchip"></i> &nbsp; 전자 및 시스템</a>
                                    <a class="nav-link" href="${rootPath}html/data/company/지상방위및무기시스템.html"><i class="fas fa-shield-alt"></i> &nbsp; 지상방위</a>
                                    <a class="nav-link" href="${rootPath}html/data/company/해외기업.html"><i class="fas fa-globe"></i> &nbsp; 해외기업</a>
                                </nav>
                            </div>

                            <a class="nav-link" href="${rootPath}html/data/analysis_3.html">국가별 비교 및 분석</a>
                        </nav>
                    </div>
                </div>
            </div>
            <div class="sb-sidenav-footer">
                <div class="small">Logged in as:</div>
                Start Bootstrap
            </div>
        </nav>
    `;

    navElement.innerHTML = sidebarContent;

    // Logic to handle top-level clicks (Navigate to first child)
    const navItems = [
        { id: 'navAbout', target: `${rootPath}html/about_project/layout-static_1.html`, section: 'about_project' },
        { id: 'navAnalysis', target: `${rootPath}html/analysis/research_layout_1.html`, section: 'analysis' },
        { id: 'navData', target: `${rootPath}html/data/analysis_1.html`, section: 'data' }
    ];

    navItems.forEach(item => {
        const el = document.getElementById(item.id);
        if (el) {
            el.addEventListener('click', function(e) {
                // Check if we are currently in this section
                const isCurrentSection = path.includes('/' + item.section + '/');
                
                if (!isCurrentSection) {
                     window.location.href = item.target;
                }
                // If it IS the current section, Bootstrap's collapse.js handles the toggle.
            });
        }
    });

    // Highlight current page and expand section
    const links = document.querySelectorAll('.sb-sidenav-menu-nested .nav-link');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        // Normalize paths for comparison
        // Current path: /html/data/company/file.html
        // Link href: ../../html/data/company/file.html (resolved by browser usually, but here it's a string)
        
        // We can compare the end of the path
        // Remove ../ from href
        const cleanHref = href.replace(/^(\.\.\/)+/, '');
        // Clean path: remove leading slash if present
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        
        // Check if cleanPath ends with cleanHref. 
        // Example: cleanPath="html/data/analysis_1.html", cleanHref="html/data/analysis_1.html" -> Match
        
        // However, we need to be careful about partial matches.
        // Let's try to match the filename and the parent folder.
        
        const hrefParts = cleanHref.split('/');
        const pathParts = cleanPath.split('/');
        
        const hrefFile = hrefParts.pop();
        const pathFile = pathParts.pop();
        
        if (hrefFile === pathFile) {
             // Check parent folder if available
             const hrefFolder = hrefParts.pop();
             const pathFolder = pathParts.pop();
             
             if (!hrefFolder || hrefFolder === pathFolder) {
                link.classList.add('active');
                
                // Expand parent(s)
                // We might have nested collapses (e.g. Company Data)
                let parentCollapse = link.closest('.collapse');
                while (parentCollapse) {
                    parentCollapse.classList.add('show');
                    const trigger = document.querySelector(`[data-bs-target="#${parentCollapse.id}"]`);
                    if (trigger) {
                        trigger.classList.remove('collapsed');
                        trigger.setAttribute('aria-expanded', 'true');
                    }
                    // Look for further parents
                    parentCollapse = parentCollapse.parentElement.closest('.collapse');
                }
             }
        }
    });
});
