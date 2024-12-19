# 천무-II 데이터 분석 프로젝트

본 프로젝트는 천무-II와 관련된 데이터 분석 및 시각화를 목표로 하며, 국방, 경제, 무기 시스템, 수출입 데이터 등 다양한 데이터를 통합적으로 분석하여 효율적인 의사결정을 지원합니다. 이 README에서는 각 데이터 테이블 및 분석 결과를 상세히 설명합니다.

---

## 📌 프로젝트 개요

### 주요 목적
1. **데이터 통합 및 분석**:
   - 국방 산업 및 경제 지표와 관련된 방대한 데이터를 통합.
   - 국가별 무기 수출입 및 군사비 지출 패턴을 시각적으로 분석.
2. **의사결정 지원**:
   - 데이터 기반 통찰력을 활용하여 무기 시스템의 효율성과 시장 경쟁력을 평가.
3. **정보 시각화**:
   - 그래프 및 대시보드를 통해 직관적으로 데이터 결과를 표현.

---

## 📂 데이터 테이블 상세 설명

### 1️⃣ **`governance_data`** (거버넌스 데이터)
- **설명**:
  국가별 거버넌스 관련 지표를 포함하는 데이터로, 정책 효율성과 국가별 안정성을 평가하는 데 사용됩니다.
- **주요 컬럼**:
  - `year`: 데이터가 측정된 연도.
  - `Country`: 국가 코드.
  - `indicator`: 측정된 지표의 이름.
  - `estimate_number`: 지표의 정량적 값.
  - `polityscore`: 정치 안정성을 나타내는 점수.

### 2️⃣ **`Economy_data`** (경제 데이터)
- **설명**:
  GDP, 무역, 소득 수준 등 국가 경제 지표를 포함하며, 군사비와 경제 간 상관관계를 분석하는 데 활용됩니다.
- **주요 컬럼**:
  - `GDP Weighted`: 가중치를 적용한 국내총생산.
  - `Income Weighted`: 가중치를 적용한 국민 소득.
  - `Trade Weighted`: 가중치를 적용한 무역 데이터.
  - `Log_Economic_Indicator`: 경제 지표의 로그 변환 값.

### 3️⃣ **`UCDP_data`** (분쟁 데이터)
- **설명**:
  국가별 분쟁 데이터를 포함하며, 분쟁의 빈도, 유형, 심각도를 분석합니다.
- **주요 컬럼**:
  - `Conflict incidents`: 연도별 발생한 분쟁 사건의 수.
  - `deaths_count`: 분쟁으로 인한 사망자 수.

### 4️⃣ **`weapon_import`** 및 **`weapon_system_Data`**
- **설명**:
  국가별 무기 시스템 및 수입 데이터를 포함하며, 무기 이동 경로와 시스템 유형을 분석합니다.
- **주요 컬럼**:
  - `weapon_destination`: 무기 수입 대상 국가.
  - `Category`: 무기 시스템의 종류 (예: 전차, 미사일 등).

### 5️⃣ **`arms_exports_data`** 및 **`arms_imports_data`**
- **설명**:
  국가별 연도별 무기 수출입 데이터를 포함합니다. 주요 무기 거래 네트워크를 분석하는 데 사용됩니다.
- **주요 컬럼**:
  - `Indicator`: 무기 수출입 지표.
  - 연도별 값 (1990~2020).

### 6️⃣ **`military_expenses_data`** (군사비 지출 데이터)
- **설명**:
  국가별 연도별 군사비 지출 데이터로, 군사 지출의 증가 또는 감소 추이를 파악합니다.
- **주요 컬럼**:
  - `Country`: 국가 코드.
  - 연도별 군사비 지출 값 (1990~2020).

---

## 📊 분석 결과 및 시각화

### 1️⃣ **경제와 군사비의 상관관계 분석**
- **분석 방법**:
  - 국가별 GDP 대비 군사비 지출 비율을 계산.
  - 주요 국가들의 경제 규모와 군사비 간 상관관계 시각화.
- **결과 시각화**:
  - **히트맵**: 국가별 연도별 GDP 대비 군사비 지출 비율.
  - **산점도**: GDP와 군사비 간의 상관관계.

### 2️⃣ **무기 수출입 네트워크 분석**
- **분석 방법**:
  - 주요 무기 수출국과 수입국을 네트워크 그래프로 시각화.
  - 각 국가의 무기 이동 패턴 및 주요 거래 상대국을 분석.
- **결과 시각화**:
  - **네트워크 그래프**: 국가 간 무기 수출입 경로.
  - **막대 그래프**: 주요 수출국의 연도별 수출 규모.

### 3️⃣ **SWOT 분석**
- **분석 방법**:
  - 무기 시스템 데이터와 경제 지표를 결합하여 SWOT 요소 도출.
  - 국가별 강점(Strengths), 약점(Weaknesses), 기회(Opportunities), 위협(Threats)을 정리.
- **결과 시각화**:
  - **표 형식 시각화**: SWOT 요약.

### 4️⃣ **분쟁 데이터와 군사비 관계 분석**
- **분석 방법**:
  - 분쟁 빈도와 군사비 지출 간 상관관계 분석.
  - 주요 분쟁 국가의 군사비 지출 변화 추이.
- **결과 시각화**:
  - **라인 차트**: 분쟁 빈도에 따른 군사비 변화.

---

## 🛠️ 기술 스택

- **Python**: 데이터 처리 및 분석.
- **SQL**: 데이터베이스 관리.
- **Pandas 및 NumPy**: 데이터프레임 및 수치 계산.
- **Matplotlib 및 Seaborn**: 데이터 시각화.
- **NetworkX**: 네트워크 그래프 생성.
- **Power BI**: 대시보드 시각화.

---

## 🚀 설치 및 실행 방법

### 요구사항
- Python 3.8 이상
- MySQL 또는 SQLite

### 설치 단계
1. 프로젝트 클론:
   ```bash
   git clone https://github.com/your-repo/Chunmoo-II-Project.git
   cd Chunmoo-II-Project
