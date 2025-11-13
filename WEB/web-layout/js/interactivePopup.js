document.addEventListener('DOMContentLoaded', async () => {
    // 팝업 컨테이너 생성
    const popupContainer = document.createElement('div');
    popupContainer.id = 'popup-container';
    popupContainer.className = 'popup-container';
    popupContainer.style.display = 'none'; // 초기에는 숨김
    document.body.appendChild(popupContainer);

    // 닫기 버튼 생성
    const closeButton = document.createElement('button');
    closeButton.className = 'close-btn';
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => {
        popupContainer.style.display = 'none'; // 팝업 숨기기
    });
    popupContainer.appendChild(closeButton);

    // CSS 추가
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

    // GeoJSON과 JSON 데이터 간의 매핑 키 설정
  // 국가 이름 매핑 테이블
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
    'Taiwan': 'TAIWAN',
    'Greenland' : 'Greenland'
};



fetch('https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson')
    .then(response => response.json())
    .then(data => {
        data.features.forEach(feature => {
            const geoCountry = feature.properties.ADMIN || feature.properties.name || 'Unknown';
            const mappedCountry = getMappedCountryName(geoCountry);
            console.log(`GeoJSON country: ${geoCountry}, Mapped: ${mappedCountry}`);
        });
    })
    .catch(error => console.error('Error loading GeoJSON:', error));

 // 디버깅용 함수 (GeoJSON과 JSON 매핑되지 않는 국가 출력)
 async function debugUnmatchedCountries(jsonData, geoJsonData) {
    const unmatched = [];

    geoJsonData.features.forEach(feature => {
        const geoCountry = feature.properties.ADMIN || feature.properties.name || 'Unknown';
        const mappedCountry = getMappedCountryName(geoCountry);
        const existsInJson = Object.values(jsonData).some(data =>
            data.some(item => item.Country === mappedCountry)
        );

        if (!existsInJson) {
            unmatched.push(geoCountry);
        }
    });

    console.log('Unmatched countries:', unmatched);
}


// 함수 실행
(async () => {
    const jsonData = await loadJsonData();
    const geoJsonData = await fetch('https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson').then(res => res.json());

    debugUnmatchedCountries(jsonData, geoJsonData);
})();


// 함수 실행
(async () => {
    const jsonData = await loadJsonData();
    const geoJsonData = await fetch('https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson').then(res => res.json());

    debugUnmatchedCountries(jsonData, geoJsonData);
})();

function  getMappedCountryName(inputCountry, countryMapping) {
    // 입력 국가 이름을 표준화
    const standardizedInput = inputCountry
        .trim()
        .toLowerCase()
        .replace(/[\s'.,-]/g, '')
        .normalize('NFD') // Unicode 정규화 (예: á -> a)
        .replace(/[\u0300-\u036f]/g, ''); // 악센트 제거

    // 국가 매핑 테이블에서 가장 유사한 키 찾기
    const matchedKey = Object.keys(countryMapping).find(key => {
        const standardizedKey = key
            .trim()
            .toLowerCase()
            .replace(/[\s'.,-]/g, '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        // 포함하거나 포함되어 있는지 확인
        return standardizedKey.includes(standardizedInput) || standardizedInput.includes(standardizedKey);
    });

    // 매칭 결과 출력
    if (matchedKey) {
        console.log(`Input "${inputCountry}" matched with "${matchedKey}" -> Mapped to "${countryMapping[matchedKey]}"`);
        return countryMapping[matchedKey];
    } else {
        console.warn(`No match found for "${inputCountry}"`);
        return null;
    }
}

    // JSON 데이터 로드 함수
    async function loadJsonData() {
        // 현재 페이지 위치에 따라 경로 결정 (index.html은 루트에 있음)
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


// 차트 생성 함수
// 차트 생성 함수
async function createChart(container, countryName, data, title, yAxisLabel, chartType) {
    const mappedName = countryMapping[countryName] || countryName;
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

    // 각 지표의 의미 설명
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

    // 로그 변환된 값과 원본 값을 저장
    const logTransformedData = indicators.map(indicator => {
        const value = countryData[0][indicator] || 0;
        return {
            original: value,
            log: value > 0 ? Math.log10(value) : 0, // 로그10 변환
            description: indicatorDescriptions[indicator]
        };
    });

    // 데이터셋 설정
    datasets = [{
        label: `${title}`,
        data: logTransformedData.map(item => item.log),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        indicatorInfo: logTransformedData
    }];

    // 툴팁과 차트 옵션 설정 (글씨 크기 추가)
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
                font: {
                    size: 14 // 제목 글씨 크기
                }
            },
            legend: {
                display: false  // 기본 범례 숨김 (막대 그래프에는 필요 없음)
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Log Scale (Base 10)',
                    font: {
                        size: 12 // Y축 제목 글씨 크기
                    }
                },
                ticks: {
                    font: {
                        size: 10 // Y축 눈금 글씨 크기
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Indicators',
                    font: {
                        size: 8 // X축 제목 글씨 크기
                    }
                },
                ticks: {
                    font: {
                        size: 9 // X축 눈금 글씨 크기
                    },
                    maxRotation: 0, // 레이블을 수평으로 유지
                    minRotation: 0,
                    callback: function(value, index, ticks) {
                        // X축 라벨 간략화
                        const label = labels[index];
                        if (label) {
                            return label.replace(' Weighted', '');
                        }
                        return value;
                    }
                }
            }
        }
    };
    
     
    // Governance Stability Over Time
    } else if (title === 'Governance Stability Over Time') {
        const indicators = ['CC', 'GE', 'PV', 'RL', 'RQ', 'VA'];
        const indicatorNames = {
            'CC': 'Control of Corruption (부패 통제)',
            'GE': 'Government Effectiveness (정부 효율성)',
            'PV': 'Political Stability and Absence of Violence (정치 안정성)',
            'RL': 'Rule of Law (법치주의)',
            'RQ': 'Regulatory Quality (규제 품질)',
            'VA': 'Voice and Accountability (국민 참여도 및 책임성)'
        };
        const colors = ['#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF'];

        labels = [...new Set(countryData.map(item => item.year))]; // 연도 추출
        datasets = indicators.map((indicator, index) => {
            return {
                label: indicator,
                fullName: indicatorNames[indicator],
                data: labels.map(year => {
                    const record = countryData.find(item => item.year === year && item.indicator === indicator.toLowerCase());
                    return record ? record.estimate : null;
                }),
                borderColor: colors[index],
                backgroundColor: colors[index],
                fill: false,
                tension: 0.4,
            };
        });

    // Weapon Systems Distribution (파이 차트)
    } else if (title === 'Weapon Systems Distribution') {
        labels = [...new Set(countryData.map(item => item.Category))];
        backgroundColors = generateColors(labels.length);

        // 각 카테고리별 무기 타입 및 개수 수집
        const categoryDetails = labels.map(category => {
            const items = countryData.filter(item => item.Category === category);
            const weaponTypes = [...new Set(items.map(item => item.Metric))];
            return {
                category: category,
                count: items.length,
                weaponTypes: weaponTypes.slice(0, 3) // 최대 3개의 무기 타입만 표시
            };
        });

        datasets = [{
            data: categoryDetails.map(detail => detail.count),
            backgroundColor: backgroundColors,
            categoryDetails: categoryDetails
        }];

    // Weapon Imports Distribution (파이 차트)
    } else if (title === 'Weapon Imports Distribution') {
        labels = [...new Set(countryData.map(item => item['USML Category']))];
        backgroundColors = generateColors(labels.length);

        // 각 카테고리별 무기 설명 및 개수 수집
        const categoryDetails = labels.map(category => {
            const items = countryData.filter(item => item['USML Category'] === category);
            const weaponDescriptions = [...new Set(items.map(item => item['Weapon description']))];
            return {
                category: category,
                count: items.length,
                weaponDescriptions: weaponDescriptions.slice(0, 3) // 최대 3개의 무기 설명만 표시
            };
        });

        datasets = [{
            data: categoryDetails.map(detail => detail.count),
            backgroundColor: backgroundColors,
            categoryDetails: categoryDetails
        }];

    // 일반 데이터 처리
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

    // 차트 생성
    const canvas = document.createElement('canvas');
    canvas.style.height = '300px';
    container.appendChild(canvas);

    // Weapon Systems/Imports Distribution 차트에 설명 텍스트 추가
    if (title === 'Weapon Systems Distribution' || title === 'Weapon Imports Distribution') {
        const descriptionText = document.createElement('p');
        descriptionText.style.fontSize = '11px';
        descriptionText.style.color = '#666';
        descriptionText.style.marginTop = '5px';
        descriptionText.style.marginBottom = '10px';
        descriptionText.style.textAlign = 'center';
        descriptionText.style.fontStyle = 'italic';

        if (title === 'Weapon Systems Distribution') {
            descriptionText.textContent = '※ 각 카테고리별 무기 시스템 개수를 나타냅니다';
        } else {
            descriptionText.textContent = '※ 각 USML 카테고리별 무기 수입 건수를 나타냅니다';
        }

        container.appendChild(descriptionText);
    }

    // 차트 옵션 설정
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    font: { size: 10 },
                    padding: 10
                }
            },
            title: {
                display: true,
                text: title,
                font: { size: 14, weight: 'bold' },
                padding: { top: 10, bottom: 10 }
            },
            tooltip: {
                callbacks: {}
            }
        },
        scales: chartType === 'bar' || chartType === 'line' ? {
            x: { title: { display: true, text: 'Year' } },
            y: { title: { display: true, text: yAxisLabel } },
        } : {}, // 파이 차트에는 scales 적용 안 함
    };

    // Military Expenditure 차트를 위한 커스텀 툴팁
    if (title === 'Military Expenditure') {
        chartOptions.plugins.tooltip.callbacks = {
            label: function(context) {
                const value = context.parsed.y;
                return `군사비 지출: ${value.toLocaleString()} (단위: 10억 달러)`;
            },
            afterLabel: function(context) {
                return '국방 예산 및 군사 투자 규모를 나타냅니다';
            },
            title: function(context) {
                return `${context[0].label}년도`;
            }
        };
    }

    // Arms Exports Over Time 차트를 위한 커스텀 툴팁
    if (title === 'Arms Exports Over Time') {
        chartOptions.plugins.tooltip.callbacks = {
            label: function(context) {
                const value = context.parsed.y;
                return `무기 수출액: ${value.toLocaleString()} (단위: 10억 달러)`;
            },
            afterLabel: function(context) {
                return '국가의 방위산업 수출 능력을 나타냅니다';
            },
            title: function(context) {
                return `${context[0].label}년도`;
            }
        };
    }

    // Arms Imports Over Time 차트를 위한 커스텀 툴팁
    if (title === 'Arms Imports Over Time') {
        chartOptions.plugins.tooltip.callbacks = {
            label: function(context) {
                const value = context.parsed.y;
                return `무기 수입액: ${value.toLocaleString()} (단위: 10억 달러)`;
            },
            afterLabel: function(context) {
                return '국가의 무기 수입 의존도 및 방위력 증강을 나타냅니다';
            },
            title: function(context) {
                return `${context[0].label}년도`;
            }
        };
    }

    // Governance Stability Over Time 차트를 위한 커스텀 툴팁
    if (title === 'Governance Stability Over Time') {
        chartOptions.plugins.tooltip.callbacks = {
            label: function(context) {
                const datasetLabel = context.dataset.label || '';
                const fullName = context.dataset.fullName || datasetLabel;
                const value = context.parsed.y;

                if (value !== null && value !== undefined) {
                    return `${datasetLabel} (${fullName}): ${value.toFixed(2)}`;
                }
                return `${datasetLabel} (${fullName}): 데이터 없음`;
            },
            title: function(context) {
                return `${context[0].label}년도`;
            }
        };
    }

    // Weapon Systems Distribution 차트를 위한 커스텀 툴팁
    if (title === 'Weapon Systems Distribution') {
        chartOptions.plugins.tooltip.callbacks = {
            label: function(context) {
                const dataIndex = context.dataIndex;
                const detail = context.dataset.categoryDetails[dataIndex];
                const value = context.parsed || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);

                let label = `카테고리 ${detail.category}: ${value}개 시스템 (${percentage}%)`;
                return label;
            },
            afterLabel: function(context) {
                const dataIndex = context.dataIndex;
                const detail = context.dataset.categoryDetails[dataIndex];

                if (detail.weaponTypes && detail.weaponTypes.length > 0) {
                    const weaponList = detail.weaponTypes.join(', ');
                    return `포함: ${weaponList}${detail.weaponTypes.length >= 3 ? ' 등' : ''}`;
                }
                return '';
            },
            title: function(context) {
                return '무기 시스템 분포';
            }
        };
    }

    // Weapon Imports Distribution 차트를 위한 커스텀 툴팁
    if (title === 'Weapon Imports Distribution') {
        chartOptions.plugins.tooltip.callbacks = {
            label: function(context) {
                const dataIndex = context.dataIndex;
                const detail = context.dataset.categoryDetails[dataIndex];
                const value = context.parsed || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);

                let label = `USML 카테고리 ${detail.category}: ${value}건 수입 (${percentage}%)`;
                return label;
            },
            afterLabel: function(context) {
                const dataIndex = context.dataIndex;
                const detail = context.dataset.categoryDetails[dataIndex];

                if (detail.weaponDescriptions && detail.weaponDescriptions.length > 0) {
                    const weaponList = detail.weaponDescriptions.join(', ');
                    return `무기 타입: ${weaponList}${detail.weaponDescriptions.length >= 3 ? ' 등' : ''}`;
                }
                return '';
            },
            title: function(context) {
                return '무기 수입 분포';
            }
        };
    }

    const chart = new Chart(canvas.getContext('2d'), {
        type: chartType,
        data: { labels: labels, datasets: datasets },
        options: chartOptions
    });

    // Major Economic Indicators의 X축 라벨에 툴팁 추가
    if (title === 'Major Economic Indicators') {
        // 차트가 렌더링된 후 X축 라벨에 툴팁 추가
        canvas.addEventListener('mousemove', function(event) {
            const points = chart.getElementsAtEventForMode(event, 'nearest', { intersect: false }, true);

            // 기존 툴팁 제거
            const existingLabelTooltip = document.querySelector('.x-axis-label-tooltip');
            if (existingLabelTooltip) {
                existingLabelTooltip.remove();
            }

            if (points.length > 0) {
                const point = points[0];
                const dataIndex = point.index;

                // 데이터셋에 indicatorInfo가 있는 경우 (Major Economic Indicators)
                if (chart.data.datasets[0].indicatorInfo) {
                    const info = chart.data.datasets[0].indicatorInfo[dataIndex];

                    // 툴팁 요소 생성
                    const labelTooltip = document.createElement('div');
                    labelTooltip.className = 'x-axis-label-tooltip';
                    labelTooltip.style.cssText = `
                        position: absolute;
                        background-color: rgba(0, 0, 0, 0.9);
                        color: white;
                        padding: 8px 12px;
                        border-radius: 4px;
                        font-size: 11px;
                        z-index: 10001;
                        pointer-events: none;
                        white-space: nowrap;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                    `;

                    labelTooltip.innerHTML = `<strong>${labels[dataIndex]}</strong><br><span style="font-size: 10px;">${info.description}</span>`;
                    labelTooltip.style.left = `${event.pageX + 15}px`;
                    labelTooltip.style.top = `${event.pageY - 30}px`;

                    document.body.appendChild(labelTooltip);
                }
            }
        });

        canvas.addEventListener('mouseleave', function() {
            const existingLabelTooltip = document.querySelector('.x-axis-label-tooltip');
            if (existingLabelTooltip) {
                existingLabelTooltip.remove();
            }
        });
    }

    // Governance Stability Over Time 차트의 범례에 툴팁 추가
    if (title === 'Governance Stability Over Time') {
        // Canvas에 마우스 이벤트를 추가하여 범례 호버 감지
        let legendTooltip = null;

        canvas.addEventListener('mousemove', function(event) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // 범례 영역 확인 (Chart.js는 범례를 canvas 하단에 렌더링)
            const legend = chart.legend;
            if (!legend) return;

            // 기존 툴팁 제거
            if (legendTooltip) {
                legendTooltip.remove();
                legendTooltip = null;
            }

            // 범례 항목들을 순회하며 마우스 위치 확인
            legend.legendItems.forEach((item, index) => {
                const hitBox = legend.legendHitBoxes[index];

                if (hitBox &&
                    x >= hitBox.left &&
                    x <= hitBox.left + hitBox.width &&
                    y >= hitBox.top &&
                    y <= hitBox.top + hitBox.height) {

                    const dataset = chart.data.datasets[index];

                    // 툴팁 생성
                    legendTooltip = document.createElement('div');
                    legendTooltip.className = 'legend-custom-tooltip';
                    legendTooltip.style.cssText = `
                        position: absolute;
                        background-color: rgba(0, 0, 0, 0.9);
                        color: white;
                        padding: 8px 12px;
                        border-radius: 4px;
                        font-size: 11px;
                        z-index: 10001;
                        pointer-events: none;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                        max-width: 300px;
                    `;
                    legendTooltip.innerHTML = `
                        <strong>${dataset.label}</strong><br>
                        <span style="font-size: 10px;">${dataset.fullName}</span>
                    `;
                    legendTooltip.style.left = `${event.pageX + 15}px`;
                    legendTooltip.style.top = `${event.pageY - 10}px`;
                    document.body.appendChild(legendTooltip);
                }
            });
        });

        canvas.addEventListener('mouseleave', function() {
            if (legendTooltip) {
                legendTooltip.remove();
                legendTooltip = null;
            }
        });
    }
}

// 색상 생성 함수
function generateColors(length) {
    const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#C9CBCF', '#4D5360', '#AC92EC', '#4FC1E9'
    ];
    return Array.from({ length }, (_, i) => colors[i % colors.length]);
}




// 국가별 차트 로드
async function loadChartsForCountry(countryName, container) {
    container.innerHTML = ''; // 기존 내용을 초기화
    container.appendChild(closeButton); // 닫기 버튼 유지


    const jsonData = await loadJsonData();

    // 차트 정보
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

    // GeoJSON 데이터 로드 및 지도 렌더링
    fetch('https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: () => ({ color: '#999', weight: 1.5, fillColor: '#888', fillOpacity: 0.4 }),
            onEachFeature: (feature, layer) => {
                layer.on({
                    click: e => {
                        const countryName = feature.properties.ADMIN || feature.properties.name || 'Unknown';

                        // 팝업창 내부 HTML 생성
                        popupContainer.style.display = 'block';
                        adjustPopupPosition(e.originalEvent, popupContainer);
                        popupContainer.innerHTML = `
                           <h3 class="popup-country-name" style="cursor: pointer; color: black; text-decoration: none;" title="클릭하여 ${countryName}의 상세 분석 페이지로 이동">${countryName}</h3>
    <div id="popup-charts"></div>
`;

                        // 팝업 클릭 시 이동 이벤트 추가 (나라 선택 및 URL 업데이트)
                        const popupCountryName = document.querySelector('.popup-country-name');

                        // 툴팁 요소 생성
                        const countryTooltip = document.createElement('div');
                        countryTooltip.className = 'country-info-tooltip';
                        countryTooltip.style.cssText = `
                            position: absolute;
                            display: none;
                            background-color: rgba(0, 0, 0, 0.85);
                            color: white;
                            padding: 10px;
                            border-radius: 5px;
                            font-size: 12px;
                            z-index: 10000;
                            max-width: 250px;
                            pointer-events: none;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                        `;
                        document.body.appendChild(countryTooltip);

                        // 마우스 호버 이벤트 추가
                        popupCountryName.addEventListener('mouseenter', (event) => {
                            countryTooltip.innerHTML = `
                                <strong>${countryName}</strong><br>
                                <span style="font-size: 11px; color: #aaa;">클릭하여 상세 분석 페이지로 이동</span><br>
                                <span style="font-size: 10px; color: #888; margin-top: 5px; display: block;">아래 차트에 마우스를 올리면 상세 정보를 확인할 수 있습니다</span>
                            `;
                            countryTooltip.style.display = 'block';
                        });

                        popupCountryName.addEventListener('mousemove', (event) => {
                            countryTooltip.style.left = `${event.pageX + 15}px`;
                            countryTooltip.style.top = `${event.pageY + 15}px`;
                        });

                        popupCountryName.addEventListener('mouseleave', () => {
                            countryTooltip.style.display = 'none';
                        });

                        popupCountryName.addEventListener('click', () => {
                            const targetUrl = new URL('/WEB/web-layout/html/data/analysis_1.html', window.location.origin);
                            targetUrl.searchParams.set('country', countryName); // 쿼리 파라미터에 나라 추가
                            window.location.href = targetUrl; // 페이지 이동
                        });

                        // 시각화 데이터 로드
                        loadChartsForCountry(countryName, document.getElementById('popup-charts'));
                    },
                });
            },
        }).addTo(window.map);
    })
    .catch(error => console.error('Error loading GeoJSON:', error));

// 팝업 위치 조정 함수
function adjustPopupPosition(event, container) {
    const popupWidth = container.offsetWidth;
    const popupHeight = container.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let left = event.pageX + 15;
    let top = event.pageY + 15;

    if (left + popupWidth > windowWidth) left = windowWidth - popupWidth - 15;
    if (top + popupHeight > windowHeight) top = windowHeight - popupHeight - 15;

    container.style.left = `${left}px`;
    container.style.top = `${top}px`;
}

});
