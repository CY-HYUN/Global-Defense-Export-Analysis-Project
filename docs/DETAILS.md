# DEFT — Methodology and Platform Details

Extended documentation for the [main README](../README.md). Every number here is taken from artifacts committed in this repo (`assets/data/`, `docs/analysis-results.pdf`, the methodology slides in `docs/Photo/`) or is directly recomputable from the committed datasets. The original Jupyter notebooks are not committed; where a figure comes from a notebook screenshot, the source image is cited.

## 1. Research questions

1. **Scoring** — Can economic, governance, and security indicators be integrated into a single per-country suitability score for defense-export targeting?
2. **Prediction** — How much of the variation in national weapon-import volume do those scores explain?
3. **Portfolio** — Can US ITAR/USML categories characterize each country's weapon-import portfolio?
4. **Clustering** — Can defense companies be grouped by product category to map competitive positions?

## 2. Data inventory (committed in `assets/data/`)

13 JSON files, 102,321 records total (~54 MB), plus per-cluster company files under `assets/data/companies/`.

| File | Records | Coverage | Content |
| --- | --- | --- | --- |
| `governance_data.json` | 24,242 | 189 countries, 1996-2020 | 6 WGI indicators (estimate, percentile rank) |
| `UCDP_GED_2023_data.json` | 24,205 | global | Georeferenced conflict events (coordinates) |
| `UCDP_WORLD_2023_data.json` | 24,113 | global | Conflict events, world dataset |
| `weapon_import.json` | 23,396 | 159 countries | Per-weapon import records with USML category |
| `UCDP_data.json` | 3,447 | 103 countries | Conflict intensity by country-year |
| `weapon_system_Data.json` | 1,816 | 151 countries | National weapon-system holdings |
| `arms_import_data.json` | 230 | 230 countries | SIPRI TIV imports, 1991-2020 (wide) |
| `military_expenses_data.json` | 209 | 209 countries | Military expenditure, 1991-2020 (wide) |
| `Economy_data.json` | 170 | 170 countries | Final weighted economic variables (scored set) |
| `arms_exports_data.json` | 140 | 140 countries | SIPRI TIV exports, 1991-2020 (wide) |
| `country_terrain_with_coordinates.json` | 133 | 133 countries | Terrain, infrastructure, coordinates |
| `R&D_Data.json` | 87 | 31 countries | Defense R&D programs |

Database design for the (unshipped) DB-backed variant: ERD in `docs/2조_프로젝트_ERD.png`.

## 3. Preprocessing

Source slides: `docs/Photo/photo_page-0003.jpg`, `photo_page-0004.jpg`.

### 3.1 Country-name standardization

Raw sources use 210+ name variants (UN notation, abbreviations, multilingual). Names were mapped to a canonical list, and countries were filtered out when at war, under UN arms embargo, lacking diplomatic relations with South Korea, or micro-states. The final scored set contains **170 countries** (`Economy_data.json`); the union of raw labels across all committed datasets is 296.

```python
country_mapping = {
    'USA': 'United States',
    'Korea, Republic of': 'South Korea',
    'Congo, Democratic Republic of the': 'Congo, Dem. Rep.',
}
```

### 3.2 Missing values

Linear interpolation on the 1991-2020 series:

```python
df_interpolated = df.interpolate(method='linear', limit_direction='both')
```

### 3.3 Outliers

Conflict deaths are heavy-tailed (e.g. Syria), so they are log-transformed before scaling, and zero-conflict countries are assigned the maximum score of 100 directly.

## 4. Scoring system

Source slides: `docs/Photo/photo_page-0005.jpg`, `photo_page-0006.jpg`.

### 4.1 Cycloid time weighting

Each year's value is weighted so that recent years dominate:

```python
def cycloid_weight(year, start_year=1991, end_year=2020):
    t = (year - start_year) / (end_year - start_year) * 2 * np.pi
    return t - np.sin(t)
```

Weights rise monotonically from 0.0 (1991) to 2π ≈ 6.28 (2020); by this formula the most recent 5 years carry about one third of the total 30-year weight.

### 4.2 Economic score

Weighted average of 9 cycloid-weighted World Bank variables (the exact weighted columns are visible in `Economy_data.json`): GDP growth, income distribution, military share of GDP, trade balance, international capital, unemployment, CPI, FX (dollar) reserves, public debt. The aggregate is log-transformed and min-max scaled to **20-80** (`MinMaxScaler(feature_range=(20, 80))`, per `photo_page-0006.jpg`).

### 4.3 Governance score

Mean percentile rank (`scaled_pctrank`) of the 6 WGI indicators: government effectiveness, regulatory quality, rule of law, voice and accountability, political stability, control of corruption.

### 4.4 Conflict score

Cycloid-weighted battle deaths (UCDP GED `bd_high`), summed per country, log-transformed, min-max scaled to 1-100, then reversed (`100 - scaled`) so more deaths = lower score. Countries with zero recorded conflict deaths score 100.

### 4.5 Grading (K-Means)

Source slide: `docs/Photo/photo_page-0007.jpg`.

`StandardScaler` on the three scores plus the average, then `KMeans(n_clusters=3, random_state=42)`; k = 3 chosen by the elbow method. Verified top of the ranking (average score, grade A):

| Country | Conflict | Economic | Governance | Average |
| --- | --- | --- | --- | --- |
| United States | 100.0 | 80.0 | 71.9 | 83.98 |
| Germany | 100.0 | 71.7 | 75.2 | 82.30 |
| Japan | 100.0 | 74.1 | 72.3 | 82.13 |
| Canada | 100.0 | 67.1 | 77.3 | 81.46 |
| Switzerland | 100.0 | 63.9 | 79.3 | 81.08 |
| Netherlands | 100.0 | 64.3 | 78.0 | 80.78 |
| Australia | 100.0 | 65.5 | 76.6 | 80.69 |
| France | 100.0 | 69.8 | 71.1 | 80.31 |

## 5. Regression: what predicts weapon imports?

Source: `docs/Photo/photo_page-0009.jpg` (statsmodels output) and `docs/analysis-results.pdf` p.9.

Model: OLS of `import_sum` (total SIPRI import TIV per country) on standardized features, 80/20 train/test split (`random_state=42`), 125 training observations, 5 predictors.

| Predictor | Coefficient | p-value | Reading |
| --- | --- | --- | --- |
| const | +17,940 | 0.000 | — |
| Conflict (`scaled_weighted_bd_high`) | -13,350 | 0.093 | borderline; the conflict score is reversed, so the direction is not settled |
| Economic (`Scaled Economic Indicator`) | **+23,170** | **0.000** | only predictor significant at 5% |
| Governance (`scaled_pctrank`) | +1,100 | 0.791 | not significant |
| Cluster B dummy | +3,475 | 0.497 | not significant |
| Cluster C dummy | -10,600 | 0.249 | not significant |

Fit: R² = 0.366, adjusted R² = 0.340, F = 13.75 (Prob F = 1.35e-10); held-out test R² = 0.461.

Interpretation notes:

- Features were standardized (`StandardScaler`), so coefficients read as TIV change per one standard deviation, not per raw point.
- The report attributes the moderate R² to TIV counting transfer volume rather than price, and to unmodeled drivers: alliances, political decisions, offset/technology-transfer deals.

## 6. Weapon-portfolio analysis (ITAR/USML)

`weapon_import.json` maps each SIPRI import record to one of the 22 US ITAR/USML categories. Recomputable example — South Korea (509 records, 1991-2020), share of import records by category:

| USML category | Share of records |
| --- | --- |
| 4 — Launch vehicles, missiles | 34.8% |
| 8 — Aircraft | 20.6% |
| 11 — Military electronics | 11.0% |
| 19 — Gas turbine engines | 7.7% |
| 6 — Surface vessels | 6.7% |

Weighted by units ordered instead, category 4 dominates (61.5%), reflecting large missile batch orders.

## 7. Company clustering

Source slides: `docs/Photo/photo_page-0012.jpg`, data in `assets/data/companies/`.

Defense companies grouped into 5 clusters by product portfolio: (1) aviation and space, (2) naval defense and shipbuilding, (3) ground weapon systems, (4) electronics and C4ISR, (5) foreign companies (USA, Germany, UK, France). Domestic company names are anonymized (Company1, Company2, ...) in the published data.

## 8. Web platform pages

All paths verified against the repo; serve with `python -m http.server 8000` from the project root.

| Page | Path | Features |
| --- | --- | --- |
| Global dashboard | `index.html` | Leaflet world map with per-country popups; optional defense-news feed (NewsAPI key in `js/config.js`) |
| Project intro | `html/about_project/layout-static_1.html` | Background and goals |
| Data tables | `html/about_project/layout-static_4.html` | 9 datasets, search/sort/filter/CSV export (DataTables) |
| Charts | `html/analysis/research_layout_2.html` | GDP, governance radar, arms-import charts (Chart.js) |
| Country detail | `html/data/analysis_1.html` | Economic lines, WGI radar, arms trade, spending, weapon-system pies |
| Country comparison | `html/data/analysis_3.html` | Up to 3 countries side-by-side + single-country deep dive |
| Company clusters | `html/data/company/` | Per-cluster product-category pies and company tables |
| Per-country maps | `html/map/*.html` | 196 generated country map pages |

`scripts/` contains the Python utilities used to generate and maintain the per-country pages (`update_company_pages.py`, `update_maps_zoom*.py`, `update_sidebar_script.py`).

## 9. Limitations and future work

- **Explanatory power** — R² = 0.366; alliance dummies (NATO/QUAD), defense-budget growth, and regional arms-race indices are the natural next predictors.
- **Recency** — data ends 2020; the post-2022 market shift is absent.
- **Price blindness** — SIPRI TIV is a volume index; integrating contract-value data (e.g. DSCA) would let the model target revenue instead of volume.
- **Grade granularity** — the zero-conflict = 100 rule puts many countries at the conflict ceiling, compressing that axis.

## 10. References

- Levine, P., & Smith, R. (2000). "The arms trade and arms control". *Economic Journal*, 110(460), F335-F346.
- Blom, M., & Perlo-Freeman, S. (2003). "The Arms Trade in the 1990s: Economic and Strategic Factors". *Defence and Peace Economics*, 14(5), 345-360.
- Thurner, P. W., et al. (2019). "Network interdependencies and the evolution of the international arms trade". *Journal of Conflict Resolution*, 63(7), 1736-1764.

Data: [SIPRI](https://www.sipri.org/databases) · [World Bank](https://data.worldbank.org/) · [UCDP](https://ucdp.uu.se/) · [WGI](https://www.worldbank.org/en/publication/worldwide-governance-indicators) · [US ITAR/USML](https://www.pmddtc.state.gov/)
