/**
 * research.ts — featured research themes (主題研究).
 * Deck: one slide per theme (title, one-liner, 領域標籤, visual figure).
 * External actions link straight out (challenge site / GitHub / paper) —
 * no detail pages. Full publication list lives at /publications/.
 */
import type { ImageMetadata } from 'astro';
import veImg from '../assets/research/virtual-embryo-task2.webp';
import gfImg from '../assets/research/geometricflux-logo.png';
import flImg from '../assets/research/rafael-logo.png';
import cdImg from '../assets/research/cdgrn-concept.png';
import type { L } from './content';

/** Representative visual per theme (static imports so Vite can resolve them). */
export const themeImages: Record<string, ImageMetadata> = {
  'virtual-embryo': veImg,
  geometricflux: gfImg,
  'federated-learning': flImg,
  cdgrn: cdImg,
};

export interface ResearchTheme {
  slug: string;
  accent: 'sky' | 'leaf';
  name: L<string>;
  short: L<string>; // slide one-liner
  desc: L<string>; // kept for future use (e.g. detail pages)
  metrics: { value: string; label: L<string> }[]; // kept for future use
  links: { label: string; href: string }[]; // e.g. Paper ↗ / GitHub ↗
  tags: L<string>[]; // 領域標籤
  /** When set, the slide CTA links straight here (external site / repo). */
  externalCta?: { label: L<string>; href: string };
}

export interface ResearchVisual {
  alt: L<string>;
}

export const themeUi = {
  sectionTitle: { zh: '主題研究', en: 'Featured research' },
  meetLab: { zh: '認識 ISB Lab', en: 'About ISB Lab' },
  pubHeading: { zh: '論文', en: 'Publications' },
  pubIntro: {
    zh: '完整出版清單，依年份排列。',
    en: 'The complete publication list, by year.',
  },
  viewPaper: { zh: '論文連結', en: 'View paper' },
} satisfies Record<string, L<string>>;

export const researchThemes: ResearchTheme[] = [
  {
    slug: 'virtual-embryo',
    accent: 'sky',
    name: { zh: 'Virtual Embryo Challenge', en: 'Virtual Embryo Challenge' },
    short: {
      zh: '預測胚胎發育的時空基因表現動態——哺乳類發育的預測式數位分身。',
      en: 'Predicting spatiotemporal gene expression across embryogenesis—a predictive digital twin.',
    },
    desc: {
      zh: '預測胚胎發育過程中基因表現的時空動態，以及基因剔除後的表現型變化。競賽由哈佛、UCSD、CMU 等機構合辦，終極目標是建立哺乳類胚胎發育的預測式數位分身——從反應式醫學走向預測與預防。ISB Lab 正在參賽。',
      en: 'Predicting the spatiotemporal dynamics of gene expression across embryogenesis—and the phenotypes of genetic knockouts. Hosted by Harvard, UCSD, CMU and partners, the competition pushes toward predictive digital twins of mammalian embryogenesis. ISB Lab is competing.',
    },
    metrics: [
      { value: '~1M', label: { zh: '細胞', en: 'cells' } },
      { value: '11', label: { zh: '發育時間點', en: 'time points' } },
      { value: '3', label: { zh: '任務', en: 'tasks' } },
    ],
    links: [],
    tags: [
      { zh: '計算生物學', en: 'Computational biology' },
      { zh: '空間轉錄體', en: 'Spatial transcriptomics' },
      { zh: '數位分身', en: 'Digital twins' },
    ],
    externalCta: {
      label: { zh: '前往競賽網站', en: 'Go to the challenge' },
      href: 'https://virtualembryo.ai/challenge',
    },
  },
  {
    slug: 'geometricflux',
    accent: 'leaf',
    name: { zh: 'GeometricFlux.jl', en: 'GeometricFlux.jl' },
    short: {
      zh: 'Julia 官方生態系的幾何深度學習與圖神經網路庫。',
      en: 'Geometric deep learning and graph neural networks for the official Julia ecosystem.',
    },
    desc: {
      zh: 'Julia 官方深度學習庫 Flux.jl 生態系的幾何深度學習與圖神經網路庫。整合 message-passing 與 graph network 兩大泛用框架、以壓縮稀疏矩陣設計高效圖資料結構，並提供 10 餘種 CPU/CUDA 圖卷積層。',
      en: 'The geometric deep learning and graph neural network library of the official Julia ML ecosystem, Flux.jl. It unifies the message-passing and graph-network frameworks, ships an efficient compressed-sparse graph data structure, and provides 10+ graph convolutional layers on CPU and CUDA.',
    },
    metrics: [
      { value: 'FluxML', label: { zh: '官方生態系成員', en: 'official ecosystem' } },
      { value: '10+', label: { zh: '圖卷積層', en: 'graph conv layers' } },
      { value: 'CPU/CUDA', label: { zh: '雙後端', en: 'dual backends' } },
    ],
    links: [],
    tags: [
      { zh: '幾何深度學習', en: 'Geometric deep learning' },
      { zh: '圖神經網路', en: 'Graph neural networks' },
      { zh: '開源軟體', en: 'Open-source software' },
    ],
    externalCta: {
      label: { zh: 'GitHub', en: 'GitHub' },
      href: 'https://github.com/FluxML/GeometricFlux.jl',
    },
  },
  {
    slug: 'federated-learning',
    accent: 'sky',
    name: { zh: '聯邦式學習', en: 'Federated Learning' },
    short: {
      zh: '資料不出本地的安全多方運算——RAFAEL 聯邦式 GWAS 框架。',
      en: 'Secure multi-party analytics with data never leaving home—RAFAEL, a federated GWAS framework.',
    },
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
    links: [],
    tags: [
      { zh: '聯邦式學習', en: 'Federated learning' },
      { zh: 'GWAS', en: 'GWAS' },
      { zh: '隱私運算', en: 'Privacy-preserving computation' },
    ],
  },
  {
    slug: 'cdgrn',
    accent: 'leaf',
    name: { zh: 'CDGRN', en: 'CDGRN' },
    short: {
      zh: '首個整合基因調控網路與細胞軌跡推論的方法（CDGRNs.jl）。',
      en: 'The first method unifying gene regulatory network and trajectory inference (CDGRNs.jl).',
    },
    desc: {
      zh: '第一個整合基因調控網路推論與細胞軌跡推論的方法：以高斯混合模型與未剪接轉錄體（unspliced transcripts）推導情境相依的調控動力學，同時解釋細胞命運軌跡。發表於 Briefings in Bioinformatics。',
      en: 'The first method unifying gene regulatory network inference with trajectory inference: a Gaussian-mixture model over unspliced transcripts derives context-dependent regulatory dynamics while explaining cell-fate trajectories. Published in Briefings in Bioinformatics.',
    },
    metrics: [{ value: 'GRN + TI', label: { zh: '首個整合方法', en: 'first unified method' } }],
    links: [
      { label: 'Paper', href: 'https://doi.org/10.1093/bib/bbac633' },
      { label: 'GitHub', href: 'https://github.com/yuehhua/CDGRNs.jl' },
    ],
    tags: [
      { zh: '計算生物學', en: 'Computational biology' },
      { zh: '機器學習演算法設計', en: 'Machine learning algorithm design' },
      { zh: '單細胞體學資料分析', en: 'Single-cell omics data analysis' },
    ],
  },
];

export const visuals: Record<string, ResearchVisual> = {
  'virtual-embryo': {
    alt: {
      zh: 'Virtual Embryo Challenge 任務示意：胚胎 3D MERFISH 點雲',
      en: 'Virtual Embryo Challenge task: 3D MERFISH point clouds of embryos',
    },
  },
  geometricflux: {
    alt: { zh: 'GeometricFlux.jl 標誌', en: 'GeometricFlux.jl logo' },
  },
  'federated-learning': {
    alt: { zh: 'RAFAEL 標誌', en: 'RAFAEL logo' },
  },
  cdgrn: {
    alt: { zh: 'CDGRN 方法概念圖', en: 'CDGRN method concept diagram' },
  },
};
