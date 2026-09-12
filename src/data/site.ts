/**
 * サイト共通の会社情報。
 * 出典: 既存公式サイト https://www.tryshome.co.jp/（トップ・会社案内・事業内容・アクセス）
 * ここに無い情報（営業時間・保証・施工件数など）は確認が取れていないため掲載していません。
 */
export const site = {
  brand: 'TRYS HOME',
  brandReading: 'トライスホーム',
  corp: '株式会社TRYS',
  corpReading: '株式会社トライス',
  tagline: '住まいのリフォーム、TRYS HOMEにお任せ。',
  description:
    '東京都町田市のリフォーム会社 TRYS HOME（株式会社TRYS）。水回り・内装・屋根外壁塗装・エクステリアなど住まいのリフォームをご相談ください。職人歴10年以上のプロフェッショナル集団が高品質かつ丁寧な施工でお応えします。',
  postal: '〒194-0014',
  address: '東京都町田市高ケ坂3-13-13',
  tel: '042-719-0651',
  telHref: 'tel:0427190651',
  fax: '042-869-1637',
  representative: '代表取締役 杉山広行',
  representativeName: '杉山 広行',
  established: '2021年3月',
  founded: '2013年1月（個人事業として創業）',
  capital: '1,000,000円',
  license: '東京都知事許可（般-6）第158376号',
  licenseDate: '2024年4月',
  employees: '12名',
  banks: ['多摩信用金庫 町田支店', '城南信用金庫 玉川学園支店'],
  business: [
    '建築工事の設計、施工、監理、監督及び請負等',
    '新築・リフォーム工事',
    '住設資材販売',
    '自動車、自動2輪車及びそれらの部品等の販売',
  ],
  clients: ['株式会社ひかり建設', '株式会社一条工務店'],
  memberships: [
    'LIXIL リフォームネット',
    '一般社団法人 日本ツーバイフォー建築協会',
    'Good Living 友の会',
    '東京土建一般労働組合',
  ],
  invoice: 'T5012301012478',
  serviceArea: '東京都・神奈川県・埼玉県・千葉県',
  serviceAreaList: ['東京都', '神奈川県', '埼玉県', '千葉県'],
  instagram: 'https://www.instagram.com/tryshome2021/',
  instagramId: '@tryshome2021',
  history: [
    { year: '2013年1月', text: '個人事業主として創業。' },
    { year: '2021年3月', text: '東京都町田市にて株式会社TRYS設立。' },
    { year: '2024年4月', text: '東京都にて建設業許可を取得（東京都知事許可 第158376号）。' },
  ],
  /** 既存サイトの「ご挨拶」原文（改変せず掲載） */
  greeting:
    '株式会社TRYSは町田市を拠点に石膏ボード貼り専門で10年以上従事してまいりましたが、2024年より木造大工工事をメインに事業展開しております。総合リフォームも承っておりますので、見積もり等ご相談ください。',
  /** 既存サイトの強み原文 */
  strengthText:
    '各業種にて職人歴10年以上の経験を持つプロフェッショナル集団が在籍しており、高品質かつ丁寧な施工を強みとしています。',
} as const;

export const nav = [
  { href: '/reform/', label: 'リフォームメニュー', short: 'リフォーム' },
  { href: '/works/', label: '施工実績', short: '施工実績' },
  { href: '/about/', label: '選ばれる理由', short: '特長' },
  { href: '/company/', label: '会社概要', short: '会社概要' },
  { href: '/news/', label: 'お知らせ', short: 'お知らせ' },
  { href: '/contact/', label: 'お問い合わせ', short: 'お問い合わせ' },
] as const;
