# 프로젝트 테스트 가이드
# Project Testing Guide

## 🎯 현재 상태

### ✅ 완료된 작업
1. 데이터 파일들이 새 위치로 이동됨
   - `WEB/assets/data/core/` - 핵심 데이터
   - `WEB/assets/data/conflicts/` - 분쟁 데이터
   - `WEB/assets/data/companies/clusters/` - 기업 군집 데이터

2. 이미지 파일들이 새 위치로 이동됨
   - `WEB/assets/images/logos/dmz-logo.png`
   - `WEB/assets/images/icons/`
   - `WEB/assets/images/photos/`
   - `WEB/assets/images/diagrams/`
   - `WEB/assets/images/graphs/`

3. JavaScript 파일들의 경로 업데이트 완료
   - `WEB/web-layout/js/` 내 모든 파일
   - 데이터 fetch 경로가 `../assets/data/`로 변경됨

4. HTML 파일들의 이미지 경로 업데이트 완료
   - `WEB/web-layout/html/` 내 모든 파일

### 📂 작동하는 파일 위치

**메인 프로젝트 파일**: `WEB/web-layout/`

이 폴더의 파일들을 브라우저에서 열어야 합니다!

## 🧪 테스트 순서

### 1단계: 메인 페이지 테스트

**파일 경로**:
```
d:\Study\Github\Global Defense Export Analysis Project\WEB\web-layout\index.html
```

**확인 사항**:
- [  ] DMZ 로고가 보이는가?
- [  ] 페이지 스타일이 정상인가?
- [  ] 네비게이션 메뉴가 작동하는가?
- [  ] 지도가 표시되는가?

### 2단계: 데이터 분석 페이지 (국가별)

**파일 경로**:
```
d:\Study\Github\Global Defense Export Analysis Project\WEB\web-layout\html\data\analysis_1.html
```

**확인 사항**:
- [  ] 페이지가 로드되는가?
- [  ] Country 드롭다운이 표시되는가?
- [  ] Country 선택 시 데이터가 로드되는가?
- [  ] 차트들이 표시되는가?
  - [  ] GDP 차트
  - [  ] Governance 레이더 차트
  - [  ] Military Expenditure 차트
  - [  ] Arms Trade 차트
  - [  ] Weapon Systems 파이 차트
  - [  ] Weapon Imports 파이 차트

**콘솔 에러 확인**:
- F12 → Console 탭에서 에러 메시지 확인

### 3단계: 기업 데이터 페이지

**파일 경로**:
```
d:\Study\Github\Global Defense Export Analysis Project\WEB\web-layout\html\data\analysis_2.html
```

**확인 사항**:
- [  ] 기업 데이터 로드되는가?
- [  ] 군집별 차트가 표시되는가?

### 4단계: 비교 분석 페이지

**파일 경로**:
```
d:\Study\Github\Global Defense Export Analysis Project\WEB\web-layout\html\data\analysis_3.html
```

### 5단계: 프로젝트 개요 페이지

**파일 경로**:
```
d:\Study\Github\Global Defense Export Analysis Project\WEB\web-layout\html\about_project\layout-static_1.html
d:\Study\Github\Global Defense Export Analysis Project\WEB\web-layout\html\about_project\layout-static_4.html
```

**확인 사항**:
- [  ] 이미지들이 표시되는가?
- [  ] 아이콘들이 표시되는가?
- [  ] 다이어그램이 표시되는가?

## 🐛 일반적인 문제 해결

### 문제 1: DMZ 로고가 안 보임
**원인**: 경로 문제
**해결**:
```html
<!-- 올바른 경로 확인 -->
<img src="../assets/images/logos/dmz-logo.png" />
```

### 문제 2: 데이터가 로드되지 않음
**원인**: JSON fetch 경로 문제
**확인**: 브라우저 콘솔에서 에러 메시지 확인
```
Failed to load resource: net::ERR_FILE_NOT_FOUND
```

**해결**: JS 파일에서 경로 확인
```javascript
// 올바른 경로
fetch('../assets/data/core/economy.json')
```

### 문제 3: Country selector가 작동하지 않음
**원인**:
1. common.js 로드 실패
2. 이벤트 리스너 문제

**확인**:
1. F12 → Network 탭에서 common.js 로드 확인
2. Console에서 에러 메시지 확인

### 문제 4: 차트가 표시되지 않음
**원인**:
1. Chart.js 로드 실패
2. 데이터 로드 실패
3. Canvas 요소 없음

**확인**:
1. Network 탭에서 Chart.js CDN 로드 확인
2. Console에서 데이터 로드 에러 확인
3. Elements 탭에서 `<canvas>` 요소 확인

## 🔍 디버깅 체크리스트

브라우저에서 각 페이지를 열고:

### 1. Network 탭 확인
```
- CSS 파일들이 로드되는가? (200 OK)
- JavaScript 파일들이 로드되는가? (200 OK)
- JSON 데이터 파일들이 로드되는가? (200 OK)
- 이미지 파일들이 로드되는가? (200 OK)
```

### 2. Console 탭 확인
```
- CORS 에러가 있는가?
- 파일을 찾을 수 없다는 에러가 있는가?
- JavaScript 에러가 있는가?
```

### 3. Elements 탭 확인
```
- 이미지 src 속성이 올바른가?
- Canvas 요소가 존재하는가?
- 데이터가 DOM에 렌더링되었는가?
```

## 📝 테스트 결과 기록

각 페이지를 테스트하고 결과를 기록하세요:

| 페이지 | 파일 경로 | 상태 | 문제점 | 해결 방법 |
|--------|----------|------|--------|-----------|
| 메인 페이지 | web-layout/index.html | ⬜ | | |
| 국가 데이터 | web-layout/html/data/analysis_1.html | ⬜ | | |
| 기업 데이터 | web-layout/html/data/analysis_2.html | ⬜ | | |
| 비교 분석 | web-layout/html/data/analysis_3.html | ⬜ | | |
| 프로젝트 개요 | web-layout/html/about_project/layout-static_1.html | ⬜ | | |
| 데이터 개요 | web-layout/html/about_project/layout-static_4.html | ⬜ | | |

## 🚀 다음 단계

테스트 완료 후:
1. 발견된 문제점 리스트 작성
2. 각 문제의 원인 파악
3. 우선순위 설정
4. 수정 작업 진행
