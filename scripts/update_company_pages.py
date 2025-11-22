#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to update company HTML pages with company selector and pie chart
"""

import os
import re

# Configuration for each cluster
clusters = {
    '해양방위및조선업.html': {
        'cluster': '군집2',
        'title': '해양방위 및 조선',
        'files': [
            "'../../../assets/data/companies/군집2/해양방위및조선업_1.json'",
            "'../../../assets/data/companies/군집2/해양방위및조선업_2.json'",
            "'../../../assets/data/companies/군집2/해양방위및조선업_3.json'",
        ]
    },
    '지상방위및무기시스템.html': {
        'cluster': '군집3',
        'title': '지상방위 및 무기시스템',
        'files': [
            "'../../../assets/data/companies/군집3/지상방위및무기시스템_1.json'",
            "'../../../assets/data/companies/군집3/지상방위및무기시스템_2.json'",
            "'../../../assets/data/companies/군집3/지상방위및무기시스템_3.json'",
            "'../../../assets/data/companies/군집3/지상방위및무기시스템_4.json'",
        ]
    },
    '전자및시스템주요제품.html': {
        'cluster': '군집4',
        'title': '전자 및 시스템',
        'files': [
            "'../../../assets/data/companies/군집4/전자및시스템주요제품_1.json'",
            "'../../../assets/data/companies/군집4/전자및시스템주요제품_2.json'",
            "'../../../assets/data/companies/군집4/전자및시스템주요제품_3.json'",
        ]
    },
    '해외기업.html': {
        'cluster': '군집5',
        'title': '해외',
        'files': [
            "'../../../assets/data/companies/군집5/독일/라인메탈.json'",
            "'../../../assets/data/companies/군집5/미국/록히드마틴.json'",
            "'../../../assets/data/companies/군집5/미국/노스롭그루먼.json'",
            "'../../../assets/data/companies/군집5/미국/레이시온테크놀로지스.json'",
            "'../../../assets/data/companies/군집5/미국/보잉.json'",
            "'../../../assets/data/companies/군집5/미국/제너럴다이내믹스.json'",
            "'../../../assets/data/companies/군집5/영국/BAE시스템스.json'",
            "'../../../assets/data/companies/군집5/중국/중국항공공업집단.json'",
            "'../../../assets/data/companies/군집5/프랑스/탈레스그룹_사프란.json'",
        ]
    }
}

base_dir = r'd:\Study\Github\Global Defense Export Analysis Project\WEB\web-layout\html\data\company'

# HTML section to add
html_section = '''                    <!-- 기업 제품 카테고리 분석 섹션 -->
                    <div style="background-color: #fff; padding: 30px; margin-bottom: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <h3 style="text-align: center; margin-bottom: 30px; color: #333;">기업 제품 카테고리 분석</h3>

                        <!-- 기업 선택 -->
                        <div class="row mb-4">
                            <div class="col-md-12">
                                <label for="companySelector" class="form-label"><strong>기업 선택</strong></label>
                                <select id="companySelector" class="form-select">
                                    <option value="" disabled selected>기업을 선택하세요</option>
                                </select>
                            </div>
                        </div>

                        <!-- 파이 차트 표시 -->
                        <div class="row">
                            <div class="col-md-12">
                                <h5 style="text-align: center; margin-bottom: 20px;">기업 제품 카테고리 분포</h5>
                                <div style="position: relative; height: 500px; width: 100%; max-width: 600px; margin: 0 auto;">
                                    <canvas id="companyImportPieChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>

'''

def get_company_country_map():
    """Return JavaScript object for company-country mapping for 군집5"""
    return '''
        function getCountryForCompany(companyName) {
            const companyCountryMap = {
                '라인메탈': '독일',
                '록히드마틴': '미국',
                '노스롭그루먼': '미국',
                '레이시온테크놀로지스': '미국',
                '보잉': '미국',
                '제너럴다이내믹스': '미국',
                'BAE시스템스': '영국',
                '중국항공공업집단': '중국',
                '탈레스그룹_사프란': '프랑스'
            };
            return companyCountryMap[companyName] || null;
        }
'''

def get_script_template(cluster_id, cluster_title, files_list, is_cluster5=False):
    """Generate the JavaScript code for the company chart"""

    files_array = ',\n                '.join(files_list)

    fetch_path_code = '''
                    const path = `../../../assets/data/companies/${cluster}/${company}.json`;
'''

    if is_cluster5:
        fetch_path_code = '''
                    let path;
                    if (cluster === '군집5') {
                        const country = getCountryForCompany(company.trim());
                        if (!country) {
                            console.error(`Country not found for company: ${company}`);
                            continue;
                        }
                        path = `../../../assets/data/companies/군집5/${country}/${company}.json`;
                    } else {
                        path = `../../../assets/data/companies/${cluster}/${company}.json`;
                    }
'''

    country_function = get_company_country_map() if is_cluster5 else ''

    return f'''
    <!-- Company Chart Script for {cluster_id} -->
    <script>
        const clusterFilePaths = {{
            {cluster_id}: [
                {files_array}
            ]
        }};

        const numberToColorMap = {{
            1: '#FFB3BA', 2: '#FFDFBA', 3: '#FFFFBA', 4: '#BAFFC9', 5: '#BAE1FF',
            6: '#D5AAFF', 7: '#FFABAB', 8: '#FFC3A0', 9: '#FFDAC1', 10: '#D5F4E6',
            11: '#C0C0FF', 12: '#FAFAD2', 13: '#D8BFD8', 14: '#FFD700', 15: '#B0E0E6',
            16: '#ADD8E6', 17: '#90EE90', 18: '#FF7F50', 19: '#FF6347', 20: '#6A5ACD',
            21: '#8A2BE2', 22: '#4682B4'
        }};
{country_function}
        document.addEventListener('DOMContentLoaded', async () => {{
            const pieChartCanvas = document.getElementById('companyImportPieChart')?.getContext('2d');
            let importPieChart;
            const currentCluster = '{cluster_id}';

            async function fetchCategoryCountsForCompanies(cluster, companies) {{
                const categoryCounts = {{}};
                const productDetails = {{}};

                for (const company of companies) {{
{fetch_path_code}
                    try {{
                        console.log(`Fetching data from: ${{path}}`);
                        const response = await fetch(path);

                        if (!response.ok) {{
                            console.error(`Failed to fetch: ${{path}} - Status: ${{response.status}}`);
                            continue;
                        }}

                        const data = await response.json();
                        console.log(`Data fetched from ${{path}}:`, data);

                        if (!Array.isArray(data) || data.length === 0) {{
                            console.warn(`Empty or invalid JSON at ${{path}}`);
                            continue;
                        }}

                        data.forEach((item) => {{
                            if (item.Category && typeof item.Category === 'string' && item.Category.trim() !== '') {{
                                categoryCounts[item.Category] = (categoryCounts[item.Category] || 0) + 1;

                                if (!productDetails[item.Category]) {{
                                    productDetails[item.Category] = [];
                                }}
                                productDetails[item.Category].push(item.Main_Selling_Product);
                            }} else {{
                                console.warn(`Invalid data format in ${{path}}: ${{JSON.stringify(item)}}`);
                            }}
                        }});
                    }} catch (error) {{
                        console.error(`Error fetching data from ${{path}}:`, error);
                    }}
                }}

                console.log('Final category counts:', categoryCounts);
                console.log('Final product details:', productDetails);

                return {{ categoryCounts, productDetails }};
            }}

            function initializePieChart(labels, values, productDetails) {{
                if (importPieChart) {{
                    importPieChart.destroy();
                }}

                importPieChart = new Chart(pieChartCanvas, {{
                    type: 'pie',
                    data: {{
                        labels: labels,
                        datasets: [
                            {{
                                data: values,
                                backgroundColor: labels.map(label => numberToColorMap[parseInt(label, 10)] || '#CCCCCC'),
                            }},
                        ],
                    }},
                    options: {{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {{
                            legend: {{
                                position: 'top',
                                labels: {{
                                    font: {{ size: 14 }},
                                    padding: 20,
                                }},
                            }},
                            tooltip: {{
                                callbacks: {{
                                    label: function (context) {{
                                        const category = context.label;
                                        const products = productDetails[category] || [];
                                        return [
                                            `Category: ${{category}}`,
                                            `Products: ${{products.join(', ')}}`,
                                        ];
                                    }},
                                }},
                            }},
                            title: {{
                                display: true,
                                text: 'Category Distribution',
                                font: {{ size: 18, weight: 'normal' }},
                                padding: {{ top: 20, bottom: 20 }},
                            }},
                        }},
                        layout: {{
                            padding: {{ top: 20, bottom: 20, left: 20, right: 20 }},
                        }},
                    }},
                }});
            }}

            function populateCompanyDropdown() {{
                const companySelector = document.getElementById('companySelector');
                const companies = clusterFilePaths[currentCluster] || [];

                companySelector.innerHTML = '<option value="" disabled selected>기업을 선택하세요</option>';

                companies.forEach((filePath) => {{
                    const companyName = filePath.split('/').pop().replace('.json', '');
                    const option = document.createElement('option');
                    option.value = companyName;
                    option.textContent = companyName;
                    companySelector.appendChild(option);
                }});

                // "전체 기업" 옵션 추가
                const allOption = document.createElement('option');
                allOption.value = 'all';
                allOption.textContent = '전체 {cluster_title} 기업';
                companySelector.appendChild(allOption);
            }}

            const companySelector = document.getElementById('companySelector');
            if (companySelector) {{
                populateCompanyDropdown();

                companySelector.addEventListener('change', async () => {{
                    const company = companySelector.value;

                    if (!company) {{
                        alert('기업을 선택하세요.');
                        return;
                    }}

                    let companiesToFetch = [];
                    if (company === 'all') {{
                        companiesToFetch = (clusterFilePaths[currentCluster] || []).map((filePath) =>
                            filePath.split('/').pop().replace('.json', '')
                        );
                    }} else {{
                        companiesToFetch = [company];
                    }}

                    const {{ categoryCounts, productDetails }} = await fetchCategoryCountsForCompanies(currentCluster, companiesToFetch);

                    if (Object.keys(categoryCounts).length === 0) {{
                        alert(`유효한 데이터를 가져올 수 없습니다. 파일을 확인하세요.`);
                        return;
                    }}
                    const labels = Object.keys(categoryCounts);
                    const values = Object.values(categoryCounts);

                    initializePieChart(labels, values, productDetails);
                }});
            }}
        }});
    </script>
'''

print("Company pages update script created successfully!")
print(f"Will update {len(clusters)} files")
