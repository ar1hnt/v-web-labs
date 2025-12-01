import { useAppStore } from '../../shared/store'
import { PRODUCTS } from '../../entities/model/data'
import { Card } from '../../widgets/products/card'

export const Wishlist = () => {
  const favorites = useAppStore((s) => s.favorites)
  const items = PRODUCTS.filter((p) => favorites.includes(p.id))
  return (
    <section id="products" aria-live="polite">
      <h2 className="category-title">Избранное</h2>
      <div className="products-grid">
        {items.map((p) => (
          <Card key={p.id} product={p} />
        ))}
      </div>
      <p id="emptyMessage" className="empty" hidden={items.length > 0}>
        Список избранного пуст.
      </p>
    </section>
  )
}
