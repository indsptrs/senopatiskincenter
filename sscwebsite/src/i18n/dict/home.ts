const id = {
  hero: {
    eyebrow: 'Klinik Spesialis Kulit — Jakarta',
    title: ['Kulit sehat dimulai', 'dari penanganan', 'yang tepat.'],
    body: 'Konsultasi dengan dokter spesialis kulit untuk solusi yang aman, tepat, dan sesuai dengan kebutuhan kulit Anda.',
    schedule: 'Lihat Jadwal Dokter',
    imgAlt: 'Konsultasi dokter kulit',
    available: 'Dokter tersedia hari ini',
  },
  features: [
    ['Dokter spesialis kulit', 'berpengalaman'],
    ['Pendekatan personal', 'dan berbasis bukti'],
    ['Lokasi strategis', 'di Senopati, Jakarta'],
  ],
  about: {
    imgAlt: 'Resepsionis klinik',
    eyebrow: 'Tentang Kami',
    title: ['Perawatan kulit yang', 'lebih dari sekadar estetika.'],
    body: 'Senopati Skin Center adalah klinik spesialis kulit di Jakarta yang berfokus pada kesehatan kulit secara menyeluruh, dengan pendekatan medis, personal, dan berbasis bukti.',
    more: 'Lebih Lanjut Tentang Kami',
  },
  doctors: { title: 'Dokter Spesialis Kami', all: 'Lihat Semua Dokter', specialty: 'Spesialis Kulit dan Kelamin', practice: 'Praktik:', profile: 'Lihat Profil' },
  days: {
    short: { Sen: 'Sen', Sel: 'Sel', Rab: 'Rab', Kam: 'Kam', Jum: 'Jum', Sab: 'Sab' },
    long: { Sen: 'Senin', Sel: 'Selasa', Rab: 'Rabu', Kam: 'Kamis', Jum: 'Jumat', Sab: 'Sabtu' },
  },
  schedule: { title: 'Jadwal Praktik', sub: 'Pilih hari untuk melihat dokter yang tersedia.', doctor: 'Dokter', hours: 'Jam Praktik', status: 'Status', full: 'Hampir Penuh', available: 'Tersedia', all: 'Lihat Jadwal Lengkap' },
  articles: {
    title: 'Artikel Terbaru', sub: 'Edukasi kesehatan kulit dari dokter spesialis kami.', all: 'Lihat Semua Artikel', read: 'Baca Artikel',
    of: 'dari', prev: 'Artikel sebelumnya', next: 'Artikel berikutnya',
    items: [
      { cat: 'Perawatan Kulit', date: '12 Jan 2024', title: 'Cara Merawat Skin Barrier Agar Kulit Tetap Sehat', ex: 'Kenali fungsi skin barrier dan langkah sederhana untuk menjaganya tetap kuat.' },
      { cat: 'Tips', date: '8 Jun 2024', title: 'Pentingnya Double Cleansing untuk Kulit Bersih Optimal', ex: 'Mengapa membersihkan wajah dua tahap membantu pori tetap bersih.' },
      { cat: 'Edukasi', date: '5 Jan 2024', title: 'Mitos dan Fakta seputar Sunscreen yang Perlu Anda Ketahui', ex: 'Meluruskan anggapan umum tentang tabir surya menurut dokter kulit.' },
    ],
  },
  testimonials: {
    title: 'Kata Mereka', prev: 'Sebelumnya', next: 'Berikutnya', page: 'Halaman',
    items: [
      'Penjelasan dokter sangat jelas dan membantu saya memahami kondisi kulit saya. Sekarang kulit saya jauh lebih baik dan terasa lebih sehat.',
      'Dokternya sangat sabar dan perhatian. Saya merasa didengar dan diberikan solusi yang tepat sesuai kondisi kulit saya. Sangat merekomendasikan!',
      'Lingkungannya nyaman, stafnya ramah, dan dokternya profesional. Pengalaman konsultasi yang menyenangkan dari awal sampai akhir.',
      'Proses booking mudah dan tepat waktu. Hasil perawatan jerawat saya terlihat dalam beberapa minggu saja.',
      'Saya suka pendekatannya yang berbasis bukti, tidak ada produk yang dipaksakan. Terasa sangat profesional.',
      'Klinik yang bersih dan tenang. Dokter menjelaskan setiap langkah perawatan dengan detail.',
      'Konsultasi yang sangat membantu, saya akhirnya paham rutinitas skincare yang cocok untuk kulit sensitif saya.',
      'Pelayanan ramah dari resepsionis hingga dokter. Pasti akan kembali untuk kontrol berikutnya.',
      'Hasil perawatan bekas jerawat saya jauh melebihi ekspektasi. Terima kasih Senopati Skin Center!',
    ],
  },
  faqSection: {
    title: ['Pertanyaan yang', 'Sering Diajukan'],
    body: 'Temukan jawaban untuk pertanyaan yang paling sering ditanyakan tentang perawatan kulit di Senopati Skin Center.',
    all: 'Lihat Semua FAQ',
  },
  faq: [
    { q: 'Apakah perlu membuat janji terlebih dahulu?', a: 'Ya, kami sangat menyarankan untuk membuat janji terlebih dahulu agar Anda mendapatkan waktu konsultasi yang lebih nyaman dan pelayanan yang optimal.' },
    { q: 'Jenis perawatan kulit apa saja yang tersedia?', a: 'Kami menyediakan konsultasi kulit, perawatan jerawat, pigmentasi, anti-aging, serta tindakan medis dermatologi sesuai rekomendasi dokter.' },
    { q: 'Apakah perawatan di Senopati Skin Center ditanggung asuransi?', a: 'Beberapa layanan medis dapat ditanggung asuransi tertentu. Silakan hubungi kami untuk konfirmasi sesuai polis Anda.' },
    { q: 'Berapa lama hasil perawatan biasanya terlihat?', a: 'Umumnya hasil mulai terlihat dalam 2–6 minggu, tergantung kondisi kulit dan jenis perawatan.' },
    { q: 'Apakah ada pantangan setelah perawatan?', a: 'Dokter akan memberikan panduan perawatan pasca tindakan, seperti menghindari paparan matahari langsung dan menggunakan sunscreen.' },
  ],
  cta: { title: 'Mulai perjalanan kulit sehat Anda', body: 'Konsultasikan kondisi kulit Anda dengan dokter spesialis kami.' },
}

const en: typeof id = {
  hero: {
    eyebrow: 'Specialist Dermatology Clinic — Jakarta',
    title: ['Healthy skin begins', 'with the right', 'care.'],
    body: 'Consult a board-certified dermatologist for safe, precise care tailored to the needs of your skin.',
    schedule: "View Doctors' Schedule",
    imgAlt: 'Dermatologist consultation',
    available: 'Doctors available today',
  },
  features: [
    ['Experienced', 'dermatologists'],
    ['A personal,', 'evidence-based approach'],
    ['Conveniently located', 'in Senopati, Jakarta'],
  ],
  about: {
    imgAlt: 'Clinic reception',
    eyebrow: 'About Us',
    title: ['Skin care that goes', 'beyond aesthetics.'],
    body: 'Senopati Skin Center is a specialist dermatology clinic in Jakarta dedicated to whole-skin health, through a medical, personal and evidence-based approach.',
    more: 'Learn More About Us',
  },
  doctors: { title: 'Our Dermatologists', all: 'View All Doctors', specialty: 'Dermatology & Venereology Specialist', practice: 'Available:', profile: 'View Profile' },
  days: {
    short: { Sen: 'Mon', Sel: 'Tue', Rab: 'Wed', Kam: 'Thu', Jum: 'Fri', Sab: 'Sat' },
    long: { Sen: 'Monday', Sel: 'Tuesday', Rab: 'Wednesday', Kam: 'Thursday', Jum: 'Friday', Sab: 'Saturday' },
  },
  schedule: { title: 'Practice Schedule', sub: 'Select a day to see which doctors are available.', doctor: 'Doctor', hours: 'Hours', status: 'Status', full: 'Almost Full', available: 'Available', all: 'View Full Schedule' },
  articles: {
    title: 'Latest Articles', sub: 'Skin health insights from our dermatologists.', all: 'View All Articles', read: 'Read Article',
    of: 'of', prev: 'Previous article', next: 'Next article',
    items: [
      { cat: 'Skin Care', date: '12 Jan 2024', title: 'How to Care for Your Skin Barrier and Keep Skin Healthy', ex: 'Understand what your skin barrier does and simple ways to keep it strong.' },
      { cat: 'Tips', date: '8 Jun 2024', title: 'Why Double Cleansing Matters for a Truly Clean Complexion', ex: 'How a two-step cleanse helps keep pores clear.' },
      { cat: 'Education', date: '5 Jan 2024', title: 'Sunscreen Myths and Facts You Should Know', ex: 'A dermatologist sets the record straight on common sunscreen beliefs.' },
    ],
  },
  testimonials: {
    title: 'What Our Patients Say', prev: 'Previous', next: 'Next', page: 'Page',
    items: [
      'The doctor explained everything so clearly and helped me truly understand my skin. My skin is now much better and feels healthier.',
      'The doctor was incredibly patient and attentive. I felt heard and was given the right solution for my skin. Highly recommended!',
      'A comfortable setting, friendly staff and professional doctors. A pleasant consultation from start to finish.',
      'Booking was easy and everything ran on time. I saw results from my acne treatment within just a few weeks.',
      'I love the evidence-based approach — no products pushed on you. It feels genuinely professional.',
      'A clean, calm clinic. The doctor explained every step of the treatment in detail.',
      'A truly helpful consultation — I finally understand the right skincare routine for my sensitive skin.',
      "Warm service from reception to the doctor. I'll definitely be back for my next follow-up.",
      'The results of my acne scar treatment far exceeded my expectations. Thank you, Senopati Skin Center!',
    ],
  },
  faqSection: {
    title: ['Frequently Asked', 'Questions'],
    body: 'Find answers to the most common questions about skin care at Senopati Skin Center.',
    all: 'View All FAQs',
  },
  faq: [
    { q: 'Do I need to book an appointment in advance?', a: 'Yes, we highly recommend booking ahead so you can enjoy a more relaxed consultation and the best possible care.' },
    { q: 'What skin treatments do you offer?', a: 'We offer skin consultations, acne care, pigmentation and anti-aging treatments, as well as medical dermatology procedures as recommended by our doctors.' },
    { q: 'Are treatments at Senopati Skin Center covered by insurance?', a: 'Some medical services may be covered by certain insurance providers. Please contact us to confirm based on your policy.' },
    { q: 'How soon can I expect to see results?', a: 'Results typically begin to show within 2–6 weeks, depending on your skin condition and the type of treatment.' },
    { q: 'Are there any restrictions after treatment?', a: 'Your doctor will provide aftercare guidance, such as avoiding direct sun exposure and using sunscreen.' },
  ],
  cta: { title: 'Begin your journey to healthier skin', body: 'Discuss your skin concerns with one of our dermatologists.' },
}

export default { id, en }
