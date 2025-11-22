
// Popup and Chart logic

let popupContainer;
let closeButton;

const countryMapping = {
    'Korea': 'South Korea',
    'Russia': 'Russian Federation',
    'Turkey': 'Turkiye',
    'Czech Rep.': 'Czech Republic',
    "Côte d'Ivoire": "Cote d'Ivoire",
    'Dem. Rep. Congo': 'Republic of the Congo',
    'Iran': 'Iran, Islamic Rep.',
    'Venezuela': 'Venezuela, RB',
    'Central African Rep.': 'Central African Republic',
    'Bosnia and Herz.': 'Bosnia and Herzegovina',
    'N. cyprus': 'Northern Cyprus',
    'Dominican Rep.': 'Dominican Republic',
    'Falkland is.': 'Falkland Islands',
    'Eq. Guinea': 'Equatorial Guinea',
    'Lao PDR': 'Laos',
    'Macedonia': 'North Macedonia',
    'Dem. Rep. Korea': 'North Korea',
    'W. sahara': 'Western Sahara',
    'S. sudan': 'South Sudan',
    'Solomon Is.': 'Solomon Islands',
    'Swaziland': 'Eswatini',
    'Syria': 'Syrian Arab Republic',
    'Yemen': 'Yemen, Rep.',
    'New caledonia': 'New Caledonia',
    'Antarctica': 'Antarctica',
    'Frsantarcticlands': 'French Southern Lands',
    'Ncyprus': 'Northern Cyprus',
    'Czechrep': 'Czechia',
    'Falklandis': 'Falkland Islands',
    'Greenland': 'Greenland',
    'Puertorico': 'Puerto Rico',
    'Wsahara': 'Western Sahara',
    'Somalia': 'Somalia',
    'Taiwan': 'TAIWAN'
};

export const initPopup = () => {
    console.log('Initializing Popup...');
    // Create Popup Container
    popupContainer = document.createElement('div');
    popupContainer.id = 'popup-container';
    popupContainer.className = 'popup-container';
    popupContainer.style.display = 'none';
    document.body.appendChild(popupContainer);

    // Create Close Button
    closeButton = document.createElement('button');
    closeButton.className = 'close-btn';
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => {
        popupContainer.style.display = 'none';
    });
    popupContainer.appendChild(closeButton);

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .popup-container {
            position: absolute;
            background: white;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            padding: 10px;
            z-index: 1000;
            width: 400px;
            max-height: 500px;
            overflow-y: auto;
            pointer-events: auto;
            overflow-x: hidden;
        }
        .popup-container h3 {
            margin: 0;
            padding: 5px 0;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
        }
        .popup-container .chart {
            height: 200px;
            margin-top: 10px;
        }
        .popup-container .close-btn {
            position: absolute;
            top: 5px;
            right: 5px;
            background: #ff0000;
            color: #fff;
            border: none;
            border-radius: 50%;
            width: 25px;
            height: 25px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
};

export const openPopup = async (countryName, event) => {
    if (!popupContainer) initPopup();

    popupContainer.style.display = 'block';
    popupContainer.innerHTML = ''; // Clear content
    popupContainer.appendChild(closeButton); // Re-add close button

    // Add Title
    const title = document.createElement('h3');
    title.className = 'popup-country-name';
    title.style.cursor = 'pointer';
    title.title = `Click to view detailed analysis for ${countryName}`;
    title.innerText = countryName;
    title.onclick = () => {
         localStorage.setItem('selectedCountry', countryName);
         window.location.href = '/html/data/analysis_1.html';
    };
    popupContainer.appendChild(title);

    const chartsContainer = document.createElement('div');
    chartsContainer.id = 'popup-charts';
    popupContainer.appendChild(chartsContainer);

    // Position Popup
    if (event) {
        adjustPopupPosition(event.originalEvent, popupContainer);
    }

    await loadChartsForCountry(countryName, chartsContainer);
};

function adjustPopupPosition(event, container) {
    const popupWidth = container.offsetWidth || 400;
    const popupHeight = container.offsetHeight || 500;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let left = event.pageX + 15;
    let top = event.pageY + 15;

    if (left + popupWidth > windowWidth) left = windowWidth - popupWidth - 15;
    if (top + popupHeight > windowHeight) top = windowHeight - popupHeight - 15;

    container.style.left = `${left}px`;
    container.style.top = `${top}px`;
}

async function loadChartsForCountry(countryName, container) {
    const jsonData = await loadJsonData();

    const chartInfo = [
        { key: 'economy', title: 'Major Economic Indicators', yAxisLabel: 'Value', type: 'bar' },
        { key: 'military', title: 'Military Expenditure', yAxisLabel: 'Expenditure (in billions)', type: 'line' },
        { key: 'politics', title: 'Governance Stability Over Time', yAxisLabel: 'Stability Score', type: 'line' },
        { key: 'armsExports', title: 'Arms Exports Over Time', yAxisLabel: 'Export Value (in billions)', type: 'line' },
        { key: 'armsImports', title: 'Arms Imports Over Time', yAxisLabel: 'Import Value (in billions)', type: 'line' },
        { key: 'weaponSystems', title: 'Weapon Systems Distribution', yAxisLabel: 'Import Value (in billions)', type: 'pie' },
        { key: 'weaponImports', title: 'Weapon Imports Distribution', yAxisLabel: 'Import Value (in billions)', type: 'pie' },
    ];

    for (const chart of chartInfo) {
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart';
        container.appendChild(chartContainer);

        await createChart(chartContainer, countryName, jsonData[chart.key], chart.title, chart.yAxisLabel, chart.type);
    }
}

async function loadJsonData() {
    const basePath = window.location.pathname.includes('/html/') ? '../../assets/data/' : 'assets/data/';
    const jsonFiles = {
        economy: basePath + 'Economy_data.json',
        politics: basePath + 'governance_data.json',
        military: basePath + 'military_expenses_data.json',
        armsExports: basePath + 'arms_exports_data.json',
        armsImports: basePath + 'arms_import_data.json',
        weaponSystems: basePath + 'weapon_system_Data.json',
        weaponImports: basePath + 'weapon_import.json',
    };

    const jsonData = {};
    for (const key in jsonFiles) {
        try {
            const response = await fetch(jsonFiles[key]);
            if (response.ok) {
                jsonData[key] = await response.json();
            } else {
                console.error(`Failed to load ${key}: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error loading ${key}: ${error}`);
        }
    }
    return jsonData;
}

function getMappedCountryName(inputCountry) {
    if (!inputCountry) return null;
    const standardizedInput = inputCountry
        .trim()
        .toLowerCase()
        .replace(/[\s'.,-]/g, '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    const matchedKey = Object.keys(countryMapping).find(key => {
        const standardizedKey = key
            .trim()
            .toLowerCase()
            .replace(/[\s'.,-]/g, '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        return standardizedKey.includes(standardizedInput) || standardizedInput.includes(standardizedKey);
    });

    if (matchedKey) {
        return countryMapping[matchedKey];
    } else {
        return inputCountry; // Return original if no match found (fallback)
    }
}

async function createChart(container, countryName, data, title, yAxisLabel, chartType) {
    const mappedName = getMappedCountryName(countryName);
    console.log(`Creating chart '${title}' for ${countryName} (Mapped: ${mappedName})`);
    
    const countryData = data?.filter(item => item.Country === mappedName);

    if (!countryData || countryData.length === 0) {
        const noDataMessage = document.createElement('p');
        noDataMessage.textContent = `${title} 데이터가 없습니다.`;
        container.appendChild(noDataMessage);
        return;
    }

    let labels = [], datasets = [], backgroundColors = [];

    // Major Economic Indicators
    if (title === 'Major Economic Indicators') {
        const indicators = [
            'GDP Growth Weighted', 'GDP Military Weighted', 'Int. Cap Weighted',
            'Income Weighted', 'Trade Weighted', 'Unemployment Weighted',
            'CPI Weighted', 'Dollar Weighted', 'GDP Debt Weighted'
        ];

        const indicatorDescriptions = {
            'GDP Growth Weighted': 'GDP 성장률 가중치 - 경제 성장 속도를 나타내는 지표',
            'GDP Military Weighted': 'GDP 대비 군사비 가중치 - 국방비 지출 비중',
            'Int. Cap Weighted': '국제 자본 가중치 - 해외 투자 및 자본 유입',
            'Income Weighted': '소득 가중치 - 1인당 국민 소득 수준',
            'Trade Weighted': '무역 가중치 - 대외 무역 활동 규모',
            'Unemployment Weighted': '실업률 가중치 - 고용 시장 안정성',
            'CPI Weighted': '소비자물가지수 가중치 - 물가 안정성',
            'Dollar Weighted': '달러 환율 가중치 - 통화 가치 및 환율 변동성',
            'GDP Debt Weighted': 'GDP 대비 부채 가중치 - 국가 재정 건전성'
        };

        labels = indicators;

        const logTransformedData = indicators.map(indicator => {
            const value = countryData[0][indicator] || 0;
            return {
                original: value,
                log: value > 0 ? Math.log10(value) : 0,
                description: indicatorDescriptions[indicator]
            };
        });

        datasets = [{
            label: `${title}`,
            data: logTransformedData.map(item => item.log),
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            indicatorInfo: logTransformedData
        }];

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const index = context.dataIndex;
                            const originalValue = logTransformedData[index].original;
                            const logValue = logTransformedData[index].log.toFixed(2);
                            return `${labels[index]}: Log(${logValue}) | Original: ${originalValue.toLocaleString()}`;
                        },
                        afterLabel: function(context) {
                            const index = context.dataIndex;
                            const description = logTransformedData[index].description;
                            return `\n${description}`;
                        },
                        title: function(context) {
                            return '주요 경제 지표';
                        }
                    }
                },
                title: {
                    display: true,
                    text: `${title} (Log Transformed with Original Values)`,
                    font: { size: 14 }
                },
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Log Scale (Base 10)', font: { size: 12 } },
                    ticks: { font: { size: 10 } }
                },
                x: {
                    title: { display: true, text: 'Indicators', font: { size: 8 } },
                    ticks: {
                        font: { size: 9 },
                        maxRotation: 0,
                        minRotation: 0,
                        callback: function(value, index, ticks) {
                            const label = labels[index];
                            if (label) return label.replace(' Weighted', '');
                            return value;
                        }
                    }
                }
            }
        };

        const canvas = document.createElement('canvas');
        canvas.style.height = '300px';
        container.appendChild(canvas);
        
        const chart = new Chart(canvas.getContext('2d'), {
            type: chartType,
            data: { labels: labels, datasets: datasets },
            options: options
        });
        
        // Tooltip event listeners (simplified from original)
        return;

    } else if (title === 'Governance Stability Over Time') {
        const indicators = ['CC', 'GE', 'PV', 'RL', 'RQ', 'VA'];
        // indicatorNames is already defined at module level or inside function, but let's ensure it's available
        // It was seen in the view_file output earlier as being defined inside the function in the previous version? 
        // No, it was defined inside the else if block in the view_file output.
        const indicatorNames = {
            'CC': 'Control of Corruption (부패 통제)',
            'GE': 'Government Effectiveness (정부 효율성)',
            'PV': 'Political Stability and Absence of Violence (정치 안정성)',
            'RL': 'Rule of Law (법치주의)',
            'RQ': 'Regulatory Quality (규제 품질)',
            'VA': 'Voice and Accountability (국민 참여도 및 책임성)'
        };
        const colors = ['#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF'];

        labels = [...new Set(countryData.map(item => item.year))];
        datasets = indicators.map((indicator, index) => {
            return {
                label: indicator, // Keep short label for legend to save space, or use full name? User asked for tooltip.
                // Let's use the short label for the line, but we can try to make the tooltip show the full name.
                // Actually, the user said "When hovering... a tooltip should appear, displaying the full meaning".
                // Chart.js tooltips usually show the label.
                // We can customize the tooltip callback.
                data: labels.map(year => {
                    const record = countryData.find(item => item.year === year && item.indicator === indicator.toLowerCase());
                    return record ? record.estimate : null;
                }),
                borderColor: colors[index],
                backgroundColor: colors[index],
                fill: false,
                tension: 0.4,
                indicatorFullName: indicatorNames[indicator] // Custom property for tooltip
            };
        });
        
        // We need to pass options to enabling custom tooltips. 
        // Since createChart creates the chart instance later, we might need to modify the options object passed to new Chart().
        // However, the current createChart implementation likely has a generic options object.
        // I should check if I can inject options or if I need to modify the Chart creation part.
        // Looking at the file content I viewed earlier, the Chart creation is at the end of the function.
        // I will need to modify the options generation logic or the Chart constructor call.
        // But wait, I can't see the Chart constructor call in the snippet I viewed.
        // I should probably read the file again to be safe, but I'll assume I can modify the options.
        // Actually, I'll just modify the datasets here and then I'll need to find where `options` are defined.
        // If options are defined globally for all charts, I might need to make it conditional.
        
        // Let's look at the `Weapon Systems Distribution` block first.


    } else if (title === 'Weapon Systems Distribution') {
        const categoryMapping = {
            '2': 'Artillery (포병)',
            '4': 'Rocket Systems (로켓 시스템)',
            '6': 'Naval Vessels (해군 함정)',
            '7': 'Armored Vehicles (장갑차)',
            '8': 'Aircraft (항공기)',
            '9': 'Trainer Aircraft (훈련기)',
            '20': 'Submarines (잠수함)',
            '22': 'Personnel (인력)',
             // Handle combinations if they appear as exact strings, otherwise we might need a function
            '6,20': 'Naval Vessels & Submarines' 
        };

        labels = [...new Set(countryData.map(item => item.Category))].map(cat => categoryMapping[cat] || `Category ${cat}`);
        
        // We need to map the original categories to the new labels for grouping
        // Or just use the mapped labels directly.
        // The original code used `item.Category` to filter.
        const uniqueCategories = [...new Set(countryData.map(item => item.Category))];
        
        backgroundColors = generateColors(uniqueCategories.length);
        const categoryDetails = uniqueCategories.map((category, index) => {
            const items = countryData.filter(item => item.Category === category);
            const weaponTypes = [...new Set(items.map(item => item.Metric))];
            return {
                category: categoryMapping[category] || `Category ${category}`, // Use mapped name
                originalCategory: category,
                count: items.length,
                weaponTypes: weaponTypes.slice(0, 3)
            };
        });
        datasets = [{
            data: categoryDetails.map(detail => detail.count),
            backgroundColor: backgroundColors,
            categoryDetails: categoryDetails
        }];

    } else if (title === 'Weapon Imports Distribution') {
         const usmlMapping = {
            '1': 'Firearms (화기)',
            '2': 'Guns & Armament (포 및 무장)',
            '3': 'Ammunition (탄약)',
            '4': 'Missiles/Rockets/Bombs (미사일/로켓/폭탄)',
            '5': 'Explosives (폭발물)',
            '6': 'Surface Vessels (수상함)',
            '7': 'Ground Vehicles (지상 차량)',
            '8': 'Aircraft (항공기)',
            '9': 'Training Equipment (훈련 장비)',
            '10': 'Protective Equipment (보호 장비)',
            '11': 'Electronics (전자 장비)',
            '12': 'Fire Control/Sensors (사격 통제/센서)',
            '13': 'Materials (재료)',
            '14': 'Toxicological Agents (독성 작용제)',
            '15': 'Spacecraft (우주선)',
            '16': 'Nuclear (핵)',
            '17': 'Classified (기밀)',
            '18': 'Directed Energy (지향성 에너지)',
            '19': 'Gas Turbine Engines (가스 터빈 엔진)',
            '20': 'Submersible Vessels (잠수정)',
            '21': 'Misc (기타)'
        };

        const uniqueCategories = [...new Set(countryData.map(item => item['USML Category']))];
        labels = uniqueCategories.map(cat => usmlMapping[cat] || `USML ${cat}`);
        
        backgroundColors = generateColors(uniqueCategories.length);
        const categoryDetails = uniqueCategories.map(category => {
            const items = countryData.filter(item => item['USML Category'] === category);
            const weaponDescriptions = [...new Set(items.map(item => item['Weapon description']))];
            return {
                category: usmlMapping[category] || `USML ${category}`,
                originalCategory: category,
                count: items.length,
                weaponDescriptions: weaponDescriptions.slice(0, 3)
            };
        });
        datasets = [{
            data: categoryDetails.map(detail => detail.count),
            backgroundColor: backgroundColors,
            categoryDetails: categoryDetails
        }];

    } else {
        labels = Object.keys(countryData[0]).filter(key => !isNaN(key)).sort();
        datasets = [{
            label: title,
            data: labels.map(year => countryData[0][year] || 0),
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        }];
    }

    const canvas = document.createElement('canvas');
    if (title === 'Weapon Systems Distribution' || title === 'Weapon Imports Distribution') {
        canvas.style.height = '400px'; // Increased height for weapon charts
    } else {
        canvas.style.height = '300px';
    }
    container.appendChild(canvas);

    if (title === 'Weapon Systems Distribution' || title === 'Weapon Imports Distribution') {
        const descriptionText = document.createElement('p');
        descriptionText.style.fontSize = '11px';
        descriptionText.style.color = '#666';
        descriptionText.style.marginTop = '5px';
        descriptionText.style.marginBottom = '10px';
        descriptionText.style.textAlign = 'center';
        descriptionText.style.fontStyle = 'italic';
        descriptionText.textContent = title === 'Weapon Systems Distribution' ? 
            '※ 각 카테고리별 무기 시스템 개수를 나타냅니다' : 
            '※ 각 USML 카테고리별 무기 수입 건수를 나타냅니다';
        container.appendChild(descriptionText);
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: { font: { size: 10 }, padding: 10 }
            },
            title: {
                display: true,
                text: title,
                font: { size: 14, weight: 'bold' },
                padding: { top: 10, bottom: 10 }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        
                        // Governance Stability Over Time
                        if (title === 'Governance Stability Over Time') {
                            const dataset = context.dataset;
                            if (dataset.indicatorFullName) {
                                return `${dataset.indicatorFullName}: ${context.raw}`;
                            }
                        }

                        // Weapon Systems / Imports Distribution
                        if (title === 'Weapon Systems Distribution' || title === 'Weapon Imports Distribution') {
                             const dataset = context.dataset;
                             const index = context.dataIndex;
                             const details = dataset.categoryDetails && dataset.categoryDetails[index];
                             
                             if (details) {
                                 const lines = [`${details.category}: ${details.count}`];
                                 
                                 if (details.weaponTypes && details.weaponTypes.length > 0) {
                                     lines.push('Top Types: ' + details.weaponTypes.join(', '));
                                 }
                                 if (details.weaponDescriptions && details.weaponDescriptions.length > 0) {
                                     lines.push('Top Items: ' + details.weaponDescriptions.join(', '));
                                 }
                                 return lines;
                             }
                        }

                        if (context.parsed.y !== null) {
                            label += context.parsed.y;
                        } else {
                             label += context.raw;
                        }
                        return label;
                    }
                }
            }
        },
        scales: chartType === 'bar' || chartType === 'line' ? {
            x: { title: { display: true, text: 'Year' } },
            y: { title: { display: true, text: yAxisLabel } },
        } : {},
    };

    new Chart(canvas.getContext('2d'), {
        type: chartType,
        data: { labels: labels, datasets: datasets },
        options: chartOptions
    });
}

function generateColors(length) {
    const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#C9CBCF', '#4D5360', '#AC92EC', '#4FC1E9'
    ];
    return Array.from({ length }, (_, i) => colors[i % colors.length]);
}
