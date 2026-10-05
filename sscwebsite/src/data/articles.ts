import { IMG, U } from '../components/ui'
import type { L, Lang } from '../i18n/translations'

/** Canonical category keys (display labels live in i18n dict `articles.categories.<key>`). */
export const ARTICLE_CATEGORIES = ['Semua', 'Acne Care', 'Sensitive Skin', 'Skin Barrier', 'Dermatologi', 'Perawatan Estetik'] as const
export type ArticleCategoryFilter = (typeof ARTICLE_CATEGORIES)[number]
export type ArticleCategory = Exclude<ArticleCategoryFilter, 'Semua'>

/** Section ids are shared across languages so anchors / TOC observers survive a language switch. */
export type Section = { id: string; heading: string; paragraphs: string[]; list?: string[]; quote?: string; image?: { src: string; caption: string } }
export type ArticleText = { title: string; excerpt: string; content: Section[] }
export type Article = {
  id: string; slug: string; category: ArticleCategory; date: string; readingMinutes: number
  heroImage: string; relatedArticles: string[]; featured?: boolean
  translations: L<ArticleText>
}
/** Flattened article for a single language. */
export type LocalizedArticle = Omit<Article, 'translations'> & ArticleText

const img = { a1: U('1576426863848-c21f53c60b19', 1200), a2: U('1655026392641-bf283a5f12d4', 1200), a3: U('1599847896696-7e19dbd9d2e8', 1200), a4: U('1573575155376-b5010099301b', 1200), a5: U('1552256031-811fa8f0a7b1', 1200), a6: U('1670201202961-dce15b9e6939', 1200), a7: IMG.hero, a8: U('1585652757141-8837d676fac8', 1200), a9: IMG.clinic }

// Prototype editorial content — general education only, no clinical claims.
export const ARTICLES: Article[] = [
  {
    id: '1', slug: 'merawat-skin-barrier', category: 'Skin Barrier', date: '2024-01-12', readingMinutes: 6,
    heroImage: IMG.a1, featured: true, relatedArticles: ['4', '6', '2'],
    translations: {
      id: {
        title: 'Cara Merawat Skin Barrier Agar Kulit Tetap Sehat',
        excerpt: 'Skin barrier adalah lapisan pelindung alami kulit. Kenali tanda-tanda saat ia terganggu dan kebiasaan sederhana untuk menjaganya.',
        content: [
          { id: 'apa-itu', heading: 'Apa itu skin barrier?', paragraphs: ['Skin barrier adalah lapisan terluar kulit yang bekerja seperti dinding: menahan kelembapan di dalam dan membantu menjaga iritan dari luar.', 'Saat lapisan ini dalam kondisi baik, kulit cenderung terasa nyaman, kenyal, dan tidak mudah perih ketika terkena produk.'] },
          { id: 'tanda', heading: 'Tanda skin barrier terganggu', paragraphs: ['Setiap kulit memberi sinyal yang berbeda. Beberapa tanda yang sering dirasakan antara lain:'], list: ['Kulit terasa ketat atau kering setelah mencuci muka', 'Rasa perih saat memakai produk yang biasanya nyaman', 'Kemerahan yang muncul lebih sering', 'Tekstur kulit terasa kasar atau bersisik'] },
          { id: 'kebiasaan', heading: 'Kebiasaan yang membantu', paragraphs: ['Merawat skin barrier sering kali berarti melakukan lebih sedikit, bukan lebih banyak. Rutinitas yang sederhana memberi kulit ruang untuk pulih.'], quote: 'Kulit yang tenang biasanya lahir dari rutinitas yang konsisten, bukan dari jumlah produk.', image: { src: img.a1, caption: 'Rutinitas sederhana dengan sedikit produk sering kali lebih mudah dijalani secara konsisten.' } },
          { id: 'kapan', heading: 'Kapan sebaiknya berkonsultasi', paragraphs: ['Jika keluhan tidak membaik atau terasa mengganggu aktivitas, konsultasi dengan dokter spesialis kulit dapat membantu memahami penyebabnya dan menentukan langkah yang sesuai untuk kondisi Anda.'] },
        ],
      },
      en: {
        title: 'How to Care for Your Skin Barrier and Keep Skin Healthy',
        excerpt: 'The skin barrier is your skin’s natural protective layer. Learn the signs that it has been disrupted and simple habits to help maintain it.',
        content: [
          { id: 'apa-itu', heading: 'What is the skin barrier?', paragraphs: ['The skin barrier is the outermost layer of the skin, and it works like a wall: keeping moisture in and helping to keep irritants out.', 'When this layer is in good condition, skin tends to feel comfortable and supple, and it is less likely to sting when products are applied.'] },
          { id: 'tanda', heading: 'Signs of a disrupted skin barrier', paragraphs: ['Every skin sends different signals. Some commonly noticed signs include:'], list: ['Skin feels tight or dry after cleansing', 'Stinging when using products that are usually comfortable', 'Redness that appears more often', 'Skin texture that feels rough or flaky'] },
          { id: 'kebiasaan', heading: 'Helpful habits', paragraphs: ['Caring for your skin barrier often means doing less, not more. A simple routine gives the skin room to recover.'], quote: 'Calm skin usually comes from a consistent routine, not from the number of products.', image: { src: img.a1, caption: 'A simple routine with fewer products is often easier to follow consistently.' } },
          { id: 'kapan', heading: 'When to seek a consultation', paragraphs: ['If your concerns do not improve or start to interfere with daily activities, consulting a dermatologist can help you understand the cause and decide on the right next steps for your condition.'] },
        ],
      },
    },
  },
  {
    id: '2', slug: 'double-cleansing', category: 'Perawatan Estetik', date: '2024-06-08', readingMinutes: 5,
    heroImage: IMG.a2, relatedArticles: ['1', '5', '3'],
    translations: {
      id: {
        title: 'Pentingnya Double Cleansing untuk Kulit Bersih Optimal',
        excerpt: 'Double cleansing membantu mengangkat sunscreen dan riasan dengan lebih lembut. Pelajari kapan teknik ini diperlukan.',
        content: [
          { id: 'pengertian', heading: 'Mengenal double cleansing', paragraphs: ['Double cleansing adalah membersihkan wajah dalam dua tahap: pembersih berbasis minyak atau balm, lalu pembersih berbasis air.', 'Tahap pertama melarutkan riasan dan sunscreen, sementara tahap kedua membersihkan sisa kotoran di permukaan kulit.'] },
          { id: 'kapan-perlu', heading: 'Apakah semua orang perlu?', paragraphs: ['Tidak selalu. Kebutuhan bergantung pada aktivitas dan produk yang Anda gunakan sehari-hari.'], list: ['Berguna setelah memakai riasan atau sunscreen tahan air', 'Bisa dilewati pada pagi hari', 'Pilih pembersih yang tidak membuat kulit terasa ketat'] },
          { id: 'cara', heading: 'Cara melakukannya dengan lembut', paragraphs: ['Gunakan gerakan memutar yang ringan dan bilas dengan air suam-suam kuku. Hindari menggosok terlalu keras.'], quote: 'Bersih tidak harus berarti kesat — kulit yang nyaman setelah dibilas adalah tanda yang baik.', image: { src: img.a2, caption: 'Pilih tekstur pembersih yang terasa nyaman di kulit Anda.' } },
          { id: 'catatan', heading: 'Catatan untuk kulit sensitif', paragraphs: ['Bagi kulit yang mudah iritasi, satu tahap pembersihan yang lembut mungkin sudah cukup. Diskusikan dengan dokter bila Anda ragu.'] },
        ],
      },
      en: {
        title: 'Why Double Cleansing Matters for Truly Clean Skin',
        excerpt: 'Double cleansing helps remove sunscreen and makeup more gently. Learn when this technique is worth using.',
        content: [
          { id: 'pengertian', heading: 'Understanding double cleansing', paragraphs: ['Double cleansing means washing your face in two steps: first with an oil- or balm-based cleanser, then with a water-based cleanser.', 'The first step dissolves makeup and sunscreen, while the second removes any remaining impurities from the surface of the skin.'] },
          { id: 'kapan-perlu', heading: 'Does everyone need it?', paragraphs: ['Not always. It depends on your activities and the products you use every day.'], list: ['Useful after wearing makeup or water-resistant sunscreen', 'Can be skipped in the morning', 'Choose cleansers that do not leave skin feeling tight'] },
          { id: 'cara', heading: 'How to do it gently', paragraphs: ['Use light circular motions and rinse with lukewarm water. Avoid scrubbing too hard.'], quote: 'Clean does not have to mean squeaky — skin that feels comfortable after rinsing is a good sign.', image: { src: img.a2, caption: 'Choose a cleanser texture that feels comfortable on your skin.' } },
          { id: 'catatan', heading: 'A note for sensitive skin', paragraphs: ['For skin that is easily irritated, a single gentle cleanse may be enough. Talk to a doctor if you are unsure.'] },
        ],
      },
    },
  },
  {
    id: '3', slug: 'mitos-fakta-sunscreen', category: 'Dermatologi', date: '2024-01-05', readingMinutes: 7,
    heroImage: IMG.a3, relatedArticles: ['1', '7', '2'],
    translations: {
      id: {
        title: 'Mitos dan Fakta seputar Sunscreen yang Perlu Anda Ketahui',
        excerpt: 'Dari "tidak perlu di dalam ruangan" hingga "SPF tinggi cukup sekali sehari" — mari luruskan anggapan yang sering beredar.',
        content: [
          { id: 'mengapa', heading: 'Mengapa sunscreen penting', paragraphs: ['Paparan sinar matahari dapat memengaruhi kondisi kulit dari waktu ke waktu. Sunscreen membantu melindungi kulit sebagai bagian dari rutinitas harian.'] },
          { id: 'mitos', heading: 'Anggapan yang sering keliru', paragraphs: ['Beberapa anggapan yang sering kami dengar dalam ruang konsultasi:'], list: ['"Saya di dalam ruangan, jadi tidak perlu sunscreen."', '"Cukup dipakai sekali di pagi hari."', '"Kulit gelap tidak membutuhkan perlindungan."', '"Sunscreen selalu menyebabkan jerawat."'] },
          { id: 'pemakaian', heading: 'Pemakaian yang lebih tepat', paragraphs: ['Gunakan dalam jumlah yang cukup dan aplikasikan ulang sesuai aktivitas, terutama saat berkeringat atau berada di luar ruangan.'], quote: 'Sunscreen terbaik adalah yang nyaman sehingga Anda mau memakainya setiap hari.', image: { src: img.a3, caption: 'Tekstur yang ringan membuat pemakaian ulang terasa lebih mudah.' } },
          { id: 'memilih', heading: 'Memilih yang sesuai', paragraphs: ['Jenis kulit, aktivitas, dan preferensi tekstur memengaruhi pilihan. Dokter dapat membantu bila Anda memiliki kulit berjerawat atau sensitif.'] },
        ],
      },
      en: {
        title: 'Sunscreen Myths and Facts You Should Know',
        excerpt: 'From "you don’t need it indoors" to "high SPF once a day is enough" — let’s clear up some common misconceptions.',
        content: [
          { id: 'mengapa', heading: 'Why sunscreen matters', paragraphs: ['Sun exposure can affect the condition of your skin over time. Sunscreen helps protect the skin as part of a daily routine.'] },
          { id: 'mitos', heading: 'Common misconceptions', paragraphs: ['Some beliefs we often hear in the consultation room:'], list: ['"I stay indoors, so I don’t need sunscreen."', '"Applying it once in the morning is enough."', '"Darker skin doesn’t need protection."', '"Sunscreen always causes breakouts."'] },
          { id: 'pemakaian', heading: 'Using it the right way', paragraphs: ['Apply a sufficient amount and reapply according to your activities, especially when sweating or spending time outdoors.'], quote: 'The best sunscreen is one that feels comfortable enough to wear every day.', image: { src: img.a3, caption: 'A lightweight texture makes reapplying feel easier.' } },
          { id: 'memilih', heading: 'Choosing the right one', paragraphs: ['Skin type, activities, and texture preferences all influence your choice. A doctor can help if you have acne-prone or sensitive skin.'] },
        ],
      },
    },
  },
  {
    id: '4', slug: 'mengenali-kulit-sensitif', category: 'Sensitive Skin', date: '2024-02-20', readingMinutes: 6,
    heroImage: U('1728727267814-792db55ce678', 1200), relatedArticles: ['1', '8', '6'],
    translations: {
      id: {
        title: 'Mengenali Kulit Sensitif dan Cara Menenangkannya',
        excerpt: 'Kulit sensitif bukan diagnosis tunggal. Pahami pemicunya dan bagaimana menyusun rutinitas yang lebih bersahabat.',
        content: [
          { id: 'definisi', heading: 'Apa yang dimaksud kulit sensitif', paragraphs: ['Istilah kulit sensitif biasanya menggambarkan kulit yang mudah bereaksi — perih, gatal, atau kemerahan — terhadap produk maupun lingkungan.'] },
          { id: 'pemicu', heading: 'Pemicu yang umum', paragraphs: ['Pemicu berbeda pada setiap orang, namun beberapa yang sering disebut:'], list: ['Pewangi dan alkohol tertentu dalam produk', 'Perubahan cuaca dan udara kering', 'Eksfoliasi yang terlalu sering', 'Mencoba banyak produk baru sekaligus'] },
          { id: 'rutinitas', heading: 'Menyusun rutinitas yang tenang', paragraphs: ['Perkenalkan produk baru satu per satu dan beri jeda beberapa hari untuk melihat respons kulit.'], quote: 'Perlahan bukan berarti lambat — ini cara kulit memberi tahu apa yang cocok.', image: { src: img.a4, caption: 'Mencoba produk sedikit demi sedikit membantu mengenali respons kulit.' } },
          { id: 'dokter', heading: 'Peran konsultasi', paragraphs: ['Reaksi yang berulang sebaiknya dievaluasi oleh dokter agar penyebabnya dapat dipahami dengan lebih jelas.'] },
        ],
      },
      en: {
        title: 'Understanding Sensitive Skin and How to Soothe It',
        excerpt: 'Sensitive skin is not a single diagnosis. Understand its triggers and how to build a gentler routine.',
        content: [
          { id: 'definisi', heading: 'What is meant by sensitive skin', paragraphs: ['The term sensitive skin usually describes skin that reacts easily — with stinging, itching, or redness — to products or the environment.'] },
          { id: 'pemicu', heading: 'Common triggers', paragraphs: ['Triggers differ from person to person, but some that are often mentioned include:'], list: ['Fragrances and certain alcohols in products', 'Weather changes and dry air', 'Exfoliating too often', 'Trying many new products at once'] },
          { id: 'rutinitas', heading: 'Building a calm routine', paragraphs: ['Introduce new products one at a time and wait a few days to see how your skin responds.'], quote: 'Gradual doesn’t mean slow — it’s how your skin tells you what works.', image: { src: img.a4, caption: 'Trying products little by little helps you recognize how your skin responds.' } },
          { id: 'dokter', heading: 'The role of consultation', paragraphs: ['Recurring reactions should be evaluated by a doctor so the cause can be understood more clearly.'] },
        ],
      },
    },
  },
  {
    id: '5', slug: 'jerawat-dewasa', category: 'Acne Care', date: '2024-03-14', readingMinutes: 8,
    heroImage: U('1601049541079-473f79fd3746', 1200), relatedArticles: ['9', '2', '1'],
    translations: {
      id: {
        title: 'Jerawat di Usia Dewasa: Mengapa Masih Muncul?',
        excerpt: 'Jerawat tidak selalu berhenti setelah remaja. Kenali faktor yang dapat berperan dan pendekatan perawatan yang lebih terarah.',
        content: [
          { id: 'gambaran', heading: 'Gambaran umum', paragraphs: ['Banyak orang dewasa masih mengalami jerawat. Hal ini wajar dan dapat dipengaruhi oleh berbagai faktor yang saling berkaitan.'] },
          { id: 'faktor', heading: 'Faktor yang dapat berperan', paragraphs: ['Beberapa hal yang sering dibahas dalam konsultasi:'], list: ['Perubahan hormonal', 'Pola tidur dan stres', 'Produk perawatan atau riasan yang kurang sesuai', 'Kebiasaan menyentuh wajah'] },
          { id: 'pendekatan', heading: 'Pendekatan perawatan', paragraphs: ['Perawatan jerawat biasanya membutuhkan waktu dan konsistensi. Hindari memencet jerawat agar kulit tidak mengalami iritasi lebih lanjut.'], quote: 'Rencana yang konsisten sering kali lebih membantu daripada mengganti produk setiap minggu.', image: { src: img.a5, caption: 'Rencana perawatan disusun berdasarkan kondisi kulit masing-masing.' } },
          { id: 'evaluasi', heading: 'Kapan perlu evaluasi dokter', paragraphs: ['Jika jerawat terasa nyeri, meninggalkan bekas, atau memengaruhi kepercayaan diri, konsultasi dapat membantu menentukan langkah yang tepat.'] },
        ],
      },
      en: {
        title: 'Adult Acne: Why Does It Still Appear?',
        excerpt: 'Acne doesn’t always stop after the teenage years. Learn the factors that may play a role and a more focused approach to care.',
        content: [
          { id: 'gambaran', heading: 'An overview', paragraphs: ['Many adults still experience acne. This is common and can be influenced by a range of interrelated factors.'] },
          { id: 'faktor', heading: 'Factors that may play a role', paragraphs: ['Some topics that often come up during consultations:'], list: ['Hormonal changes', 'Sleep patterns and stress', 'Skincare or makeup products that may not suit your skin', 'Habitually touching your face'] },
          { id: 'pendekatan', heading: 'Approaches to care', paragraphs: ['Acne care usually takes time and consistency. Avoid squeezing breakouts so the skin does not become further irritated.'], quote: 'A consistent plan often helps more than switching products every week.', image: { src: img.a5, caption: 'Care plans are tailored to each person’s skin condition.' } },
          { id: 'evaluasi', heading: 'When to see a doctor', paragraphs: ['If acne is painful, leaves marks, or affects your confidence, a consultation can help determine the right next steps.'] },
        ],
      },
    },
  },
  {
    id: '6', slug: 'pelembap-yang-tepat', category: 'Skin Barrier', date: '2024-04-02', readingMinutes: 5,
    heroImage: U('1670201202833-b0932731628f', 1200), relatedArticles: ['1', '4', '3'],
    translations: {
      id: {
        title: 'Memilih Pelembap yang Tepat untuk Jenis Kulit Anda',
        excerpt: 'Gel, krim, atau balm? Tekstur pelembap yang sesuai membuat rutinitas terasa lebih nyaman dan mudah dijalani.',
        content: [
          { id: 'fungsi', heading: 'Fungsi pelembap', paragraphs: ['Pelembap membantu menjaga hidrasi dan mendukung lapisan pelindung kulit, termasuk pada kulit berminyak.'] },
          { id: 'tekstur', heading: 'Mengenal tekstur', paragraphs: ['Secara umum, pilihan tekstur dapat disesuaikan dengan preferensi:'], list: ['Gel — terasa ringan dan cepat meresap', 'Lotion — seimbang untuk penggunaan harian', 'Krim — lebih kaya untuk kulit yang terasa kering', 'Balm — oklusif, sering dipakai pada area tertentu'] },
          { id: 'cara-pakai', heading: 'Cara pemakaian', paragraphs: ['Aplikasikan saat kulit masih sedikit lembap setelah dibersihkan.'], quote: 'Pelembap yang tepat adalah yang membuat Anda lupa sedang memakainya.', image: { src: img.a6, caption: 'Tekstur yang sesuai membantu rutinitas terasa lebih nyaman.' } },
          { id: 'saran', heading: 'Saran untuk memulai', paragraphs: ['Mulailah dengan formula sederhana. Bila kulit tetap terasa kering atau iritasi, diskusikan dengan dokter.'] },
        ],
      },
      en: {
        title: 'Choosing the Right Moisturizer for Your Skin Type',
        excerpt: 'Gel, cream, or balm? The right moisturizer texture makes your routine more comfortable and easier to keep up.',
        content: [
          { id: 'fungsi', heading: 'What a moisturizer does', paragraphs: ['A moisturizer helps maintain hydration and supports the skin’s protective layer, including in oily skin.'] },
          { id: 'tekstur', heading: 'Understanding textures', paragraphs: ['In general, you can choose a texture based on your preference:'], list: ['Gel — feels light and absorbs quickly', 'Lotion — balanced for everyday use', 'Cream — richer, for skin that feels dry', 'Balm — occlusive, often used on specific areas'] },
          { id: 'cara-pakai', heading: 'How to apply', paragraphs: ['Apply while your skin is still slightly damp after cleansing.'], quote: 'The right moisturizer is one you forget you are wearing.', image: { src: img.a6, caption: 'A suitable texture helps your routine feel more comfortable.' } },
          { id: 'saran', heading: 'Tips for getting started', paragraphs: ['Start with a simple formula. If your skin still feels dry or irritated, talk to a doctor.'] },
        ],
      },
    },
  },
  {
    id: '7', slug: 'konsultasi-pertama', category: 'Dermatologi', date: '2024-04-18', readingMinutes: 4,
    heroImage: IMG.clinic, relatedArticles: ['3', '5', '4'],
    translations: {
      id: {
        title: 'Apa yang Perlu Disiapkan Sebelum Konsultasi Pertama',
        excerpt: 'Catatan kecil sebelum datang dapat membuat waktu konsultasi lebih bermakna — untuk Anda maupun dokter.',
        content: [
          { id: 'tujuan', heading: 'Mengapa persiapan membantu', paragraphs: ['Konsultasi yang baik dimulai dari percakapan. Informasi yang lengkap membantu dokter memahami kondisi kulit Anda.'] },
          { id: 'catatan', heading: 'Hal yang bisa dicatat', paragraphs: ['Beberapa hal yang dapat Anda siapkan:'], list: ['Keluhan utama dan sejak kapan muncul', 'Produk yang sedang digunakan', 'Riwayat alergi atau pengobatan', 'Pertanyaan yang ingin diajukan'] },
          { id: 'saat-konsultasi', heading: 'Saat di ruang konsultasi', paragraphs: ['Datang dengan wajah tanpa riasan bila memungkinkan, sehingga kondisi kulit dapat terlihat dengan jelas.'], quote: 'Tidak ada pertanyaan yang terlalu kecil ketika menyangkut kulit Anda.', image: { src: img.a7, caption: 'Ruang konsultasi yang tenang membantu percakapan berjalan lebih terbuka.' } },
          { id: 'setelahnya', heading: 'Setelah konsultasi', paragraphs: ['Catat rencana perawatan dan jadwal kontrol berikutnya agar perkembangan kulit lebih mudah dipantau.'] },
        ],
      },
      en: {
        title: 'What to Prepare Before Your First Consultation',
        excerpt: 'A few notes before your visit can make your consultation time more meaningful — for both you and your doctor.',
        content: [
          { id: 'tujuan', heading: 'Why preparation helps', paragraphs: ['A good consultation starts with a conversation. Complete information helps your doctor understand your skin condition.'] },
          { id: 'catatan', heading: 'Things worth noting down', paragraphs: ['A few things you can prepare:'], list: ['Your main concern and when it started', 'The products you are currently using', 'Any history of allergies or medications', 'Questions you would like to ask'] },
          { id: 'saat-konsultasi', heading: 'In the consultation room', paragraphs: ['Come without makeup if possible, so your skin condition can be seen clearly.'], quote: 'No question is too small when it comes to your skin.', image: { src: img.a7, caption: 'A calm consultation room helps the conversation feel more open.' } },
          { id: 'setelahnya', heading: 'After the consultation', paragraphs: ['Write down your care plan and next follow-up appointment so your skin’s progress is easier to track.'] },
        ],
      },
    },
  },
  {
    id: '8', slug: 'kemerahan-wajah', category: 'Sensitive Skin', date: '2024-05-06', readingMinutes: 6,
    heroImage: U('1665763630810-e6251bdd392d', 1200), relatedArticles: ['4', '1', '7'],
    translations: {
      id: {
        title: 'Kemerahan pada Wajah: Kenali Pemicu Sehari-hari',
        excerpt: 'Kemerahan bisa datang dan pergi. Perhatikan pola sederhana yang dapat membantu Anda dan dokter memahaminya.',
        content: [
          { id: 'pola', heading: 'Memperhatikan pola', paragraphs: ['Kemerahan dapat dipicu oleh banyak hal. Mencatat kapan ia muncul membantu mengenali polanya.'] },
          { id: 'pemicu', heading: 'Pemicu sehari-hari', paragraphs: ['Beberapa hal yang kerap dikaitkan dengan kemerahan:'], list: ['Suhu panas atau perubahan suhu mendadak', 'Makanan pedas dan minuman panas', 'Produk dengan pewangi kuat', 'Menggosok wajah terlalu keras'] },
          { id: 'menenangkan', heading: 'Langkah menenangkan', paragraphs: ['Gunakan air suam-suam kuku, pilih produk yang lembut, dan beri kulit waktu beristirahat.'], quote: 'Mencatat pemicu adalah langkah kecil yang sangat membantu percakapan dengan dokter.', image: { src: img.a8, caption: 'Produk yang lembut membantu kulit terasa lebih tenang.' } },
          { id: 'konsultasi', heading: 'Kapan perlu ke dokter', paragraphs: ['Kemerahan yang menetap atau disertai rasa tidak nyaman sebaiknya diperiksakan.'] },
        ],
      },
      en: {
        title: 'Facial Redness: Recognizing Everyday Triggers',
        excerpt: 'Redness can come and go. Watch for simple patterns that can help you and your doctor understand it.',
        content: [
          { id: 'pola', heading: 'Noticing patterns', paragraphs: ['Redness can be triggered by many things. Noting when it appears helps you recognize its pattern.'] },
          { id: 'pemicu', heading: 'Everyday triggers', paragraphs: ['Some things that are often associated with redness:'], list: ['Heat or sudden temperature changes', 'Spicy food and hot drinks', 'Products with strong fragrance', 'Rubbing the face too hard'] },
          { id: 'menenangkan', heading: 'Soothing steps', paragraphs: ['Use lukewarm water, choose gentle products, and give your skin time to rest.'], quote: 'Keeping track of triggers is a small step that makes conversations with your doctor much easier.', image: { src: img.a8, caption: 'Gentle products help the skin feel calmer.' } },
          { id: 'konsultasi', heading: 'When to see a doctor', paragraphs: ['Redness that persists or comes with discomfort should be checked by a doctor.'] },
        ],
      },
    },
  },
  {
    id: '9', slug: 'bekas-jerawat', category: 'Perawatan Estetik', date: '2024-05-22', readingMinutes: 7,
    heroImage: U('1655026392641-bf283a5f12d4', 1200), relatedArticles: ['5', '2', '7'],
    translations: {
      id: {
        title: 'Bekas Jerawat: Memahami Jenis dan Pilihan Perawatannya',
        excerpt: 'Tidak semua bekas jerawat sama. Mengenali jenisnya membantu menentukan harapan dan pilihan perawatan yang realistis.',
        content: [
          { id: 'jenis', heading: 'Jenis bekas jerawat', paragraphs: ['Bekas jerawat dapat berupa noda warna atau perubahan tekstur. Keduanya memerlukan pendekatan yang berbeda.'] },
          { id: 'kebiasaan', heading: 'Kebiasaan yang membantu', paragraphs: ['Beberapa langkah dasar yang dapat dilakukan:'], list: ['Hindari memencet jerawat', 'Gunakan sunscreen setiap hari', 'Bersabar — perubahan kulit membutuhkan waktu'] },
          { id: 'pilihan', heading: 'Pilihan perawatan di klinik', paragraphs: ['Dokter dapat menjelaskan pilihan perawatan estetik yang sesuai setelah melakukan evaluasi kondisi kulit secara langsung.'], quote: 'Harapan yang realistis adalah bagian penting dari setiap rencana perawatan.', image: { src: img.a9, caption: 'Pilihan perawatan didiskusikan setelah evaluasi bersama dokter.' } },
          { id: 'diskusi', heading: 'Diskusikan dengan dokter', paragraphs: ['Setiap kulit berbeda. Konsultasi membantu menentukan pendekatan yang paling sesuai untuk Anda.'] },
        ],
      },
      en: {
        title: 'Acne Scars: Understanding the Types and Treatment Options',
        excerpt: 'Not all acne marks are the same. Recognizing the type helps set realistic expectations and treatment choices.',
        content: [
          { id: 'jenis', heading: 'Types of acne marks', paragraphs: ['Acne marks can appear as discoloration or as changes in skin texture. Each calls for a different approach.'] },
          { id: 'kebiasaan', heading: 'Helpful habits', paragraphs: ['A few basic steps you can take:'], list: ['Avoid squeezing breakouts', 'Use sunscreen every day', 'Be patient — skin changes take time'] },
          { id: 'pilihan', heading: 'In-clinic treatment options', paragraphs: ['A doctor can explain suitable aesthetic treatment options after evaluating your skin condition in person.'], quote: 'Realistic expectations are an important part of every treatment plan.', image: { src: img.a9, caption: 'Treatment options are discussed after an evaluation with your doctor.' } },
          { id: 'diskusi', heading: 'Talk to your doctor', paragraphs: ['Every skin is different. A consultation helps determine the approach that suits you best.'] },
        ],
      },
    },
  },
]

export const getArticle = (id: string) => ARTICLES.find((a) => a.id === id || a.slug === id)

/** Text (title/excerpt/content) of an article in the given language. */
export const articleText = (a: Article, lang: Lang): ArticleText => a.translations[lang]

/** Flatten an article for one language. */
export const localizeArticle = (a: Article, lang: Lang): LocalizedArticle => {
  const { translations, ...rest } = a
  return { ...rest, ...translations[lang] }
}

/** Localized short date, e.g. "12 Jan 2024" / "Jan 12, 2024". */
export const formatArticleDate = (date: string, lang: Lang) =>
  new Date(date + 'T00:00:00').toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })
