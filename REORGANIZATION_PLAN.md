# 프로젝트 폴더 재구성 계획 (Project Reorganization Plan)

## 현재 구조의 문제점 (Current Issues)

1. **HTML 파일 중복 위치** - 루트와 `/html/` 폴더에 혼재
2. **JS/CSS 파일 평면 구조** - 기능별 분류 없음
3. **데이터 파일 혼재** - JSON, 이미지, 문서가 한 폴더에
4. **196개 국가 맵 HTML** - 단일 폴더에 모두 위치
5. **군집 데이터 분산** - 일관성 없는 구조

---

## 최적화된 새 구조 (Optimized New Structure)

```
WEB/
├── src/                          # 소스 코드 (Source Code)
│   ├── pages/                    # HTML 페이지 (Pages)
│   │   ├── index.html           # 메인 랜딩 페이지
│   │   ├── dashboard.html       # 대시보드
│   │   ├── charts.html          # 차트 페이지
│   │   ├── login.html           # 로그인
│   │   │
│   │   ├── about/               # 프로젝트 소개
│   │   │   ├── introduction.html
│   │   │   ├── data-overview.html
│   │   │   └── methodology.html
│   │   │
│   │   ├── analysis/            # 분석 페이지
│   │   │   ├── research-process.html
│   │   │   ├── visualizations.html
│   │   │   └── demo.html
│   │   │
│   │   ├── data/                # 데이터 페이지
│   │   │   ├── country-data.html
│   │   │   ├── company-data.html
│   │   │   ├── comparison.html
│   │   │   │
│   │   │   ├── companies/       # 기업별 페이지
│   │   │   │   ├── aviation-space.html
│   │   │   │   ├── ground-defense.html
│   │   │   │   ├── naval-defense.html
│   │   │   │   ├── electronics-systems.html
│   │   │   │   └── foreign-companies.html
│   │   │   │
│   │   │   └── clusters/        # 군집 분석 페이지
│   │   │       ├── cluster-1.html
│   │   │       ├── cluster-2.html
│   │   │       ├── cluster-3.html
│   │   │       └── cluster-4.html
│   │   │
│   │   └── maps/                # 국가별 맵 (196개 파일)
│   │       ├── afghanistan.html
│   │       ├── china.html
│   │       └── ... (194 more)
│   │
│   ├── styles/                  # CSS 스타일시트
│   │   ├── base/               # 기본 스타일
│   │   │   └── layout.css
│   │   │
│   │   ├── pages/              # 페이지별 스타일
│   │   │   ├── main.css
│   │   │   ├── dashboard.css
│   │   │   ├── research.css
│   │   │   └── company-news.css
│   │   │
│   │   └── index.css           # 통합 스타일시트 (선택사항)
│   │
│   └── scripts/                # JavaScript 파일
│       ├── core/               # 핵심 기능
│       │   ├── common.js
│       │   ├── main.js
│       │   └── config.js
│       │
│       ├── features/           # 기능별 모듈
│       │   ├── map/
│       │   │   ├── map.js
│       │   │   ├── navigation.js
│       │   │   └── country-loader.js
│       │   │
│       │   ├── visualization/
│       │   │   ├── charts/
│       │   │   │   ├── company-charts.js
│       │   │   │   ├── economy-charts.js
│       │   │   │   ├── governance-charts.js
│       │   │   │   ├── military-charts.js
│       │   │   │   ├── arms-trade-charts.js
│       │   │   │   └── weapon-charts.js
│       │   │   │
│       │   │   └── radar/
│       │   │       └── governance-radar.js
│       │   │
│       │   ├── data-tables/
│       │   │   ├── datatables-demo.js
│       │   │   └── datatables-with-charts.js
│       │   │
│       │   ├── ui/
│       │   │   ├── popup.js
│       │   │   ├── hover-sync.js
│       │   │   ├── dropdown-handler.js
│       │   │   └── search.js
│       │   │
│       │   └── data/
│       │       ├── rd-data.js
│       │       └── company-news.js
│       │
│       └── utils/              # 유틸리티
│           ├── analysis.js
│           ├── detail.js
│           └── research-layout.js
│
├── assets/                     # 정적 자산 (Static Assets)
│   ├── data/                   # 데이터 파일
│   │   ├── core/              # 핵심 데이터
│   │   │   ├── arms-exports.json
│   │   │   ├── arms-imports.json
│   │   │   ├── economy.json
│   │   │   ├── governance.json
│   │   │   ├── military-expenses.json
│   │   │   ├── research-development.json
│   │   │   ├── weapon-systems.json
│   │   │   ├── weapon-imports.json
│   │   │   └── country-terrain.json
│   │   │
│   │   ├── conflicts/         # 분쟁 데이터
│   │   │   ├── ucdp-main.json
│   │   │   ├── ucdp-ged-2023.json
│   │   │   └── ucdp-world-2023.json
│   │   │
│   │   └── companies/         # 기업 데이터
│   │       ├── clusters/      # 군집별
│   │       │   ├── cluster-1/ # 항공우주
│   │       │   │   ├── company-1.json
│   │       │   │   └── ...
│   │       │   ├── cluster-2/ # 해양방위
│   │       │   ├── cluster-3/ # 지상방위
│   │       │   ├── cluster-4/ # 전자시스템
│   │       │   └── cluster-5/ # 해외기업
│   │       │       ├── usa/
│   │       │       ├── uk/
│   │       │       ├── france/
│   │       │       ├── germany/
│   │       │       └── china/
│   │
│   ├── images/                # 이미지 파일
│   │   ├── logos/
│   │   │   └── dmz-logo.png
│   │   │
│   │   ├── icons/
│   │   │   ├── csv-icon.png
│   │   │   ├── excel-icon.png
│   │   │   ├── pdf-icon.png
│   │   │   └── zip-icon.png
│   │   │
│   │   ├── photos/
│   │   │   ├── military-personnel.png
│   │   │   ├── tank-1.png
│   │   │   ├── tank-2.png
│   │   │   └── project-background.png
│   │   │
│   │   ├── diagrams/
│   │   │   ├── project-diagram.png
│   │   │   ├── expected-effects.png
│   │   │   └── analysis-visualization.png
│   │   │
│   │   └── graphs/            # 생성된 그래프
│   │       ├── gdp/           # 196개 국가
│   │       │   ├── afghanistan.png
│   │       │   └── ...
│   │       │
│   │       ├── governance/    # 189개
│   │       │   └── ...
│   │       │
│   │       ├── imports/       # 156개
│   │       │   └── ...
│   │       │
│   │       └── top20/         # 7개 카테고리
│   │           └── ...
│   │
│   ├── fonts/                 # 폰트 파일
│   │   ├── Pretendard-Regular.otf
│   │   ├── Pretendard-SemiBold.otf
│   │   └── Pretendard-ExtraBold.otf
│   │
│   └── documents/             # 문서 파일
│       ├── project-plan.pdf
│       ├── report.pdf
│       ├── analysis-results.pdf
│       └── cluster-5-archive.zip
│
├── docs/                      # 프로젝트 문서
│   ├── final-report.pdf
│   ├── presentation.pptx
│   ├── erd-diagram.png
│   └── erd-diagram-korean.png
│
└── README.md                  # 프로젝트 README

```

---

## 주요 개선 사항 (Key Improvements)

### 1. 명확한 관심사 분리 (Clear Separation of Concerns)
- **src/** - 소스 코드 (HTML, CSS, JS)
- **assets/** - 정적 자산 (데이터, 이미지, 폰트, 문서)
- **docs/** - 프로젝트 문서

### 2. 기능별 JS 모듈화 (Modular JS by Feature)
- **core/** - 공통 기능
- **features/** - 기능별 모듈 (맵, 시각화, 데이터테이블, UI, 데이터)
- **utils/** - 유틸리티 함수

### 3. 데이터 타입별 분류 (Data Organization by Type)
- **core/** - 핵심 분석 데이터
- **conflicts/** - 분쟁 데이터
- **companies/** - 기업 데이터 (군집별)

### 4. 이미지 용도별 분류 (Image Organization by Purpose)
- **logos/** - 로고
- **icons/** - 아이콘
- **photos/** - 사진
- **diagrams/** - 다이어그램
- **graphs/** - 생성된 그래프 (GDP, governance, imports, top20)

### 5. 의미있는 파일명 (Semantic Naming)
- 언더스코어(_) → 하이픈(-) 변경
- 영문 약어 통일 (R&D → research-development)
- 명확한 이름 (dash.html → dashboard.html)

---

## 경로 업데이트 규칙 (Path Update Rules)

### HTML에서 CSS 참조
```html
<!-- 기존 -->
<link href="css/styles.css" rel="stylesheet" />

<!-- 변경 후 -->
<link href="../styles/pages/dashboard.css" rel="stylesheet" />
```

### HTML에서 JS 참조
```html
<!-- 기존 -->
<script src="js/common.js"></script>

<!-- 변경 후 -->
<script src="../scripts/core/common.js"></script>
```

### JS에서 데이터 참조
```javascript
// 기존
fetch('data/arms_exports_data.json')

// 변경 후
fetch('../assets/data/core/arms-exports.json')
```

### CSS에서 폰트 참조
```css
/* 기존 */
src: url('../font/Pretendard-Regular.otf')

/* 변경 후 */
src: url('../../assets/fonts/Pretendard-Regular.otf')
```

---

## 파일명 변경 매핑 (File Rename Mapping)

### HTML Files
- `dash.html` → `dashboard.html`
- `layout-static_1.html` → `introduction.html`
- `layout-static_4.html` → `data-overview.html`
- `research_layout_1.html` → `research-process.html`
- `research_layout_2.html` → `visualizations.html`
- `research_layout_2_demo.html` → `demo.html`
- `analysis_1.html` → `country-data.html`
- `analysis_2.html` → `company-data.html`
- `analysis_3.html` → `comparison.html`
- `항공및우주기술.html` → `aviation-space.html`
- `지상방위및무기시스템.html` → `ground-defense.html`
- `해양방위및조선업.html` → `naval-defense.html`
- `전자및시스템주요제품.html` → `electronics-systems.html`
- `해외기업.html` → `foreign-companies.html`
- `군집1.html` → `cluster-1.html`
- `군집2.html` → `cluster-2.html`
- `군집3.html` → `cluster-3.html`
- `군집4.html` → `cluster-4.html`
- `{Country}_map.html` → `{country-lowercase}.html`

### CSS Files
- `main_css.css` → `main.css`
- `styles.css` → `dashboard.css`
- `layout.css` → `layout.css` (no change)
- `research_layout_2.css` → `research.css`
- `company_news.css` → `company-news.css`

### JavaScript Files
- `scripts.js` → `main.js`
- `scripts_.js` → (merge into main.js or remove if duplicate)
- `Company_chart.js` → `company-charts.js`
- `Economy_data.js` → `economy-charts.js`
- `governance_chart.js` → `governance-charts.js`
- `governance_radar.js` → `governance-radar.js`
- `military_expend.js` → `military-charts.js`
- `arms_trade_data.js` → `arms-trade-charts.js`
- `R&D_Data.js` → `rd-data.js`
- `weapon_system_pie.js` → `weapon-charts.js`
- `weapon_import_pie.js` → (merge into weapon-charts.js)
- `navigateCountry.js` → `navigation.js`
- `interactivePopup.js` → `popup.js`
- `hoverSync.js` → `hover-sync.js`
- `datatables-simple-demo.js` → `datatables-demo.js`
- `datatables_withcharts.js` → `datatables-with-charts.js`
- `dropdownUrlHandler.js` → `dropdown-handler.js`
- `dropdownUrlUpdater.js` → (merge into dropdown-handler.js)
- `research_layout_2.js` → `research-layout.js`
- `company_news.js` → `company-news.js`

### Data Files
- `arms_exports_data.json` → `arms-exports.json`
- `arms_import_data.json` → `arms-imports.json`
- `Economy_data.json` → `economy.json`
- `governance_data.json` → `governance.json`
- `military_expenses_data.json` → `military-expenses.json`
- `R&D_Data.json` → `research-development.json`
- `weapon_system_Data.json` → `weapon-systems.json`
- `weapon_import.json` → `weapon-imports.json`
- `UCDP_data.json` → `ucdp-main.json`
- `UCDP_GED_2023_data.json` → `ucdp-ged-2023.json`
- `UCDP_WORLD_2023_data.json` → `ucdp-world-2023.json`
- `나라별지형_with_coordinates.json` → `country-terrain.json`

### Image Files
- `logo.png` → `dmz-logo.png`
- `free-icon-csv-file-11471469.png` → `csv-icon.png`
- `free-icon-excel-document-12583548.png` → `excel-icon.png`
- `free-icon-pdf-337946.png` → `pdf-icon.png`
- `free-icon-zip-354755.png` → `zip-icon.png`
- `군인사진.png` → `military-personnel.png`
- `탱크사진.png` → `tank-1.png`
- `탱크사진1.png` → `tank-2.png`
- `프로젝트배경.png` → `project-background.png`
- `기대효과.png` → `expected-effects.png`
- `다이어그램.png` → `project-diagram.png`
- `주요분석결과page_시각화사진.png` → `analysis-visualization.png`

### Document Files
- `plan.pdf` → `project-plan.pdf`
- `report_2.pdf` → `report.pdf`
- `한화에어로스페이스_스마트_데이터_분석과정_2조_주요분석결과.pdf` → `analysis-results.pdf`
- `군집5.zip` → `cluster-5-archive.zip`

---

## 실행 순서 (Implementation Order)

1. ✅ 새 폴더 구조 생성
2. ✅ 정적 자산 이동 (데이터, 이미지, 폰트, 문서)
3. ✅ CSS 파일 이동 및 이름 변경
4. ✅ JavaScript 파일 이동 및 이름 변경
5. ✅ HTML 파일 이동 및 이름 변경
6. ✅ CSS 내부 경로 업데이트 (폰트, 이미지)
7. ✅ JavaScript 내부 경로 업데이트 (데이터 fetch)
8. ✅ HTML 내부 경로 업데이트 (CSS, JS, 이미지 링크)
9. ✅ 모든 링크 검증
10. ✅ 기존 폴더 정리

---

## 예상 효과 (Expected Benefits)

1. **유지보수성 향상** - 파일 찾기 쉬움
2. **확장성 개선** - 새 기능 추가 용이
3. **협업 효율 증가** - 명확한 구조
4. **빌드 시스템 도입 가능** - 모듈화된 구조로 Webpack/Vite 적용 가능
5. **버전 관리 개선** - 기능별 커밋 가능
6. **로딩 성능 최적화** - 필요한 파일만 로드 가능

