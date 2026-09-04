# ISB Lab 網站實作計畫

> Intelligent Systems Biology Lab — 台北醫學大學 智慧醫療跨領域學士學位學程 杜岳華 助理教授
> 計畫日期：2026-09-02 · 狀態：已與主持人確認需求，進入實作

## 1. 目標

建立 ISB Lab 官方網站，同時滿足三種使用情境：

1. **對外學術門面**——國內外研究者、審查者快速認識主持人與研究
2. **學生招募**——向大學部學生介紹實驗室並引導加入專題
3. **簡報放映**——全螢幕 scroll-snap 分頁，向下捲動即投影片換頁，可直接向學生簡報

## 2. 已確認決策（訪談結論）

| 決策項 | 結論 |
|---|---|
| 實驗室名稱 | Intelligent Systems Biology Lab (ISB Lab)／智慧系統生物實驗室 |
| 語言 | 路由式雙語：中文（預設，`/`）＋ English（`/en/`），頁首切換 |
| 視覺風格 | 純黑白極簡（Architex 骨架）：白底黑字、大字標題、細線條網格、無彩色 accent |
| 技術棧 | Astro（零前端框架、純靜態輸出） |
| 部署 | GitHub Pages：`https://yuehhua.github.io/research/`（`base: '/research/'`） |
| 頭像 | `/run/media/yuehhua/Workbench/Profile/self/DSC02377-head.jpg`，灰階處理 |
| 亮點優先 | 四個專案：Virtual Embryo → GeometricFlux.jl → RAFAEL → CDGRNs.jl |
| 課程 | TMU 四門必修 ＋ 過往教學經歷（中研院 EMI 等） |
| 招募 | Join us 區塊，招募大學部專題生，mailto 聯絡 |

## 3. 資訊架構（= 投影片順序）

| # | 區塊 | 內容要點 |
|---|---|---|
| 00 | Header（固定，非投影片） | 實驗室名、語言切換、導覽錨點 |
| 01 | Hero | ISB Lab 全名、主持人職稱、定位標語、NeurIPS 2026 挑戰徽示、CTA（Join us / Research） |
| 02 | About | 彩色頭像、三段簡介（領域定位／跨域背景敘事／開源與社群＋目標）。**2026-09-02 修訂：應主持人要求移除逐年學經歷時間軸——避免「像履歷」**，校名/年份/職稱序列不再出現 |
| 03 | Research | 六大研究興趣卡片 ＋ 現況焦點（RNA velocity、GRN、cell-fate prediction、virtual cell、Virtual Embryo Challenge） |
| 04 | Projects | 四個亮點專案，編號大卡，各附量化指標 |
| 05 | Publications | 7 篇期刊論文（第一作者加粗標示），連結 DOI/PubMed |
| 06 | Teaching | TMU 四門必修（名稱/型態/學分/一句描述）＋ 過往教學精選 |
| 07 | Join us | 專題生招募條件、期望特質、mailto 按鈕 |
| — | Footer | 聯絡資訊、ORCID/GitHub/Scholar/個人站連結、版權 |

## 4. 設計系統（Design Tokens）— 2026-09-02 改版：天空藍 × 葉綠

> 初版為純黑白極簡；主持人看過後改為自然色系（活力 × 專業），從三個色票方案中選定「天空藍主色」。

```css
--sky-deep: #0b57a4;   /* 標題、頁尾底色 */
--sky:      #1971c2;   /* 按鈕、連結、活躍狀態 */
--sky-pale: #74c0fc;   /* 淡天藍點綴、線條 */
--sky-wash: #e7f5ff;   /* Hero 漸層底 */
--leaf:     #40a02b;   /* 綠葉點綴（徽章、第一作者標示） */
--leaf-wash:#f2faf4;   /* 課程區底色 */
--ink:      #16283c;   /* 內文（藍黑） */
--paper:    #ffffff;
```

- **字體**：Latin 用 Inter（@fontsource，weights 300–800）；中文用系統字堆疊（`PingFang TC`、`Noto Sans CJK TC`、`Microsoft JhengHei`），避免載入巨型 CJK webfont
- **字級**（fluid）：display `clamp(2.75rem, 8vw, 6rem)`；section 標題 `clamp(1.75rem, 4.5vw, 3.25rem)`；label `0.75rem / uppercase / letter-spacing 0.18em`；body `1rem–1.125rem`
- **版面**：12 欄概念網格、hairline 分隔、區塊編號 `01–07`、大量留白；桌機左右安全邊界 `clamp(1.25rem, 5vw, 6rem)`
- **自然元素**：Hero 天空漸層 + 真實櫻花葉照片（右下；CC0 rawpixel via Openverse，白底轉透明。2026-09-02 決議：手繪與程式生成線稿均被否決，維持照片）、課程區綠意 wash、深藍頁尾
- **頭像**：彩色（從原始照片重新產生，勿再加灰階濾鏡）

## 5. 互動行為規格

### 5.1 投影片模式（核心）
- 捲動容器：`scroll-snap-type: y mandatory`；每個 section：`min-height: 100svh`、`scroll-snap-align: start`
- 行動裝置地址列問題用 `100svh` 解決；內容溢出的區塊（如 Publications 清單）在 section 內部允許 `overflow-y: auto`，避免內容被 snap 困住
- **鍵盤**：`↓/→/PageDown/Space` 下一頁、`↑/←/PageUp` 上一頁、`Home/End` 首尾頁（攔截後 `scrollIntoView({behavior:'smooth'})`）
- **右側導覽點**：7 個點＋編號 tooltip，目前頁高亮（`IntersectionObserver` 追蹤）
- **頁碼指示器**：左下 `03 / 07` 固定顯示
- 手機上導覽點縮為細進度條（頂部），不佔內容空間

### 5.2 雙語
- 路由式：zh 在 `/`（prefixDefaultLocale: false）、en 在 `/en/`
- 切換為單純超連結（同一 section 錨點互通），無 JS 狀態、無閃爍、對 SEO 友善
- `<html lang>` 隨路由正確設定

### 5.3 其他
- Smooth scroll、`prefers-reduced-motion` 時停用動畫
- `@media print`：每個 section 強制分頁、隱藏導覽——可直接印成講義
- SEO 基礎：title/description/og tags、`hreflang` 互指 zh/en

## 6. Responsive 斷點

| 斷點 | 寬度 | 佈局調整 |
|---|---|---|
| Desktop | ≥1024px | 多欄網格、右側導覽點、Projects 兩欄 |
| Tablet | 768–1023px | 兩欄收合一欄、導覽點保留 |
| Mobile | <768px | 單欄、頂部進度條、大標題縮放、Hero CTA 全寬 |

## 7. 技術結構

```
research-blog/
├── astro.config.mjs        # site、base:'/research/'、i18n 設定
├── package.json
├── public/favicon.svg
├── src/
│   ├── styles/global.css   # tokens + base + print
│   ├── data/content.ts     # ★ 唯一內容來源：雙語結構化資料
│   ├── layouts/Slide.astro # section 包裹器（編號、snap、min-height）
│   ├── components/         # Header / NavDots / PageCounter / ProjectCard / ...
│   ├── pages/index.astro   # 中文版（預設路由）
│   └── pages/en/index.astro# 英文版
└── plan.md
```

內容資料模型（`content.ts`）：

```ts
profile    // 姓名/職稱/單位/聯絡/連結（ORCID、GitHub、Scholar、個人站）
about      // { zh/en }: bio 段落、timeline 事件
interests  // 6 項：{ zh/en }: name + desc
projects   // 4 項（亮點排序）：{ zh/en }: title, tag, desc, metrics[], links[]
pubs       // 7 項：authors, title, venue, year, firstAuthor, link(DOI/PubMed)
courses    // TMU 4 門 + pastTeaching：{ zh/en }: name, type, credits, desc
join       // { zh/en }: 條件、特質、CTA
```

> 維護方式：日後改內容只動 `src/data/content.ts` 一個檔案。

## 8. 部署

1. 本專案建議獨立 repo（例如 `research`）
2. GitHub Actions：`withastro/action` 建置 → `peaceiris/actions-gh-pages` 發佈 `dist/` 到 `yuehhua.github.io` repo 的 `/research` 目錄（`destination_dir: research`，`external_repository: true`，需 user 提供 PAT 或 deploy key）
3. 替代方案：本機 `npm run build` 後手動將 `dist/` 內容複製到部落格 repo 的 `research/` 資料夾
4. ⚠️ 所有資產路徑必須以 `import` 或 `/` 開頭由 Astro 處理，避免子路徑部署的相對路徑問題

## 9. 驗證計畫（每階段驗收）

| 階段 | 驗收標準 |
|---|---|
| S1 骨架 | `npm run dev` 正常渲染；`npm run build` 零錯誤；design tokens 生效 |
| S2 內容 | 資料計數正確（6 interests、4 projects、7 pubs、4 courses）；頭像優化後 <300KB 且灰階；論文連結可解析 |
| S3 版面 | zh/en 兩路由全區塊渲染；鍵盤導覽逐頁正確；html lang 正確 |
| S4 整體 | 1920/768/390 三寬度截圖檢查（zh+en）；所有外連 200；無 console 錯誤；print 樣式分頁正確 |

## 10. 實作階段

### Stage 1：專案骨架 ✔️ 完成（2026-09-02）
- [x] Astro 專案初始化（minimal 模板、無框架）
- [x] `astro.config.mjs`：site、base、i18n（zh 預設無前綴 / en 前綴）
- [x] `global.css`：tokens、字體（@fontsource-variable/inter）、reset、print
- [x] `Slide.astro` layout（snap section + 編號）
**驗收**：✅ build 691ms 零錯誤

### Stage 2：內容與素材 ✔️ 完成（2026-09-02）
- [x] 頭像：900×965 灰階 64KB → `src/assets/portrait.jpg`
- [x] `content.ts` 完整雙語內容（依 CV + 訪談；TMU 官方英文名已查證：Interdisciplinary Undergraduate Program in Intelligent Healthcare）
- [x] 查證 7 篇論文 DOI（Crossref + doi.org 全數解析）；GitHub links 驗證（RAFAEL 無公開 repo，不列）
**驗收**：✅ 6 interests、4 projects、7 pubs、4 courses

### Stage 3：版面與互動 ✔️ 完成（2026-09-02）
- [x] 7 個 section 版面（桌機→手機 responsive）
- [x] Header（錨點導覽 + 語言切換）
- [x] scroll-snap + 鍵盤 + 導覽點 + 頁碼
- [x] en 路由鏡像頁
**驗收**：✅ 兩語言全區塊渲染、零 console 錯誤
**修復記錄**：global.css 未被 import（鷹架重寫時遺漏）→ 已補；grid item `min-width:auto` 造成頭像撐破手機版 → `min-width:0` 修正；<1024px 改 `proximity` snap

### Stage 4：驗證與部署 ✔️ 完成（2026-09-02）
- [x] DOM 幾何驗證（scripts/qa-geometry.mjs）：桌機 1920×1080 兩語言全 slide 單螢幕 ✅；平板/手機無水平溢出，內容超出屬閱讀模式（proximity snap）
- [x] 42 張截圖 + 零 console 錯誤（scripts/verify.mjs）
- [x] 已部署：dist → yuehhua.github.io repo 的 research/ 目錄，線上驗證 200（zh/en/css）
- [ ] GitHub Actions 自動化 workflow（日後補；目前手動：build 後 rsync + push）
**驗收**：✅ 上線 https://yuehhua.github.io/research/

### Stage 5：課程獨立頁（lesson pages）✔️ 完成（2026-09-04）
- [x] 資料模型 `src/data/lessons.ts`（bilingual）：模組總覽＋每模組一個精選臨床轉譯案例；**不放**經營資訊（教科書/時數/配分——主持人明確拒絕）
- [x] `LessonPage.astro` 共用元件（一般捲動頁、`html.no-snap` 脫離 deck snap、per-lesson accent sky|leaf）
- [x] 首頁課程卡片經 `Course.slug` 連結 lesson 頁
- [x] 課程一：離散數學（accent sky；5 模組×5 案例；背景 discrete_math_Gemini.png 1376×768 → webp 16–52KB）
- [x] 課程二：資料結構與演算法（accent leaf；4 模組×4 案例；背景 data_structure_algo_Gemini.png 1408×768）
- [x] 課程三：生物資訊（accent leaf；6 個日期模組、無案例卡——`LessonModule.case` 改為選填；背景 bioinfo_Gemini.png 1408×768）
- [x] 課程四：智慧醫療大數據分析與實務——deck slide 已上（sky-wash、4 模組 chips），**詳細頁待主持人提供背景圖**
- [x] 課程總覽拆解（2026-09-04 晚）：2×2 卡片總覽 slide 移除，改為**每門課一頁 deck slide**（slideOrder: publications → 4 個課程 slug → join）；選單每門課一個「課程/Lesson」項目，作用中發光；`tmuCourses` 移除（lessons.ts 為唯一課程資料源）
- [x] Join 頁：slogan「想要跟老師一起貢獻科學研究」；「一對一指導」→「老師親自指導，共同創造」
**驗收**：✅ 全路由 build、零水平溢出 390–1920、snap=none、語言切換指向兄弟頁、pixel sampling 確認 hero（天空藍/葉綠）/scrim/footer

## 11. 設計理由（為何這樣做）

- **Astro 而非純 HTML**：主持人偏好 + 未來內容會增長（論文、課程逐年累積）；零 JS 框架輸出保證簡報時載入快速
- **路由式雙語而非 JS 切換**：無閃爍、無 JS 依賴、SEO 正確；代價（兩份 HTML）由 build 吸收
- **CSS scroll-snap 而非 JS 投影片庫**：原生、高效能、降級 graceful（沒有 JS 仍可捲動）
- **資料模組而非 content collections**：目前 ~25 筆紀錄，單檔 `content.ts` 是最小儀式感的單一真相來源
- **系統 CJK 字體**：CJK webfont 數 MB 重，系統字已足夠專業；Inter 只覆蓋 Latin

## 12. 開放事項（實作中處理）

- 論文 DOI/PubMed 連結於 Stage 2 逐篇查證
- 部署 token 設定需主持人操作（屆時提供步驟）
- Hero 標語草稿（zh：「以智慧系統觀點，解碼生命」/ en: "Decoding life through the lens of intelligent systems"）——實作後給主持人替換確認
