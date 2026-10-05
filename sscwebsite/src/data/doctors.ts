import { IMG, U } from '../components/ui'
import type { L } from '../i18n/translations'

export type Category = 'Klinis' | 'Estetik' | 'Anak' | 'Alergi'
export type Availability = 'Tersedia' | 'Hampir Penuh'

export type Doctor = {
  id: string
  name: string
  specialty: string
  category: Category
  focus: Category[]
  expertise: string[]
  summary: string
  image: string
  imagePosition: string
  practiceDays: string[]
  practiceHours: string
  availability: Availability
  /** Bilingual display text (render with pick()). The Indonesian string fields above stay canonical. */
  specialtyL: L
  expertiseL: L<string[]>
  summaryL: L
}

type Base = Omit<Doctor, 'specialtyL' | 'expertiseL' | 'summaryL'>
const SPEC_EN: Record<string, string> = { 'Dermatologi Klinis': 'Clinical Dermatology', 'Dermatologi Estetik': 'Aesthetic Dermatology', 'Dermatologi Anak': 'Pediatric Dermatology', 'Dermatologi Alergi': 'Allergy Dermatology' }
const EN: Record<string, { expertise: string[]; summary: string }> = {
  'nadia-prameswari': { expertise: ['Acne care', 'sensitive skin', 'skin barrier'], summary: 'Focuses on treating clinical skin conditions with a gradual, diagnosis-based approach.' },
  'michael-santoso': { expertise: ['Pigmentation', 'laser', 'rejuvenation'], summary: 'Combines medical evaluation and technology for measurable, natural-looking results.' },
  'aurelia-tan': { expertise: ['Eczema', 'skin allergies', 'pediatric dermatology'], summary: "Supports children's skin needs with communication that puts both children and parents at ease." },
  'rania-maheswari': { expertise: ['Skin allergies', 'dermatitis', 'urticaria'], summary: 'Helps identify skin allergy triggers and builds safe, long-term treatment plans.' },
  'kevin-aditya': { expertise: ['Acne', 'rosacea', 'skin barrier'], summary: 'Treats acne and skin redness with measurable, realistic treatment plans.' },
  'clara-wijaya': { expertise: ['Laser', 'pigmentation', 'rejuvenation'], summary: 'Designs aesthetic treatments grounded in medical evaluation for smooth, natural results.' },
  'fajar-pratama': { expertise: ['Eczema', 'psoriasis', 'skin infections'], summary: 'Experienced in managing chronic skin conditions with a gradual approach and regular monitoring.' },
  'hana-putri': { expertise: ["Children's eczema", 'allergies', 'pediatric dermatology'], summary: "Supports children's skin care in a calm, family-friendly consultation setting." },
  'reza-kurniawan': { expertise: ['Acne scars', 'laser', 'rejuvenation'], summary: 'Focuses on improving acne scars and skin texture through a safe combination of treatments.' },
}
const withL = (d: Base): Doctor => ({
  ...d,
  specialtyL: { id: d.specialty, en: SPEC_EN[d.specialty] ?? d.specialty },
  expertiseL: { id: d.expertise, en: EN[d.id]?.expertise ?? d.expertise },
  summaryL: { id: d.summary, en: EN[d.id]?.summary ?? d.summary },
})

// Entries after the first three are fictional placeholder doctors for the prototype.
export const DOCTORS: Doctor[] = ([
  {
    id: 'nadia-prameswari',
    name: 'dr. Nadia Prameswari, Sp.KK',
    specialty: 'Dermatologi Klinis',
    category: 'Klinis',
    focus: ['Klinis', 'Alergi'],
    expertise: ['Acne care', 'kulit sensitif', 'skin barrier'],
    summary: 'Berfokus pada penanganan kondisi kulit klinis dengan pendekatan bertahap dan berbasis diagnosis.',
    image: IMG.d1,
    imagePosition: 'object-[50%_25%]',
    practiceDays: ['Sen', 'Rab', 'Jum'],
    practiceHours: '09.00 – 13.00',
    availability: 'Tersedia',
  },
  {
    id: 'michael-santoso',
    name: 'dr. Michael Santoso, Sp.KK',
    specialty: 'Dermatologi Estetik',
    category: 'Estetik',
    focus: ['Estetik'],
    expertise: ['Pigmentasi', 'laser', 'rejuvenation'],
    summary: 'Menggabungkan evaluasi medis dan teknologi untuk hasil perawatan yang terukur dan natural.',
    image: IMG.d2,
    imagePosition: 'object-[50%_20%]',
    practiceDays: ['Sel', 'Kam', 'Sab'],
    practiceHours: '17.00 – 20.00',
    availability: 'Tersedia',
  },
  {
    id: 'aurelia-tan',
    name: 'dr. Aurelia Tan, Sp.KK',
    specialty: 'Dermatologi Anak',
    category: 'Anak',
    focus: ['Anak', 'Alergi'],
    expertise: ['Eksim', 'alergi kulit', 'pediatric dermatology'],
    summary: 'Mendampingi kebutuhan kulit anak dengan komunikasi yang nyaman bagi anak dan orang tua.',
    image: IMG.d3,
    imagePosition: 'object-[50%_20%]',
    practiceDays: ['Sen', 'Kam', 'Sab'],
    practiceHours: '13.00 – 17.00',
    availability: 'Hampir Penuh',
  },
  {
    id: 'rania-maheswari',
    name: 'dr. Rania Maheswari, Sp.KK',
    specialty: 'Dermatologi Alergi',
    category: 'Alergi',
    focus: ['Alergi'],
    expertise: ['Alergi kulit', 'dermatitis', 'urtikaria'],
    summary: 'Membantu mengenali pemicu alergi kulit dan menyusun penanganan yang aman untuk jangka panjang.',
    image: U('1686737357914-80a665ca1c29'),
    imagePosition: 'object-[50%_20%]',
    practiceDays: ['Sel', 'Kam', 'Sab'],
    practiceHours: '08.00 – 12.00',
    availability: 'Tersedia',
  },
  {
    id: 'kevin-aditya',
    name: 'dr. Kevin Aditya, Sp.KK',
    specialty: 'Dermatologi Klinis',
    category: 'Klinis',
    focus: ['Klinis'],
    expertise: ['Jerawat', 'rosacea', 'skin barrier'],
    summary: 'Menangani jerawat dan kemerahan kulit dengan rencana perawatan yang terukur dan realistis.',
    image: U('1612349316228-5942a9b489c2'),
    imagePosition: 'object-[50%_20%]',
    practiceDays: ['Sen', 'Rab', 'Jum'],
    practiceHours: '13.00 – 17.00',
    availability: 'Tersedia',
  },
  {
    id: 'clara-wijaya',
    name: 'dr. Clara Wijaya, Sp.KK',
    specialty: 'Dermatologi Estetik',
    category: 'Estetik',
    focus: ['Estetik'],
    expertise: ['Laser', 'pigmentasi', 'rejuvenasi'],
    summary: 'Merancang perawatan estetik berbasis evaluasi medis untuk hasil yang halus dan natural.',
    image: U('1758600587839-56ba05596c69'),
    imagePosition: 'object-[50%_20%]',
    practiceDays: ['Sel', 'Kam'],
    practiceHours: '10.00 – 14.00',
    availability: 'Hampir Penuh',
  },
  {
    id: 'fajar-pratama',
    name: 'dr. Fajar Pratama, Sp.KK',
    specialty: 'Dermatologi Klinis',
    category: 'Klinis',
    focus: ['Klinis'],
    expertise: ['Eksim', 'psoriasis', 'infeksi kulit'],
    summary: 'Berpengalaman menangani kondisi kulit kronis dengan pendekatan bertahap dan pemantauan rutin.',
    image: U('1758691463582-11aea602cd4a'),
    imagePosition: 'object-[50%_20%]',
    practiceDays: ['Sen', 'Kam', 'Sab'],
    practiceHours: '09.00 – 13.00',
    availability: 'Tersedia',
  },
  {
    id: 'hana-putri',
    name: 'dr. Hana Putri, Sp.KK',
    specialty: 'Dermatologi Anak',
    category: 'Anak',
    focus: ['Anak', 'Alergi'],
    expertise: ['Eksim anak', 'alergi', 'pediatric dermatology'],
    summary: 'Mendampingi perawatan kulit anak dengan suasana konsultasi yang tenang dan ramah keluarga.',
    image: U('1673865641073-4479f93a7776'),
    imagePosition: 'object-[50%_15%]',
    practiceDays: ['Rab', 'Jum', 'Sab'],
    practiceHours: '13.00 – 17.00',
    availability: 'Tersedia',
  },
  {
    id: 'reza-kurniawan',
    name: 'dr. Reza Kurniawan, Sp.KK',
    specialty: 'Dermatologi Estetik',
    category: 'Estetik',
    focus: ['Estetik'],
    expertise: ['Acne scar', 'laser', 'rejuvenasi'],
    summary: 'Fokus pada perbaikan bekas jerawat dan tekstur kulit melalui kombinasi tindakan yang aman.',
    image: U('1622902046580-2b47f47f5471'),
    imagePosition: 'object-top',
    practiceDays: ['Sen', 'Sel', 'Kam'],
    practiceHours: '15.00 – 19.00',
    availability: 'Hampir Penuh',
  },
] satisfies Base[]).map(withL)

export const CATEGORIES = ['Semua', 'Klinis', 'Estetik', 'Anak', 'Alergi'] as const

// Profile-page content, derived from the canonical doctor entries above.
export type ExpertiseIcon = 'face' | 'leaf' | 'drop' | 'spark' | 'child' | 'shield'
export type ExpertiseItem = { icon: ExpertiseIcon; title: L; text: L }
export type Credential = { title: L; period: L; detail: L }

const EXPERTISE: Record<Category, ExpertiseItem[]> = {
  Klinis: [
    { icon: 'face', title: { id: 'Acne Care', en: 'Acne Care' }, text: { id: 'Diagnosis penyebab jerawat dan perawatan bertahap sesuai kondisi kulit.', en: 'Diagnosing the causes of acne and gradual treatment tailored to your skin.' } },
    { icon: 'leaf', title: { id: 'Sensitive Skin', en: 'Sensitive Skin' }, text: { id: 'Pendekatan yang meminimalkan iritasi dan membantu menjaga toleransi kulit.', en: 'An approach that minimizes irritation and helps maintain skin tolerance.' } },
    { icon: 'drop', title: { id: 'Skin Barrier', en: 'Skin Barrier' }, text: { id: 'Evaluasi serta perawatan untuk memulihkan fungsi pelindung kulit.', en: "Evaluation and care to restore the skin's protective function." } },
  ],
  Estetik: [
    { icon: 'spark', title: { id: 'Laser', en: 'Laser' }, text: { id: 'Tindakan laser terukur dengan parameter yang disesuaikan jenis kulit.', en: 'Measured laser treatments with parameters tailored to your skin type.' } },
    { icon: 'face', title: { id: 'Pigmentasi', en: 'Pigmentation' }, text: { id: 'Penanganan melasma dan noda gelap melalui kombinasi terapi bertahap.', en: 'Treating melasma and dark spots through a gradual combination of therapies.' } },
    { icon: 'leaf', title: { id: 'Rejuvenation', en: 'Rejuvenation' }, text: { id: 'Perawatan peremajaan untuk tekstur dan kualitas kulit yang lebih baik.', en: 'Rejuvenation treatments for better skin texture and quality.' } },
  ],
  Anak: [
    { icon: 'child', title: { id: 'Dermatologi Anak', en: 'Pediatric Dermatology' }, text: { id: 'Pemeriksaan kulit anak yang tenang, ramah, dan sesuai usia.', en: 'Calm, friendly, age-appropriate skin examinations for children.' } },
    { icon: 'drop', title: { id: 'Eksim Anak', en: "Children's Eczema" }, text: { id: 'Pengelolaan dermatitis atopik dan edukasi perawatan harian di rumah.', en: 'Managing atopic dermatitis and guidance on daily care at home.' } },
    { icon: 'shield', title: { id: 'Alergi Kulit', en: 'Skin Allergies' }, text: { id: 'Identifikasi pemicu alergi dan rencana pencegahan yang praktis.', en: 'Identifying allergy triggers and practical prevention plans.' } },
  ],
  Alergi: [
    { icon: 'shield', title: { id: 'Dermatitis', en: 'Dermatitis' }, text: { id: 'Evaluasi dermatitis kontak dan atopik dengan pendekatan berbasis pemicu.', en: 'Evaluating contact and atopic dermatitis with a trigger-based approach.' } },
    { icon: 'leaf', title: { id: 'Alergi Kulit', en: 'Skin Allergies' }, text: { id: 'Penelusuran riwayat dan uji yang relevan untuk menemukan penyebab.', en: 'Reviewing history and relevant tests to find the cause.' } },
    { icon: 'drop', title: { id: 'Urtikaria', en: 'Urticaria' }, text: { id: 'Penanganan biduran akut maupun kronis secara bertahap dan terkontrol.', en: 'Gradual, controlled treatment of acute and chronic hives.' } },
  ],
}

const ABOUT: Record<Category, L> = {
  Klinis: { id: 'Pendekatan yang personal dan berbasis diagnosis.', en: 'A personal, diagnosis-based approach.' },
  Estetik: { id: 'Hasil yang natural, berawal dari evaluasi medis.', en: 'Natural results, starting with medical evaluation.' },
  Anak: { id: 'Perawatan yang lembut untuk kulit si kecil.', en: "Gentle care for your little one's skin." },
  Alergi: { id: 'Menemukan pemicu, bukan sekadar meredakan gejala.', en: 'Finding the trigger, not just relieving symptoms.' },
}

// Real-roster doctors: credentials are not published in this prototype.
const PENDING: L = { id: 'Detail kredensial akan dilengkapi oleh tim klinik.', en: 'Credential details will be completed by the clinic team.' }
const REAL = ['nadia-prameswari', 'michael-santoso', 'aurelia-tan']
const T = {
  spec: { id: 'Pendidikan Spesialis', en: 'Specialist Education' },
  med: { id: 'Pendidikan Kedokteran', en: 'Medical Education' },
  exp: { id: 'Pengalaman Klinis', en: 'Clinical Experience' },
  cert: { id: 'Pelatihan & Sertifikasi', en: 'Training & Certification' },
}
const same = (v: string): L => ({ id: v, en: v })

export function getProfile(d: Doctor) {
  const first = d.name.replace(/^dr\.\s*/, '').split(/[ ,]/)[0]
  const short = d.name.split(',')[0]
  const sp = d.specialtyL
  const real = REAL.includes(d.id)
  const credentials: Credential[] = real
    ? [
        { title: T.spec, period: { id: 'Spesialis Dermatologi', en: 'Dermatology Specialist' }, detail: PENDING },
        { title: T.med, period: { id: 'Dokter Umum', en: 'General Practitioner' }, detail: PENDING },
        { title: T.exp, period: same('Senopati Skin Center'), detail: { id: `Praktik ${sp.id.toLowerCase()} di Senopati Skin Center.`, en: `Practices ${sp.en.toLowerCase()} at Senopati Skin Center.` } },
        { title: T.cert, period: sp, detail: PENDING },
      ]
    : [
        { title: T.spec, period: same('2016 – 2020'), detail: { id: 'Dermatologi dan Venereologi — data prototipe.', en: 'Dermatology and Venereology — prototype data.' } },
        { title: T.med, period: same('2009 – 2015'), detail: { id: 'Pendidikan dokter umum — data prototipe.', en: 'General medical education — prototype data.' } },
        { title: T.exp, period: { id: '2020 – Sekarang', en: '2020 – Present' }, detail: { id: `Praktik ${sp.id.toLowerCase()} di Senopati Skin Center (prototipe).`, en: `Practices ${sp.en.toLowerCase()} at Senopati Skin Center (prototype).` } },
        { title: T.cert, period: { id: '2021 – Sekarang', en: '2021 – Present' }, detail: { id: `Pelatihan lanjutan ${d.expertiseL.id.join(', ').toLowerCase()} — data prototipe.`, en: `Advanced training in ${d.expertiseL.en.join(', ').toLowerCase()} — prototype data.` } },
      ]
  return {
    languages: { id: ['Indonesia', 'English'], en: ['Indonesian', 'English'] } as L<string[]>,
    location: { id: 'Senopati Skin Center, Jakarta', en: 'Senopati Skin Center, Jakarta' } as L,
    aboutHeading: ABOUT[d.category],
    about: {
      id: [
        `${short} percaya setiap kondisi kulit membutuhkan evaluasi yang menyeluruh. Dalam konsultasi, ${first} meluangkan waktu untuk memahami keluhan, riwayat kulit, dan tujuan perawatan pasien.`,
        'Edukasi menjadi bagian penting dari setiap kunjungan, agar rencana perawatan dapat dijalankan secara realistis dan konsisten.',
      ],
      en: [
        `${short} believes every skin condition deserves a thorough evaluation. During consultations, ${first} takes the time to understand each patient's concerns, skin history, and treatment goals.`,
        'Education is an important part of every visit, so treatment plans can be followed realistically and consistently.',
      ],
    } as L<string[]>,
    expertiseItems: EXPERTISE[d.category],
    credentials,
  }
}
