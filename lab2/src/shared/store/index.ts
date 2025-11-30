import { create } from 'zustand'

type Mode = 'all' | 'favorites' | 'cart'

type AppState = {
  favorites: number[]
  cart: number[]
  search: string
  mode: Mode
  setSearch: (q: string) => void
  setMode: (mode: Mode) => void
  toggleFavorite: (id: number) => void
  toggleCart: (id: number) => void
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
    const { cart } = get()
    const next = cart.includes(id)
      ? cart.filter((i) => i !== id)
      : [...cart, id]
    save('cart', next)
    set({ cart: next })
  },
}))
