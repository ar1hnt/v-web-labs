import type { ReactNode } from 'react'
import { useAppStore } from '../../shared/store'
import { SearchResults } from '../../widgets/search/results'

const Header = () => {
  const favorites = useAppStore((s) => s.favorites)
  const cart = useAppStore((s) => s.cart)
  const setSearch = useAppStore((s) => s.setSearch)
  const mode = useAppStore((s) => s.mode)
  const setMode = useAppStore((s) => s.setMode)

  return (
    <header className="site-header">
      <div className="header-inner">
        <button
          type="button"
          className={`icon-btn home-btn ${mode === 'all' ? 'home-active' : ''}`}
          aria-label="Главная"
          onClick={() => {
            setMode('all')
            setSearch('')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <img className="logo-icon" src="/images/home.png" alt="Home" />
        </button>
        <div className="search-area">
          <div className="search-wrapper">
            <span className="search-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input type="text" placeholder="Поиск товаров..." aria-label="Поиск" onChange={(e) => setSearch(e.target.value)} />
            <SearchResults />
          </div>
        </div>
        <div className="header-actions">
          <button
            className={`icon-btn ${mode === 'favorites' ? 'active-mode' : ''}`}
            aria-label="Избранное"
            onClick={() => setMode(mode === 'favorites' ? 'all' : 'favorites')}
          >
            <span>
              <img className="icon" src="/images/favorite.png" alt="Favorite" />
            </span>
            <span className="badge">{favorites.length}</span>
          </button>
          <button
            className={`icon-btn ${mode === 'cart' ? 'active-mode' : ''}`}
            aria-label="Корзина"
            onClick={() => setMode(mode === 'cart' ? 'all' : 'cart')}
          >
            <span>
              <img className="icon" src="/images/cart.png" alt="Cart" />
            </span>
            <span className="badge">{cart.length}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

const MobileBar = () => {
  const favorites = useAppStore((s) => s.favorites)
  const cart = useAppStore((s) => s.cart)
  const mode = useAppStore((s) => s.mode)
  const setMode = useAppStore((s) => s.setMode)
  const isHome = mode === 'all'
  return (
    <nav className="mobile-bar" aria-label="Основное меню">
      <button className={`m-item ${isHome ? 'active' : ''}`} aria-label="Home" onClick={() => setMode('all')}>
        <img className="logo-icon" src="/images/home.png" alt="Home" />
      </button>
      <button className={`m-item ${mode === 'favorites' ? 'active' : ''}`} aria-label="Favorite" onClick={() => setMode('favorites')}>
        <span className="icon-wrap"><img className="logo-icon" src="/images/favorite.png" alt="Favorite" /></span>
        <span className="m-badge">{favorites.length}</span>
      </button>
      <button className={`m-item ${mode === 'cart' ? 'active' : ''}`} aria-label="Cart" onClick={() => setMode('cart')}>
        <span className="icon-wrap"><img className="logo-icon" src="/images/cart.png" alt="Cart" /></span>
        <span className="m-badge">{cart.length}</span>
      </button>
    </nav>
  )
}

const Footer = () => (
  <footer>
    <span>&copy; 2025 Digit — интернет-магазин</span>
    <span>Политика и безопасность</span>
    <span>Cookie</span>
  </footer>
)

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>{children}</main>
      <MobileBar />
      <Footer />
    </div>
  )
}
