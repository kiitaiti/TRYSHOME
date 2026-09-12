/**
 * microCMS クライアント（ビルド時にのみ実行されます）
 *
 * - MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY が設定されている → microCMS から取得。取得に失敗した場合はビルドを失敗させます
 *   （架空データへ自動で切り替えて隠すことはしません）。
 * - 未設定 → ローカル確認用のサンプルデータ（src/data/sample-*.json）。画面に「サンプル」表示が出ます。
 *   Netlify の production コンテキストで未設定の場合は、ALLOW_SAMPLE_DATA=true が無い限りビルドを失敗させます。
 */
import sampleNews from '@/data/sample-news.json';
import sampleWorks from '@/data/sample-works.json';

export interface MicroCMSImage {
  url: string;
  width?: number;
  height?: number;
}

export interface NewsItem {
  id: string;
  title: string;
  thumbnail?: MicroCMSImage | null;
  category?: string[] | string | null;
  body: string;
  date?: string | null; // 公開日（任意フィールド）
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface WorkItem {
  id: string;
  title: string;
  mainImage: MicroCMSImage;
  category?: string[] | string | null;
  area?: string | null;
  buildingType?: string | null;
  workContent: string;
  period?: string | null;
  cost?: string | null;
  beforeImage?: MicroCMSImage | null;
  afterImage?: MicroCMSImage | null;
  gallery?: MicroCMSImage[] | null;
  body?: string | null;
  featured?: boolean | null;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

const domain = import.meta.env.MICROCMS_SERVICE_DOMAIN as string | undefined;
const apiKey = import.meta.env.MICROCMS_API_KEY as string | undefined;

export const cmsConfigured = Boolean(domain && apiKey);
export const usingSampleData = !cmsConfigured;

// 本番（Netlify production）で CMS 未設定なら、明示的な許可が無い限り止める
const isNetlifyProduction = process.env.NETLIFY === 'true' && process.env.CONTEXT === 'production';
if (!cmsConfigured && isNetlifyProduction && process.env.ALLOW_SAMPLE_DATA !== 'true') {
  throw new Error(
    '[microCMS] MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY が未設定のため本番ビルドを中止しました。' +
      'Netlify の環境変数に設定するか、サンプルデータでの公開を許可する場合は ALLOW_SAMPLE_DATA=true を設定してください。',
  );
}

if (usingSampleData) {
  console.warn('[microCMS] 未設定のためサンプルデータでビルドします（画面に「サンプル」表示が出ます）。');
}

async function fetchAll<T>(endpoint: string, extraQuery: Record<string, string> = {}): Promise<T[]> {
  const items: T[] = [];
  const limit = 100;
  let offset = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const params = new URLSearchParams({ limit: String(limit), offset: String(offset), ...extraQuery });
    const url = `https://${domain}.microcms.io/api/v1/${endpoint}?${params.toString()}`;
    const res = await fetch(url, { headers: { 'X-MICROCMS-API-KEY': apiKey as string } });
    if (!res.ok) {
      throw new Error(`[microCMS] ${endpoint} の取得に失敗しました: HTTP ${res.status} ${res.statusText}`);
    }
    const json = (await res.json()) as ListResponse<T>;
    items.push(...json.contents);
    offset += limit;
    if (offset >= json.totalCount) break;
  }
  return items;
}

let newsCache: NewsItem[] | null = null;
let worksCache: WorkItem[] | null = null;

export async function getNews(): Promise<NewsItem[]> {
  if (newsCache) return newsCache;
  const list = cmsConfigured
    ? await fetchAll<NewsItem>('news', { orders: '-date,-publishedAt' })
    : (sampleNews as NewsItem[]);
  newsCache = [...list].sort((a, b) => newsDate(b).localeCompare(newsDate(a)));
  return newsCache;
}

export async function getWorks(): Promise<WorkItem[]> {
  if (worksCache) return worksCache;
  const list = cmsConfigured ? await fetchAll<WorkItem>('works', { orders: '-publishedAt' }) : (sampleWorks as WorkItem[]);
  worksCache = [...list].sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''));
  return worksCache;
}

export function newsDate(n: NewsItem): string {
  return n.date ?? n.publishedAt ?? n.createdAt ?? '';
}

export function toArray(v: string[] | string | null | undefined): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

export function formatDate(iso: string | undefined | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

/** microCMS（imgix）画像の最適化URL。ローカルのサンプル画像はそのまま返す */
export function imgUrl(img: MicroCMSImage, width: number, opts: { height?: number; fit?: 'crop' | 'max' } = {}): string {
  if (!/^https?:\/\//.test(img.url) || !img.url.includes('microcms-assets.io')) return img.url;
  const p = new URLSearchParams({ w: String(width), fm: 'webp', q: '80' });
  if (opts.height) {
    p.set('h', String(opts.height));
    p.set('fit', opts.fit ?? 'crop');
  }
  return `${img.url}?${p.toString()}`;
}

/** 本文（リッチエディタHTML）の先頭からテキストを抜き出す（description 用） */
export function excerpt(html: string | null | undefined, len = 100): string {
  if (!html) return '';
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > len ? text.slice(0, len) + '…' : text;
}
