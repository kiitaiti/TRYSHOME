/**
 * リフォームメニューの分類。
 * 既存サイトの対応業務（内装工事／水廻り／屋根外壁塗装／エクステリア／大工工事・造作工事・防音工事・木工工事／住設資材販売）と、
 * 提供された施工写真（IH・トイレ・浴室・洗面台・フローリング・カーペット・エアコン・屋根）をもとに整理しています。
 * 具体的な価格・工期・保証は確認が取れていないため掲載していません。
 */
import type { ImageMetadata } from 'astro';
import photoBath from '@/assets/photos/photo-bath.jpg';
import photoFloor from '@/assets/photos/photo-floor.jpg';
import photoRoof from '@/assets/photos/photo-roof.jpg';
import photoCarpet from '@/assets/photos/photo-carpet.jpg';
import photoAircon from '@/assets/photos/photo-aircon.jpg';
import photoIh from '@/assets/photos/photo-ih.jpg';
import photoToilet from '@/assets/photos/photo-toilet.jpg';
import photoWashstand from '@/assets/photos/photo-washstand.jpg';
import houseNew from '@/assets/img/house-new.png';

export interface ReformSub {
  name: string;
  text: string;
  troubles: string[];
  photo?: ImageMetadata;
  photoAlt?: string;
}

export interface ReformCategory {
  slug: string;
  name: string;
  short: string;
  en: string;
  icon: 'water' | 'interior' | 'exterior' | 'garden' | 'carpentry' | 'equipment';
  lead: string;
  description: string;
  troubles: string[];
  services: string[];
  subs: ReformSub[];
  photo: ImageMetadata;
  photoAlt: string;
  /** microCMS works の「施工カテゴリー」と対応する値 */
  worksCategory: string;
}

export const reformCategories: ReformCategory[] = [
  {
    slug: 'mizumawari',
    name: '水回りリフォーム',
    short: '水回り',
    en: 'WATER',
    icon: 'water',
    lead: 'キッチン・浴室・トイレ・洗面台など、毎日使う場所を快適に。',
    description:
      'キッチン、浴室、トイレ、洗面台といった水回りは、毎日使うからこそ汚れや古さが気になりやすい場所です。TRYS HOMEでは設備の交換から内装の補修まで、住まいの状況に合わせてご提案します。',
    troubles: [
      '設備が古くなり、汚れが落ちにくい',
      '掃除の手間を減らしたい',
      '冬場の浴室が寒い',
      '水漏れや異音が気になる',
      '節水・省エネの設備に替えたい',
    ],
    services: [
      'システムキッチン・IHクッキングヒーターの交換',
      'ユニットバスへの交換・浴室の改修',
      'トイレ本体の交換・内装の張り替え',
      '洗面化粧台の交換',
      '給排水にともなう内装補修',
    ],
    subs: [
      {
        name: 'キッチン',
        text: '設備の交換のほか、コンロからIHクッキングヒーターへの入れ替えなど、部分的な工事にも対応します。',
        troubles: ['コンロが古くなった', '掃除が大変', '収納が足りない'],
        photo: photoIh,
        photoAlt: 'IHクッキングヒーターを設置したキッチン',
      },
      {
        name: '浴室',
        text: '在来浴室からユニットバスへの交換など、浴室まわりの工事をご相談いただけます。',
        troubles: ['浴室が寒い', 'カビや汚れが落ちない', '掃除をラクにしたい'],
        photo: photoBath,
        photoAlt: '交換したユニットバス',
      },
      {
        name: 'トイレ',
        text: 'トイレ本体の交換や、床・壁の内装の張り替えに対応します。',
        troubles: ['便器が古い', '掃除がしにくい', '節水型に替えたい'],
        photo: photoToilet,
        photoAlt: '交換したトイレ',
      },
      {
        name: '洗面台',
        text: '洗面化粧台の交換で、朝の身支度の場所をすっきりと使いやすく。',
        troubles: ['収納が少ない', '鏡や照明が暗い', '汚れが目立つ'],
        photo: photoWashstand,
        photoAlt: '交換した洗面化粧台',
      },
    ],
    photo: photoBath,
    photoAlt: '交換したユニットバス',
    worksCategory: '水回り',
  },
  {
    slug: 'naiso',
    name: '内装リフォーム',
    short: '内装',
    en: 'INTERIOR',
    icon: 'interior',
    lead: 'フローリング・クロス・カーペットなど、お部屋の印象を新しく。',
    description:
      '床や壁の張り替えは、お部屋の印象を大きく変えるリフォームです。TRYS HOMEは石膏ボード貼りから始まった会社で、内装の下地づくりから仕上げまでを職人が丁寧に施工します。',
    troubles: [
      '床のきしみや傷が気になる',
      'クロスの汚れ・剥がれを直したい',
      'カーペットを張り替えたい',
      '和室を洋室にしたい',
      '建具や収納を使いやすくしたい',
    ],
    services: [
      'フローリングの張り替え・重ね張り',
      'クロス（壁紙）の張り替え',
      'カーペットの取り替え',
      '内装下地（石膏ボード）工事',
      '建具・造作収納の工事',
    ],
    subs: [
      {
        name: 'フローリング',
        text: '傷んだ床の張り替えや重ね張りで、明るく歩き心地のよい床に。',
        troubles: ['床がきしむ', '傷や日焼けが目立つ'],
        photo: photoFloor,
        photoAlt: '張り替えたフローリングの部屋',
      },
      {
        name: 'カーペット・クロス',
        text: 'カーペットや壁紙の取り替えで、お部屋を清潔で新しい印象に。',
        troubles: ['カーペットの汚れ・へたり', '壁紙の剥がれ'],
        photo: photoCarpet,
        photoAlt: 'カーペットを取り替えた部屋',
      },
    ],
    photo: photoFloor,
    photoAlt: '張り替えたフローリングの部屋',
    worksCategory: '内装',
  },
  {
    slug: 'gaiso',
    name: '屋根・外壁塗装',
    short: '屋根・外壁',
    en: 'EXTERIOR',
    icon: 'exterior',
    lead: '住まいを雨風から守る屋根と外壁のメンテナンス。',
    description:
      '屋根や外壁は、住まいを長持ちさせるために定期的なメンテナンスが欠かせない場所です。塗装や葺き替えなど、状態に合わせた工事をご提案します。',
    troubles: [
      '外壁のひび割れ・色あせが気になる',
      '屋根の劣化や雨漏りが心配',
      '塗り替えの時期か分からない',
      '台風の後に点検してほしい',
    ],
    services: ['屋根の塗装・改修', '外壁の塗装', '付帯部（雨樋・軒天など）の補修', '現地調査・点検のご相談'],
    subs: [
      {
        name: '屋根工事',
        text: '屋根材の状態を確認し、塗装や葺き替えなど適した方法をご案内します。',
        troubles: ['雨漏りが心配', '屋根材の劣化'],
        photo: photoRoof,
        photoAlt: '施工した屋根',
      },
    ],
    photo: photoRoof,
    photoAlt: '施工した屋根',
    worksCategory: '屋根外壁',
  },
  {
    slug: 'exterior',
    name: 'エクステリア',
    short: 'エクステリア',
    en: 'GARDEN',
    icon: 'garden',
    lead: '玄関まわり・お庭・駐車スペースなど、外まわりの工事。',
    description:
      'アプローチやフェンス、駐車スペースなど、外まわりのリフォームもご相談いただけます。住まいの外観や使い勝手に合わせてご提案します。',
    troubles: ['玄関まわりを整えたい', 'フェンスや門扉が古い', '駐車スペースを使いやすくしたい', '庭の手入れをラクにしたい'],
    services: ['アプローチ・玄関まわりの工事', 'フェンス・門扉の設置・交換', '駐車スペース・カーポートのご相談', 'お庭の整備'],
    subs: [],
    photo: houseNew,
    photoAlt: '住まいの外まわりのイメージイラスト',
    worksCategory: 'エクステリア',
  },
  {
    slug: 'daiku',
    name: '大工・造作工事',
    short: '大工・造作',
    en: 'CARPENTRY',
    icon: 'carpentry',
    lead: '間取り変更や造作収納、防音工事など、大工の技術を活かした工事。',
    description:
      'TRYS HOMEは木造大工工事を得意としています。間取りの変更、造作家具・収納の製作、防音工事など、既製品では対応しにくいご要望にも職人の技術でお応えします。',
    troubles: ['部屋の間取りを変えたい', '造り付けの収納がほしい', '音が気になる部屋を防音したい', '古い建具や床の下地を直したい'],
    services: ['大工工事・木工事', '造作工事（造作家具・収納）', '防音工事', '内装下地工事'],
    subs: [],
    photo: photoFloor,
    photoAlt: '大工工事をした部屋',
    worksCategory: '大工・造作',
  },
  {
    slug: 'setsubi',
    name: '住宅設備の取付・交換',
    short: '住宅設備',
    en: 'EQUIPMENT',
    icon: 'equipment',
    lead: 'エアコンの取付など、住まいの設備のご相談。',
    description:
      'エアコンの取付をはじめ、住宅設備の取付・交換に対応します。住設資材の販売も行っているため、機器選びからご相談いただけます。',
    troubles: ['エアコンを新しく取り付けたい', '古い設備を交換したい', '機器選びから相談したい'],
    services: ['エアコンの取付・交換', '住宅設備機器の取付・交換', '住設資材の販売'],
    subs: [
      {
        name: 'エアコン取付',
        text: '新規の取付から交換まで、お部屋に合わせて対応します。',
        troubles: ['エアコンが古い・効きが悪い', '新しい部屋に取り付けたい'],
        photo: photoAircon,
        photoAlt: '取り付けたエアコン',
      },
    ],
    photo: photoAircon,
    photoAlt: '取り付けたエアコン',
    worksCategory: '住宅設備',
  },
];

export const worksCategoryList = reformCategories.map((c) => c.worksCategory);

export function findReform(slug: string) {
  return reformCategories.find((c) => c.slug === slug);
}

export function reformByWorksCategory(cat: string) {
  return reformCategories.find((c) => c.worksCategory === cat);
}

/** 施工カテゴリー名 → URL用スラッグ */
export function worksCategorySlug(cat: string): string {
  const r = reformByWorksCategory(cat);
  return r ? r.slug : 'other';
}
