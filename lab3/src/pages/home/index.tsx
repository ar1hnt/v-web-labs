import { useMemo } from 'react'
import { useAppStore } from '../../shared/store'
import { CATEGORIES, PRODUCTS } from '../../entities/model/data'
import { Section } from '../../widgets/products'
import { Card } from '../../widgets/products/card'

export const Home = () => {
  const favorites = useAppStore((s) => s.favorites)
  const cart = useAppStore((s) => s.cart)
  const search = useAppStore((s) => s.search)
  const mode = useAppStore((s) => s.mode)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return PRODUCTS.filter((p) => {
      if (q && !p.title.toLowerCase().includes(q)) return false
      if (mode === 'favorites' && !favorites.includes(p.id)) return false
      if (mode === 'cart' && !cart.includes(p.id)) return false
      return true
    })
  }, [favorites, cart, search, mode])

  const byCat = (key: typeof CATEGORIES[number]['key']) => filtered.filter((p) => p.category === key)

  const anyVisible = filtered.length > 0

  return (
    <section id="products" aria-live="polite">
      {CATEGORIES.map((c) => {
        const items = byCat(c.key)
        if (items.length === 0) return null
        return (
          <Section key={c.key} title={c.title}>
            {items.map((p) => (
              <Card key={p.id} product={p} />
            ))}
          </Section>
        )
      })}
      <p id="emptyMessage" className="empty" hidden={anyVisible}>
        Ничего не найдено.
      </p>
    </section>
  )
}
