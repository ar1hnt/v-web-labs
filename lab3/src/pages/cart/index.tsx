import { useState, useMemo } from 'react'
import { useAppStore } from '../../shared/store'
import { PRODUCTS } from '../../entities/model/data'
import { Image, Title } from '../../entities'
import { AddToWishlistButton } from '../../features/products/add-to-wishlist/ui'

export const Cart = () => {
  const cart = useAppStore((s) => s.cart)
  const qty = useAppStore((s) => s.cartQty)
  const toggleFavorite = useAppStore((s) => s.toggleFavorite)
  const favorites = useAppStore((s) => s.favorites)
  const updateQty = useAppStore((s) => s.updateCartQty)
  const remove = useAppStore((s) => s.removeFromCart)

  const [selected, setSelected] = useState<number[]>([])
  const allItems = PRODUCTS.filter((p) => cart.includes(p.id))
  const allSelected = selected.length === allItems.length && allItems.length > 0

  const handleSelectAll = () => {
    setSelected(allSelected ? [] : allItems.map((p) => p.id))
  }
  const handleToggle = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }
  const handleDeleteSelected = () => {
    selected.forEach((id) => remove(id))
    setSelected([])
  }

  const summary = useMemo(() => {
    const items = allItems.filter((p) => selected.includes(p.id))
    const count = items.length
    const totalOriginal = items.reduce((sum, p) => sum + p.price * (qty[p.id] || 1), 0)
    const totalDiscounted = items.reduce(
      (sum, p) => sum + (p.discountPrice ? p.discountPrice : p.price) * (qty[p.id] || 1),
      0,
    )
    const discount = totalOriginal - totalDiscounted
    return { count, totalOriginal, totalDiscounted, discount }
  }, [selected, allItems, qty])

  return (
    <section id="products" aria-live="polite">
      <h2 className="category-title">Корзина</h2>
      <div className="cart-page">
        <div className="cart-left">
          <div className="cart-actions">
            <label style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.75rem' }}>
              <input type="checkbox" checked={allSelected} onChange={handleSelectAll} /> Выбрать всё
            </label>
            <button type="button" className="delete-selected" onClick={handleDeleteSelected} disabled={selected.length === 0}>
              Удалить выбранные
            </button>
          </div>
          <div className="cart-items">
            {allItems.map((p) => {
              const inFav = favorites.includes(p.id)
              const isSelected = selected.includes(p.id)
              const itemQty = qty[p.id] || 1
              const showDiscount = !!p.discountPrice
              return (
                <div className="cart-item" key={p.id} data-id={p.id}>
                  <div className="thumb">
                    <Image url={p.image.url} alt={p.image.alt} />
                    <input
                      className="select"
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggle(p.id)}
                      aria-label="Выбрать"
                    />
                  </div>
                  <div className="info">
                    <Title title={p.title} />
                    <div className="actions">
                      <AddToWishlistButton inWishlist={inFav} onClick={() => toggleFavorite(p.id)} />
                      <button
                        type="button"
                        className="small-btn"
                        onClick={() => alert('Покупка оформляется...')}
                        aria-label="Купить"
                        style={{ width: 'auto', padding: '0 .6rem' }}
                      >
                        Купить
                      </button>
                      <button
                        type="button"
                        className="small-btn"
                        aria-label="Удалить из корзины"
                        onClick={() => remove(p.id)}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <div className="price-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--primary)' }}>
                      {showDiscount ? <img className="discount-icon" src="/images/pricetag.png" alt="Скидка" /> : null} {(p.discountPrice ? p.discountPrice : p.price) * itemQty} ₽
                    </div>
                    {showDiscount ? (
                      <div style={{ fontSize: '.6rem', textDecoration: 'line-through', color: 'var(--text-light)' }}>
                        {p.price * itemQty} ₽
                      </div>
                    ) : null}
                    <div className="qty" aria-label="Количество">
                        <button type="button" onClick={() => updateQty(p.id, itemQty - 1)} aria-label="Минус">
                          -
                        </button>
                        <span style={{ minWidth: '24px', textAlign: 'center', fontSize: '.75rem', fontWeight: 600 }}>{itemQty}</span>
                        <button type="button" onClick={() => updateQty(p.id, itemQty + 1)} aria-label="Плюс">
                          +
                        </button>
                      </div>
                  </div>
                </div>
              )
            })}
            <p id="emptyMessage" className="empty" hidden={allItems.length > 0}>
              Корзина пуста.
            </p>
          </div>
        </div>
        <aside className="cart-summary" aria-label="Сводка корзины">
          <h3 style={{ margin: 0, fontSize: '.9rem', fontWeight: 600 }}>Ваша корзина</h3>
          <div className="summary-row">
            <span>Товары ({summary.count})</span>
            <span>{summary.totalDiscounted} ₽</span>
          </div>
            <div className="summary-row">
            <span>Скидка</span>
            <span className="discount">-{summary.discount} ₽</span>
          </div>
          <div className="summary-row total">
            <span>Итого</span>
            <span>{summary.totalDiscounted} ₽</span>
          </div>
          <button type="button" className="pay-btn" disabled={summary.count === 0} onClick={() => alert('Оплата...')}>Оплатить</button>
        </aside>
      </div>
    </section>
  )
}
