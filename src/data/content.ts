/**
 * content.ts — the single source of truth for all site content.
 * Update this file to change anything on the website (both languages).
 */

export type Lang = 'zh' | 'en';

export interface L<T> {
  zh: T;
  en: T;
}

/* ---------------------------------------------------------- */
/* UI chrome strings                                           */
/* ---------------------------------------------------------- */

export const ui = {
  nav: {
    about: { zh: '關於', en: 'About' },
    research: { zh: '研究', en: 'Research' },
    projects: { zh: '專案', en: 'Projects' },
    publications: { zh: '論文', en: 'Papers' },
    teaching: { zh: '課程', en: 'Teaching' },
    join: { zh: '加入我們', en: 'Join us' },
  },
  scrollHint: { zh: '捲動或按 ↓ 換頁', en: 'Scroll or press ↓' },
  langToggle: { zh: 'EN', en: '中文' },
  backToTop: { zh: '回封面', en: 'Back to top' },
  viewPaper: { zh: '論文連結', en: 'View paper' },
  currentFocus: { zh: '現況焦點', en: 'Current focus' },
} as const;

export const slideOrder = [
  'hero',
  'about',
  'research',
  'projects',
  'publications',
  'teaching',
  'join',
] as const;

/* ---------------------------------------------------------- */
/* Identity                                                    */
/* ---------------------------------------------------------- */

export const profile = {
  labName: 'Intelligent Systems Biology Lab',
  labShort: 'ISB Lab',
  labNameZh: '智慧系統生物實驗室',
  name: { zh: '杜岳華', en: 'Yueh-Hua Tu' },
  degree: 'PhD',
  title: { zh: '助理教授', en: 'Assistant Professor' },
  affiliation: {
    zh: '臺北醫學大學 跨領域學院 智慧醫療跨領域學士學位學程',
    en: 'Interdisciplinary Undergraduate Program in Intelligent Healthcare, College of Interdisciplinary Studies, Taipei Medical University',
  },
  email: 'yuehhua.tu@tmu.edu.tw',
  links: [
    { label: 'GitHub', href: 'https://github.com/yuehhua' },
    { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=mtntSmgAAAAJ' },
    { label: 'ORCID', href: 'https://orcid.org/0000-0002-1554-1753' },
    { label: 'yuehhua.github.io', href: 'https://yuehhua.github.io/' },
  ],
};

export const hero = {
  tagline: {
    zh: '以智慧系統觀點，解碼生命',
    en: 'Decoding life through the lens of intelligent systems',
  },
  sub: {
    zh: '計算生物學 × 機器學習 — 從基因調控網路到虛擬細胞，我們用模型理解細胞如何做決定。',
    en: 'Computational biology × machine learning — from gene regulatory networks to virtual cells, we model how cells make decisions.',
  },
  challengeBadge: {
    zh: 'NeurIPS 2026 Virtual Embryo Challenge — 參賽中',
    en: 'NeurIPS 2026 Virtual Embryo Challenge — competing',
  },
  challengeUrl: 'https://virtualembryo.ai/challenge',
  cta: {
    research: { zh: '看我們的研究', en: 'Explore research' },
    join: { zh: '加入實驗室', en: 'Join the lab' },
  },
};

/* ---------------------------------------------------------- */
/* About                                                       */
/* ---------------------------------------------------------- */

export const about = {
  bio: [
    {
      zh: '杜岳華是計算生物學家，專長機器學習與深度學習模型設計。他以系統生物學的觀點解析生物問題——從基因調控網路、RNA velocity 到虛擬細胞（virtual cell）——研究細胞命運決定背後的動力學法則。他致力以 AI 解構生命的運作原理，拓展疾病模型，推進對於疾病的理解。',
      en: 'Yueh-Hua Tu is a computational biologist specializing in machine learning and deep learning model design. He takes a systems-level view of biology—from gene regulatory networks and RNA velocity to virtual cells—to uncover the dynamics that govern cell-fate decisions. He aims to deconstruct the operating principles of life with AI, expand disease models, and advance our understanding of disease.',
    },
    {
      zh: '他的背景橫跨資訊工程與生物醫學：一方面寫程式、設計模型、打造高效能運算框架，一方面理解實驗科學的語言與限制。這樣的雙重訓練，讓他習慣把濕實驗室的問題轉譯成可計算的問題——細菌基因體、全基因體關聯分析、單細胞轉錄體到生成式細胞模型，都在他處理過的資料光譜上。',
      en: 'His background bridges computer engineering and biomedicine: he writes code, designs models and builds high-performance computing frameworks, while speaking the language—and respecting the limits—of experimental science. This dual training makes him fluent in translating bench-side questions into computable ones; bacterial genomes, genome-wide association studies, single-cell transcriptomes and generative cell models all sit on his data spectrum.',
    },
    {
      zh: '他也是 Julia Taiwan 社群共同創辦人與開源貢獻者——GeometricFlux.jl 是 Julia 官方機器學習生態系 Flux.jl 的幾何深度學習庫。',
      en: 'He co-founded the Julia Taiwan community and contributes to open source—GeometricFlux.jl is the geometric deep learning library of the official Julia ML ecosystem, Flux.jl.',
    },
  ] as L<string>[],
};

/* ---------------------------------------------------------- */
/* Research                                                    */
/* ---------------------------------------------------------- */

export const interests: { name: L<string>; desc: L<string> }[] = [
  {
    name: { zh: '計算生物學', en: 'Computational Biology' },
    desc: {
      zh: '以演算法與統計模型解析生物系統，把生物問題變成可計算的問題。',
      en: 'Turning biological questions into computable ones with algorithms and statistical models.',
    },
  },
  {
    name: { zh: '網路與系統生物學', en: 'Network & Systems Biology' },
    desc: {
      zh: '基因調控網路、蛋白質交互作用網路——以系統層級觀點理解生命。',
      en: 'Gene regulatory and protein interaction networks—understanding life at the systems level.',
    },
  },
  {
    name: { zh: '機器學習與深度學習模型設計', en: 'ML & DL Model Design' },
    desc: {
      zh: '幾何深度學習與生成式模型，為結構化生物資料量身打造模型架構。',
      en: 'Geometric deep learning and generative models, tailored to structured biological data.',
    },
  },
  {
    name: { zh: '單細胞定序資料分析', en: 'Single-cell Analysis' },
    desc: {
      zh: 'scRNA-seq、空間轉錄體與 RNA velocity——在單細胞解析度追蹤細胞狀態。',
      en: 'scRNA-seq, spatial transcriptomics and RNA velocity—tracking cell states at single-cell resolution.',
    },
  },
  {
    name: { zh: '多體學分析', en: 'Multi-omics Integration' },
    desc: {
      zh: '整合基因體、轉錄體與蛋白體資料，建構完整的分子圖像。',
      en: 'Integrating genome, transcriptome and proteome data into a coherent molecular picture.',
    },
  },
  {
    name: { zh: '虛擬細胞', en: 'Virtual Cell' },
    desc: {
      zh: '以生成式 AI 建構可預測、可擾動的細胞數位分身。',
      en: 'Generative-AI digital twins of cells that are predictive and perturbable.',
    },
  },
];

export const focusChips: L<string>[] = [
  { zh: 'RNA velocity', en: 'RNA velocity' },
  { zh: '基因調控網路', en: 'Gene regulatory networks' },
  { zh: '細胞命運預測', en: 'Cell-fate prediction' },
  { zh: '虛擬細胞', en: 'Virtual cell' },
];

/* ---------------------------------------------------------- */
/* Highlight projects (ordered: most impressive first)         */
/* ---------------------------------------------------------- */

export interface Project {
  id: string;
  name: string;
  tag: L<string>;
  desc: L<string>;
  metrics: { value: string; label: L<string> }[];
  links?: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    id: 'virtual-embryo',
    name: 'Virtual Embryo Challenge',
    tag: { zh: 'NeurIPS 2026 競賽 · 進行中', en: 'NeurIPS 2026 Competition · In progress' },
    desc: {
      zh: '預測胚胎發育過程中基因表現的時空動態，以及基因剔除後的表現型變化。競賽由哈佛、UCSD、CMU 等機構合辦，終極目標是建立哺乳類胚胎發育的預測式數位分身——從反應式醫學走向預測與預防。ISB Lab 正在參賽。',
      en: 'Predicting the spatiotemporal dynamics of gene expression across embryogenesis—and the phenotypes of genetic knockouts. Hosted by Harvard, UCSD, CMU and partners, the competition pushes toward predictive digital twins of mammalian embryogenesis. ISB Lab is competing.',
    },
    metrics: [
      { value: '~1M', label: { zh: '細胞', en: 'cells' } },
      { value: '11', label: { zh: '發育時間點', en: 'time points' } },
      { value: '3', label: { zh: '任務', en: 'tasks' } },
    ],
    links: [{ label: 'virtualembryo.ai', href: 'https://virtualembryo.ai/challenge' }],
  },
  {
    id: 'geometricflux',
    name: 'GeometricFlux.jl',
    tag: { zh: '開源 · Julia 官方生態系', en: 'Open source · official Julia ecosystem' },
    desc: {
      zh: 'Julia 官方深度學習庫 Flux.jl 生態系的幾何深度學習與圖神經網路庫。整合 message-passing 與 graph network 兩大泛用框架、以壓縮稀疏矩陣設計高效圖資料結構，並提供 10 餘種 CPU/CUDA 圖卷積層。',
      en: 'The geometric deep learning and graph neural network library of the official Julia ML ecosystem, Flux.jl. It unifies the message-passing and graph-network frameworks, ships an efficient compressed-sparse graph data structure, and provides 10+ graph convolutional layers on CPU and CUDA.',
    },
    metrics: [
      { value: 'FluxML', label: { zh: '官方生態系成員', en: 'official ecosystem' } },
      { value: '10+', label: { zh: '圖卷積層', en: 'graph conv layers' } },
      { value: 'CPU/CUDA', label: { zh: '雙後端', en: 'dual backends' } },
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/FluxML/GeometricFlux.jl' }],
  },
  {
    id: 'rafael',
    name: 'RAFAEL — 聯邦式 GWAS',
    tag: { zh: 'Taiwan AI Labs · 2023–2024', en: 'Taiwan AI Labs · 2023–2024' },
    desc: {
      zh: '聯邦式全基因體關聯分析（GWAS）框架：資料不出本地的前提下完成安全多方運算。以 Julia 實作分散式連鎖不平衡（LD）演算法，單執行緒效能達 C++ 黃金標準庫的 3 倍。',
      en: 'A federated framework for genome-wide association studies: secure multi-party computation with data never leaving its home institution. Its distributed linkage-disequilibrium algorithm, written in Julia, runs 3× faster single-threaded than the C++ gold-standard library.',
    },
    metrics: [
      { value: '500K', label: { zh: '參與者', en: 'participants' } },
      { value: '90M', label: { zh: '基因變異', en: 'variants' } },
      { value: '<1 hr', label: { zh: '完成分析', en: 'wall clock' } },
      { value: '3×', label: { zh: 'LD 演算法速度（vs C++）', en: 'faster LD (vs C++)' } },
    ],
  },
  {
    id: 'cdgrns',
    name: 'CDGRNs.jl',
    tag: { zh: '博士研究 · Briefings in Bioinformatics 2023', en: 'Ph.D. research · Briefings in Bioinformatics 2023' },
    desc: {
      zh: '第一個整合基因調控網路推論與細胞軌跡推論的方法：以高斯混合模型與未剪接轉錄體（unspliced transcripts）推導情境相依的調控動力學，同時解釋細胞命運軌跡。發表於 Briefings in Bioinformatics。',
      en: 'The first method unifying gene regulatory network inference with trajectory inference: a Gaussian-mixture model over unspliced transcripts derives context-dependent regulatory dynamics while explaining cell-fate trajectories. Published in Briefings in Bioinformatics.',
    },
    metrics: [{ value: 'GRN + TI', label: { zh: '首個整合方法', en: 'first unified method' } }],
    links: [
      { label: 'Paper', href: 'https://doi.org/10.1093/bib/bbac633' },
      { label: 'GitHub', href: 'https://github.com/yuehhua/CDGRNs.jl' },
    ],
  },
];

/* ---------------------------------------------------------- */
/* Publications                                                */
/* ---------------------------------------------------------- */

export interface Pub {
  authors: string;
  title: string;
  venue: string;
  year: number;
  doi: string;
}

export const publications: Pub[] = [
  {
    authors: 'Tu YH, Juan HF, Huang HC',
    title: 'Context-dependent gene regulatory network reveals regulation dynamics and cell trajectories using unspliced transcripts',
    venue: 'Briefings in Bioinformatics',
    year: 2023,
    doi: '10.1093/bib/bbac633',
  },
  {
    authors: 'Zhou TA, Hsu HP, Tu YH, Cheng HK, Lin CY, Chen NJ, Tsai JW, Robey E, Huang HC, Hsu CL, Dzhagalov IL',
    title: 'Thymic macrophages consist of two populations with distinct localization and origin',
    venue: 'eLife',
    year: 2022,
    doi: '10.7554/eLife.75148',
  },
  {
    authors: 'Chen YS, Tu YH, Chen BH, Liu YY, Hong YP, Teng RH, Wang YW, Chiou CS',
    title: 'cgMLST@Taiwan: a web service platform for Vibrio cholerae cgMLST profiling and global strain tracking',
    venue: 'Journal of Microbiology, Immunology and Infection',
    year: 2022,
    doi: '10.1016/j.jmii.2020.12.007',
  },
  {
    authors: 'Tu YH, Juan HF, Huang HC',
    title: 'Identification of cell states using super-enhancer RNA',
    venue: 'BMC Genomics',
    year: 2021,
    doi: '10.1186/s12864-021-08092-1',
  },
  {
    authors: 'Tu YH, Chen BH, Hong YP, Liao YS, Chen YS, Liu YY, Teng RH, Wang YW, Chiou CS',
    title: 'Emergence of Vibrio cholerae O1 sequence type 75 in Taiwan',
    venue: 'Emerging Infectious Diseases',
    year: 2020,
    doi: '10.3201/eid2601.190934',
  },
  {
    authors: 'Chiou CS, Hong YP, Liao YC, Wang YW, Tu YH, Chen BH',
    title: 'New multidrug-resistant Salmonella enterica serovar Anatum clone, Taiwan, 2015–2017',
    venue: 'Emerging Infectious Diseases',
    year: 2019,
    doi: '10.3201/eid2501.181103',
  },
  {
    authors: 'Hong YP, Wang YW, Huang IH, Liao YC, Kuo HC, Liu YY, Tu YH, Chen BH, Liao YS, Chiou CS',
    title: 'Genetic relationships among multidrug-resistant Salmonella enterica serovar Typhimurium strains from humans and animals',
    venue: 'Antimicrobial Agents and Chemotherapy',
    year: 2018,
    doi: '10.1128/AAC.00213-18',
  },
];

/* ---------------------------------------------------------- */
/* Teaching                                                    */
/* ---------------------------------------------------------- */

export interface Course {
  name: L<string>;
  desc: L<string>;
  /** When set, the course card links to its dedicated lesson page (src/pages/lessons/<slug>). */
  slug?: string;
}

export const tmuCourses: Course[] = [
  {
    slug: 'discrete-math',
    name: { zh: '離散數學', en: 'Discrete Mathematics' },
    desc: {
      zh: '從邏輯與證明到圖論與組合最佳化；每週搭配臨床與生醫轉譯案例——醫療 AI 的邏輯誤區、GWAS 基因檢索、V(D)J 重組的組合學、德布魯因圖基因體組裝。',
      en: 'From logic and proofs to graph theory and combinatorial optimization, with weekly clinical and biomedical translation cases—logic pitfalls in medical AI, GWAS retrieval, combinatorics of V(D)J recombination, de Bruijn-graph genome assembly.',
    },
  },
  {
    slug: 'data-structures-algorithms',
    name: { zh: '資料結構與演算法', en: 'Data Structures and Algorithms' },
    desc: {
      zh: '記憶體模型到動態規劃的實作導向課程；每種資料結構都對應生醫應用——急診檢傷佇列（heap）、病房巡房名單（linked list）、醫學詞彙自動完成（Trie）。',
      en: 'Implementation-driven course from memory models to dynamic programming; each data structure maps to a biomedical build—ER triage queues (heaps), ward round lists (linked lists), medical-term autocomplete (tries).',
    },
  },
  {
    slug: 'bioinformatics',
    name: { zh: '生物資訊', en: 'Bioinformatics' },
    desc: {
      zh: '序列分析、基因體學到單細胞資料分析的入門，銜接實驗室目前的研究主題。',
      en: 'From sequence analysis and genomics to single-cell data analysis, connecting directly to the lab’s current research.',
    },
  },
  {
    name: { zh: '智慧醫療大數據分析與實務', en: 'Big Data Analytics for Smart Healthcare' },
    desc: {
      zh: '醫療資料的取得、清理、分析到視覺化的完整實務流程。',
      en: 'Hands-on pipeline for healthcare data: acquisition, cleaning, analysis and visualization.',
    },
  },
];

/* ---------------------------------------------------------- */
/* Join us                                                     */
/* ---------------------------------------------------------- */

export const join = {
  heading: { zh: '招募大學部專題生', en: 'Undergraduate research openings' },
  intro: {
    zh: 'ISB Lab 是 2026 年新成立的實驗室——加入我們，你會直接參與從零到一的研究。',
    en: 'ISB Lab was founded in 2026—join us and take part in research from day zero.',
  },
  youAre: { zh: '你可能是這樣的人', en: 'You might be a fit if you' },
  youAreItems: [
    { zh: '對「AI × 生物」的交界充滿好奇', en: 'are curious about the AI × biology frontier' },
    { zh: '有基礎 Python 能力，或強烈的學習動機', en: 'know some Python, or are strongly motivated to learn' },
    { zh: '想動手解決真實的研究問題，而不只是交作業', en: 'want to work on real research problems, not just homework' },
    { zh: '細心、能自主推進、樂於討論', en: 'are careful, self-driven and enjoy discussion' },
  ] as L<string>[],
  weOffer: { zh: '我們提供', en: 'What we offer' },
  weOfferItems: [
    { zh: '一對一指導與每週討論', en: 'One-on-one mentoring and weekly meetings' },
    { zh: '運算資源與研究環境', en: 'Compute resources and a research environment' },
    { zh: '成果路徑：競賽、研討會、論文與開源貢獻', en: 'Concrete outputs: competitions, conferences, papers, open source' },
    { zh: '研究所升學與職涯建議', en: 'Graduate-school and career advice' },
  ] as L<string>[],
  ctaPre: { zh: '寄信至 ', en: 'Email ' },
  ctaPost: {
    zh: '，主旨註明【專題生】，附上一段自我介紹（系級、背景、想探索的方向）。',
    en: ' with subject【專題生】plus a short intro (year/major, background, what you’d like to explore).',
  },
};

/* ---------------------------------------------------------- */
/* Footer                                                      */
/* ---------------------------------------------------------- */

export const footer = {
  address: {
    zh: '11031 臺北市信義區吳興街 250 號 · 臺北醫學大學',
    en: '250 Wuxing St., Xinyi Dist., Taipei 11031, Taiwan · Taipei Medical University',
  },
  copyright: { zh: '© 2026 ISB Lab · 臺北醫學大學', en: '© 2026 ISB Lab · Taipei Medical University' },
};
