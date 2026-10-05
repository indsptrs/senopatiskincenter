import Footer from './components/Footer'
import Header from './components/Header'
import DoctorProfile from './pages/DoctorProfile'
import ArticleDetail from './pages/ArticleDetail'
import Articles from './pages/Articles'
import BookingRedirect from './pages/BookingRedirect'
import About from './pages/About'
import Doctors from './pages/Doctors'
import Home from './pages/Home'
import Placeholder from './pages/Placeholder'
import Schedule from './pages/Schedule'
import useLanguage from './i18n/useLanguage'
import { usePath } from './router'
import { useParallax } from './components/ui'

const STUBS: Record<string, [string, string]> = {
  '/faq': ['FAQ', 'faq'],
  '/kebijakan-privasi': ['legal', 'privacy'],
  '/syarat-ketentuan': ['legal', 'terms'],
}

function Page({ path }: { path: string }) {
  const { t } = useLanguage()
  const p = (k: string) => (k === 'FAQ' ? k : t(`common.placeholder.${k}`))
  if (path === '/') return <Home />
  if (path === '/tentang-kami') return <About />
  if (path === '/dokter') return <Doctors />
  if (path === '/jadwal-praktik') return <Schedule />
  if (path === '/artikel') return <Articles />
  if (path === '/buat-janji') return <BookingRedirect />
  const doc = path.match(/^\/dokter\/([^/]+)$/)
  if (doc) {
    return <DoctorProfile id={doc[1]} />
  }
  const art = path.match(/^\/artikel\/([^/]+)$/)
  if (art) return <ArticleDetail id={art[1]} />
  const s = STUBS[path]
  return s ? <Placeholder label={p(s[0])} title={p(s[1])} /> : <Placeholder label="404" title={p('notFound')} />
}

export default function App() {
  const path = usePath().replace(/\/+$/, '') || '/'
  useParallax(path)
  return (
    <div className="overflow-x-hidden">
      <Header />
      <main key={path}><Page path={path} /></main>
      <Footer />
    </div>
  )
}
