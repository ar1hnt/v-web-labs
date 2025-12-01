import { create } from 'zustand'

type Mode = 'all' | 'favorites' | 'cart'

type AppState = {
  favorites: number[]
  cart: number[]
  cartQty: Record<number, number>
  search: string
  mode: Mode
  setSearch: (q: string) => void
  setMode: (mode: Mode) => void
  toggleFavorite: (id: number) => void
  toggleCart: (id: number) => void
  updateCartQty: (id: number, qty: number) => void
  removeFromCart: (id: number) => void
}

const load = <T,>(key: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(key)
    return v ? (JSON.parse(v) as T) : fallback
  } catch {
    return fallback
  }
}

const save = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // noop
  }
}

export const useAppStore = create<AppState>((set, get) => ({
  favorites: load('favorites', [] as number[]),
  cart: load('cart', [] as number[]),
  cartQty: load('cartQty', {} as Record<number, number>),
  search: '',
  mode: 'all',

  setSearch: (q) => set({ search: q }),
  setMode: (mode) => set({ mode }),

  toggleFavorite: (id) => {
    const { favorites } = get()
    const next = favorites.includes(id)
      ? favorites.filter((i) => i !== id)
      : [...favorites, id]
    save('favorites', next)
    set({ favorites: next })
  },
  toggleCart: (id) => {
    const { cart, cartQty } = get()
    const exists = cart.includes(id)
    const next = exists ? cart.filter((i) => i !== id) : [...cart, id]
    const nextQty = { ...cartQty }
    if (!exists) {
      nextQty[id] = nextQty[id] ? nextQty[id] + 1 : 1
    } else {
      delete nextQty[id]
    }
    save('cart', next)
    save('cartQty', nextQty)
    set({ cart: next, cartQty: nextQty })
  },
  updateCartQty: (id, qty) => {
    if (qty < 1) qty = 1
    const { cartQty } = get()
    const next = { ...cartQty, [id]: qty }
    save('cartQty', next)
    set({ cartQty: next })
  },
  removeFromCart: (id) => {
    const { cart, cartQty } = get()
    const nextCart = cart.filter((i) => i !== id)
    const nextQty = { ...cartQty }
    delete nextQty[id]
    save('cart', nextCart)
    save('cartQty', nextQty)
    set({ cart: nextCart, cartQty: nextQty })
  },
}))
