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
    join: { zh: '加入我們', en: 'Join us' },
  },
  /* Every lesson slide shares one nav label — the active one glows. */
  lessonNav: { zh: '課程', en: 'Lesson' },
  scrollHint: { zh: '捲動或按 ↓ 換頁', en: 'Scroll or press ↓' },
  langToggle: { zh: 'EN', en: '中文' },
  backToTop: { zh: '回封面', en: 'Back to top' },
  viewPaper: { zh: '論文連結', en: 'View paper' },
  currentFocus: { zh: '現況焦點', en: 'Current focus' },
} as const;

/* Research theme slugs (src/data/research.ts) and lesson slugs
   (src/data/lessons.ts) each render as their own deck slide. */
export const slideOrder = [
  'hero',
  'about',
  'virtual-embryo',
  'geometricflux',
  'federated-learning',
  'cdgrn',
  'discrete-math',
  'data-structures-algorithms',
  'bioinformatics',
  'smart-healthcare-big-data',
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
/* Join us                                                     */
/* ---------------------------------------------------------- */

export const join = {
  heading: { zh: '招募大學部專題生', en: 'Undergraduate research openings' },
  slogan: {
    zh: '想要跟老師一起貢獻科學研究',
    en: 'Contribute to science, side by side with your advisor',
  },
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
    { zh: '老師親自指導，共同創造，每週一起討論', en: 'Direct guidance from the professor—co-creating, with weekly discussions' },
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
