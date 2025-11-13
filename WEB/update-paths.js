// Path Update Script for Project Reorganization
const fs = require('fs');
const path = require('path');

// 경로 매핑 정의
const pathMappings = {
    // 데이터 파일 경로
    'data/arms_exports_data.json': 'assets/data/core/arms-exports.json',
    'data/arms_import_data.json': 'assets/data/core/arms-imports.json',
    'data/Economy_data.json': 'assets/data/core/economy.json',
    'data/governance_data.json': 'assets/data/core/governance.json',
    'data/military_expenses_data.json': 'assets/data/core/military-expenses.json',
    'data/R&D_Data.json': 'assets/data/core/research-development.json',
    'data/weapon_system_Data.json': 'assets/data/core/weapon-systems.json',
    'data/weapon_import.json': 'assets/data/core/weapon-imports.json',
    'data/나라별지형_with_coordinates.json': 'assets/data/core/country-terrain.json',

    // 분쟁 데이터
    'data/UCDP_data.json': 'assets/data/conflicts/ucdp-main.json',
    'data/UCDP_GED_2023_data.json': 'assets/data/conflicts/ucdp-ged-2023.json',
    'data/UCDP_WORLD_2023_data.json': 'assets/data/conflicts/ucdp-world-2023.json',

    // 군집 데이터
    'data/군집1/': 'assets/data/companies/clusters/cluster-1/',
    'data/군집2/': 'assets/data/companies/clusters/cluster-2/',
    'data/군집3/': 'assets/data/companies/clusters/cluster-3/',
    'data/군집4/': 'assets/data/companies/clusters/cluster-4/',
    'data/군집5/독일/': 'assets/data/companies/clusters/cluster-5/germany/',
    'data/군집5/미국/': 'assets/data/companies/clusters/cluster-5/usa/',
    'data/군집5/영국/': 'assets/data/companies/clusters/cluster-5/uk/',
    'data/군집5/중국/': 'assets/data/companies/clusters/cluster-5/china/',
    'data/군집5/프랑스/': 'assets/data/companies/clusters/cluster-5/france/',

    // 이미지 경로
    'data/logo.png': 'assets/images/logos/dmz-logo.png',
    'data/free-icon-csv-file-11471469.png': 'assets/images/icons/csv-icon.png',
    'data/free-icon-excel-document-12583548.png': 'assets/images/icons/excel-icon.png',
    'data/free-icon-pdf-337946.png': 'assets/images/icons/pdf-icon.png',
    'data/free-icon-zip-354755.png': 'assets/images/icons/zip-icon.png',
    'data/군인사진.png': 'assets/images/photos/military-personnel.png',
    'data/탱크사진.png': 'assets/images/photos/tank-1.png',
    'data/탱크사진1.png': 'assets/images/photos/tank-2.png',
    'data/프로젝트배경.png': 'assets/images/photos/project-background.png',
    'data/기대효과.png': 'assets/images/diagrams/expected-effects.png',
    'data/다이어그램.png': 'assets/images/diagrams/project-diagram.png',
    'data/주요분석결과page_시각화사진.png': 'assets/images/diagrams/analysis-visualization.png',
    'data/Graphs/GDP Graphs/': 'assets/images/graphs/gdp/',
    'data/Graphs/Governance Graphs/': 'assets/images/graphs/governance/',
    'data/Graphs/Import Graphs/': 'assets/images/graphs/imports/',
    'data/Graphs/Top 20 Countries by Categories/': 'assets/images/graphs/top20/',

    // CSS 경로
    'css/main_css.css': 'styles/pages/main.css',
    'css/styles.css': 'styles/pages/dashboard.css',
    'css/layout.css': 'styles/base/layout.css',
    'css/research_layout_2.css': 'styles/pages/research.css',
    'css/company_news.css': 'styles/pages/company-news.css',

    // JS 경로 (features)
    'js/common.js': 'scripts/core/common.js',
    'js/scripts.js': 'scripts/core/main.js',
    'js/map.js': 'scripts/features/map/map.js',
    'js/navigateCountry.js': 'scripts/features/map/navigation.js',
    'js/Company_chart.js': 'scripts/features/visualization/charts/company-charts.js',
    'js/Economy_data.js': 'scripts/features/visualization/charts/economy-charts.js',
    'js/governance_chart.js': 'scripts/features/visualization/charts/governance-charts.js',
    'js/military_expend.js': 'scripts/features/visualization/charts/military-charts.js',
    'js/arms_trade_data.js': 'scripts/features/visualization/charts/arms-trade-charts.js',
    'js/weapon_system_pie.js': 'scripts/features/visualization/charts/weapon-charts.js',
    'js/governance_radar.js': 'scripts/features/visualization/radar/governance-radar.js',
    'js/datatables-simple-demo.js': 'scripts/features/data-tables/datatables-demo.js',
    'js/datatables_withcharts.js': 'scripts/features/data-tables/datatables-with-charts.js',
    'js/interactivePopup.js': 'scripts/features/ui/popup.js',
    'js/hoverSync.js': 'scripts/features/ui/hover-sync.js',
    'js/dropdownUrlHandler.js': 'scripts/features/ui/dropdown-handler.js',
    'js/search.js': 'scripts/features/ui/search.js',
    'js/R&D_Data.js': 'scripts/features/data/rd-data.js',
    'js/company_news.js': 'scripts/features/data/company-news.js',
    'js/analysis.js': 'scripts/utils/analysis.js',
    'js/detail.js': 'scripts/utils/detail.js',
    'js/research_layout_2.js': 'scripts/utils/research-layout.js',

    // HTML 경로
    'dash.html': 'pages/dashboard.html',
    'html/about_project/layout-static_1.html': 'pages/about/introduction.html',
    'html/about_project/layout-static_4.html': 'pages/about/data-overview.html',
    'html/analysis/research_layout_1.html': 'pages/analysis/research-process.html',
    'html/analysis/research_layout_2.html': 'pages/analysis/visualizations.html',
    'html/analysis/research_layout_2_demo.html': 'pages/analysis/demo.html',
    'html/data/analysis_1.html': 'pages/data/country-data.html',
    'html/data/analysis_2.html': 'pages/data/company-data.html',
    'html/data/analysis_3.html': 'pages/data/comparison.html',
    'html/data/company/항공및우주기술.html': 'pages/data/companies/aviation-space.html',
    'html/data/company/지상방위및무기시스템.html': 'pages/data/companies/ground-defense.html',
    'html/data/company/해양방위및조선업.html': 'pages/data/companies/naval-defense.html',
    'html/data/company/전자및시스템주요제품.html': 'pages/data/companies/electronics-systems.html',
    'html/data/company/해외기업.html': 'pages/data/companies/foreign-companies.html',
    'html/data/company/군집html/군집1.html': 'pages/data/clusters/cluster-1.html',
    'html/data/company/군집html/군집2.html': 'pages/data/clusters/cluster-2.html',
    'html/data/company/군집html/군집3.html': 'pages/data/clusters/cluster-3.html',
    'html/data/company/군집html/군집4.html': 'pages/data/clusters/cluster-4.html',
    'html/map/': 'pages/maps/',
};

console.log('Path Update Script - Project Reorganization');
console.log('============================================\n');
console.log('This script will update all path references in the reorganized project.');
console.log('Mappings defined:', Object.keys(pathMappings).length);
console.log('\nNote: This is a reference script. Actual updates should be done carefully.\n');
