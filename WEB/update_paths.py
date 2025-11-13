#!/usr/bin/env python3
"""
Script to update all path references in HTML files according to the new structure
"""
import os
import re
from pathlib import Path

# Base directory
BASE_DIR = Path(r"d:\Study\Github\Global Defense Export Analysis Project\WEB\src\pages")

# Define replacements for different directory levels
REPLACEMENTS = {
    # Root level files (1 level up to get to src/)
    "root": {
        'href="css/main_css.css"': 'href="../styles/pages/main.css"',
        'href="css/styles.css"': 'href="../styles/pages/dashboard.css"',
        'href="css/layout.css"': 'href="../styles/base/layout.css"',
        'src="js/scripts.js"': 'src="../scripts/core/main.js"',
        'src="js/common.js"': 'src="../scripts/core/common.js"',
        'src="js/search.js"': 'src="../scripts/features/search/search.js"',
        'src="js/interactivePopup.js"': 'src="../scripts/features/popup/interactivePopup.js"',
        'src="js/navigateCountry.js"': 'src="../scripts/features/navigation/navigateCountry.js"',
        'src="js/datatables-simple-demo.js"': 'src="../scripts/features/datatables/datatables-simple-demo.js"',
        'src="js/map.js"': 'src="../scripts/features/map/map.js"',
        'src="assets/demo/': 'src="../assets/demo/',
        'href="dash.html"': 'href="dashboard.html"',
        'src="data/logo.png"': 'src="../assets/images/logos/dmz-logo.png"',
        'src="/WEB/web-layout/data/logo.png"': 'src="../assets/images/logos/dmz-logo.png"',
    },
    # 2 levels deep (about/, analysis/, data/, maps/)
    "level2": {
        'href="/WEB/web-layout/css/layout.css"': 'href="../../styles/base/layout.css"',
        'href="/WEB/web-layout/css/styles.css"': 'href="../../styles/pages/dashboard.css"',
        'href="/WEB/web-layout/css/main_css.css"': 'href="../../styles/pages/main.css"',
        'href="/WEB/web-layout/css/company_news.css"': 'href="../../styles/pages/company_news.css"',
        'href="/WEB/web-layout/css/research_layout_2.css"': 'href="../../styles/pages/research_layout_2.css"',
        'href="../../css/layout.css"': 'href="../../styles/base/layout.css"',
        'href="../../css/styles.css"': 'href="../../styles/pages/dashboard.css"',
        'src="/WEB/web-layout/js/': 'src="../../scripts/',
        'src="../../js/scripts.js"': 'src="../../scripts/core/main.js"',
        'src="../../js/common.js"': 'src="../../scripts/core/common.js"',
        'src="../../js/detail.js"': 'src="../../scripts/features/details/detail.js"',
        'src="../../js/datatables-simple-demo.js"': 'src="../../scripts/features/datatables/datatables-simple-demo.js"',
        'src="/WEB/web-layout/data/logo.png"': 'src="../../assets/images/logos/dmz-logo.png"',
        'src="../../data/logo.png"': 'src="../../assets/images/logos/dmz-logo.png"',
        'src="/WEB/web-layout/data/free-icon-pdf-337946.png"': 'src="../../assets/images/icons/free-icon-pdf-337946.png"',
        'src="/WEB/web-layout/data/free-icon-csv-file-11471469.png"': 'src="../../assets/images/icons/free-icon-csv-file-11471469.png"',
        'src="../../data/': 'src="../../assets/data/',
        'href="/WEB/web-layout/index.html"': 'href="../index.html"',
        'href="../../index.html"': 'href="../index.html"',
        'href="/WEB/web-layout/html/about_project/layout-static_1.html"': 'href="../about/introduction.html"',
        'href="/WEB/web-layout/html/about_project/layout-static_4.html"': 'href="../about/data-overview.html"',
        'href="/WEB/web-layout/html/data/analysis_1.html"': 'href="../data/country-data.html"',
        'href="/WEB/web-layout/html/data/analysis_2.html"': 'href="../data/company-data.html"',
        'href="/WEB/web-layout/html/data/analysis_3.html"': 'href="../data/comparison.html"',
        'href="/WEB/web-layout/html/analysis/research_layout_1.html"': 'href="../analysis/research-process.html"',
        'href="/WEB/web-layout/html/analysis/research_layout_2.html"': 'href="../analysis/visualizations.html"',
        # Company page navigation links (in data/ level)
        'href="/WEB/web-layout/html/data/company/항공및우주기술.html"': 'href="companies/aviation-space.html"',
        'href="/WEB/web-layout/html/data/company/해양방위및조선업.html"': 'href="companies/naval-defense.html"',
        'href="/WEB/web-layout/html/data/company/전자및시스템주요제품.html"': 'href="companies/electronics-systems.html"',
        'href="/WEB/web-layout/html/data/company/지상방위및무기시스템.html"': 'href="companies/ground-defense.html"',
        'href="/WEB/web-layout/html/data/company/해외기업.html"': 'href="companies/foreign-companies.html"',
        # JSON data files
        'src="/WEB/web-layout/data/나라별지형_with_coordinates.json"': 'src="../../assets/data/geo/나라별지형_with_coordinates.json"',
        'src="/WEB/web-layout/data/R&D_Data.js"': 'src="../../assets/data/rd/R&D_Data.js"',
        "'/WEB/web-layout/data/나라별지형_with_coordinates.json'": "'../../assets/data/geo/나라별지형_with_coordinates.json'",
        "'/WEB/web-layout/data/R&D_Data.json'": "'../../assets/data/rd/R&D_Data.json'",
    },
    # 3 levels deep (data/companies/, data/clusters/)
    "level3": {
        'href="/WEB/web-layout/css/layout.css"': 'href="../../../styles/base/layout.css"',
        'href="/WEB/web-layout/css/main_css.css"': 'href="../../../styles/pages/main.css"',
        'href="/WEB/web-layout/css/company_news.css"': 'href="../../../styles/pages/company_news.css"',
        'href="../../../css/layout.css"': 'href="../../../styles/base/layout.css"',
        'href="../../../css/styles.css"': 'href="../../../styles/pages/dashboard.css"',
        'src="/WEB/web-layout/js/': 'src="../../../scripts/',
        'src="../../../js/scripts.js"': 'src="../../../scripts/core/main.js"',
        'src="../../../js/common.js"': 'src="../../../scripts/core/common.js"',
        'src="/WEB/web-layout/data/logo.png"': 'src="../../../assets/images/logos/dmz-logo.png"',
        'src="../../../data/logo.png"': 'src="../../../assets/images/logos/dmz-logo.png"',
        'src="../../../data/': 'src="../../../assets/data/',
        'href="/WEB/web-layout/index.html"': 'href="../../index.html"',
        'href="../../../index.html"': 'href="../../index.html"',
        # Navigation links
        'href="/WEB/web-layout/html/data/analysis_1.html"': 'href="../country-data.html"',
        'href="/WEB/web-layout/html/data/analysis_2.html"': 'href="../company-data.html"',
        'href="/WEB/web-layout/html/data/analysis_3.html"': 'href="../comparison.html"',
        'href="/WEB/web-layout/html/data/company/항공및우주기술.html"': 'href="aviation-space.html"',
        'href="/WEB/web-layout/html/data/company/해양방위및조선업.html"': 'href="naval-defense.html"',
        'href="/WEB/web-layout/html/data/company/전자및시스템주요제품.html"': 'href="electronics-systems.html"',
        'href="/WEB/web-layout/html/data/company/지상방위및무기시스템.html"': 'href="ground-defense.html"',
        'href="/WEB/web-layout/html/data/company/해외기업.html"': 'href="foreign-companies.html"',
        # Cluster iframes
        'src="/WEB/web-layout/html/data/company/군집html/군집1.html"': 'src="../clusters/cluster-1.html"',
        'src="/WEB/web-layout/html/data/company/군집html/군집2.html"': 'src="../clusters/cluster-2.html"',
        'src="/WEB/web-layout/html/data/company/군집html/군집3.html"': 'src="../clusters/cluster-3.html"',
        'src="/WEB/web-layout/html/data/company/군집html/군집4.html"': 'src="../clusters/cluster-4.html"',
        # jQuery load paths
        '"/WEB/web-layout/html/data/company/군집html/군집1.html"': '"../clusters/cluster-1.html"',
        '"/WEB/web-layout/html/data/company/군집html/군집2.html"': '"../clusters/cluster-2.html"',
        '"/WEB/web-layout/html/data/company/군집html/군집3.html"': '"../clusters/cluster-3.html"',
        '"/WEB/web-layout/html/data/company/군집html/군집4.html"': '"../clusters/cluster-4.html"',
        # JSON data paths
        '"/WEB/web-layout/data/군집1/': '"../../../assets/data/clusters/군집1/',
        '"/WEB/web-layout/data/군집2/': '"../../../assets/data/clusters/군집2/',
        '"/WEB/web-layout/data/군집3/': '"../../../assets/data/clusters/군집3/',
        '"/WEB/web-layout/data/군집4/': '"../../../assets/data/clusters/군집4/',
        '"/WEB/web-layout/data/군집5/': '"../../../assets/data/clusters/군집5/',
    }
}

def update_html_file(filepath, level):
    """Update path references in a single HTML file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        replacements = REPLACEMENTS.get(level, {})

        # Apply replacements
        for old, new in replacements.items():
            content = content.replace(old, new)

        # Additional pattern-based replacements for images
        if level == "level2":
            # Replace image paths
            content = re.sub(r'src="/WEB/web-layout/data/([^"]+\.png)"', r'src="../../assets/images/content/\1"', content)
            content = re.sub(r'src="/WEB/web-layout/data/([^"]+\.pdf)"', r'src="../../assets/data/documents/\1"', content)
            content = re.sub(r'href="/WEB/web-layout/data/([^"]+\.pdf)"', r'href="../../assets/data/documents/\1"', content)

        # Write back if changed
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

def process_directory(directory, level, pattern="*.html"):
    """Process all HTML files in a directory"""
    updated_count = 0
    dir_path = BASE_DIR / directory

    if not dir_path.exists():
        print(f"Directory not found: {dir_path}")
        return 0

    files = list(dir_path.glob(pattern))
    print(f"\nProcessing {len(files)} files in {directory}/")

    for filepath in files:
        if update_html_file(filepath, level):
            updated_count += 1
            print(f"  ✓ Updated: {filepath.name}")
        else:
            print(f"  - No changes: {filepath.name}")

    return updated_count

def main():
    print("=" * 70)
    print("HTML Path Update Script")
    print("=" * 70)

    total_updated = 0

    # Process analysis/ directory (level 2)
    total_updated += process_directory("analysis", "level2")

    # Process data/ directory (level 2)
    total_updated += process_directory("data", "level2")

    # Process data/companies/ directory (level 3)
    total_updated += process_directory("data/companies", "level3")

    # Process data/clusters/ directory (level 3)
    total_updated += process_directory("data/clusters", "level3")

    # Process maps/ directory (level 2)
    total_updated += process_directory("maps", "level2")

    print("\n" + "=" * 70)
    print(f"Total files updated: {total_updated}")
    print("=" * 70)

if __name__ == "__main__":
    main()
