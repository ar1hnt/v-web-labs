import { useAppStore } from '../../shared/store'
import { PRODUCTS } from '../../entities/model/data'
import { Card } from '../../widgets/products/card'

export const Cart = () => {
  const cart = useAppStore((s) => s.cart)
  const items = PRODUCTS.filter((p) => cart.includes(p.id))
  return (
    <section id="products" aria-live="polite">
      <h2 className="category-title">Корзина</h2>
      <div className="products-grid">
        {items.map((p) => (
          <Card key={p.id} product={p} />
        ))}
      </div>
      <p id="emptyMessage" className="empty" hidden={items.length > 0}>
        Корзина пуста.
      </p>
    </section>
  )
}
