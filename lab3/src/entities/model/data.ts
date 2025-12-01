import type { CategoryKey, Product } from './types'

export const CATEGORIES: Array<{ key: CategoryKey; title: string }> = [
  { key: 'electronics', title: 'Электроника' },
  { key: 'clothes', title: 'Одежда' },
  { key: 'accessories', title: 'Аксессуары' },
  { key: 'home', title: 'Для дома' },
]

export const PRODUCTS: Product[] = [
  // electronics
  { id: 1, category: 'electronics', title: 'Телефон', price: 12999, discountPrice: 9999, image: { url: '/images/stub.png', alt: 'Телефон' } },
  { id: 2, category: 'electronics', title: 'Ноутбук', price: 49999, discountPrice: null, image: { url: '/images/stub.png', alt: 'Ноутбук' } },
  { id: 3, category: 'electronics', title: 'Электронные часы', price: 24999, discountPrice: 19999, image: { url: '/images/stub.png', alt: 'Электронные часы' } },
  { id: 4, category: 'electronics', title: 'Планшет', price: 34999, discountPrice: 29999, image: { url: '/images/stub.png', alt: 'Планшет' } },
  { id: 5, category: 'electronics', title: 'Наушники', price: 4999, discountPrice: null, image: { url: '/images/stub.png', alt: 'Наушники' } },
  { id: 6, category: 'electronics', title: 'Камера', price: 15999, discountPrice: null, image: { url: '/images/stub.png', alt: 'Камера' } },
  { id: 7, category: 'electronics', title: 'Монитор', price: 22999, discountPrice: 19999, image: { url: '/images/stub.png', alt: 'Монитор' } },
  { id: 8, category: 'electronics', title: 'Клавиатура', price: 3999, discountPrice: 2999, image: { url: '/images/stub.png', alt: 'Клавиатура' } },
  { id: 9, category: 'electronics', title: 'Мышь', price: 2499, discountPrice: 1999, image: { url: '/images/stub.png', alt: 'Мышь' } },
  { id: 10, category: 'electronics', title: 'Принтер', price: 8999, discountPrice: null, image: { url: '/images/stub.png', alt: 'Принтер' } },
  // clothes
  { id: 11, category: 'clothes', title: 'Футболка', price: 1599, discountPrice: 1299, image: { url: '/images/stub.png', alt: 'Футболка' } },
  { id: 12, category: 'clothes', title: 'Худи', price: 2999, discountPrice: null, image: { url: '/images/stub.png', alt: 'Худи' } },
  // accessories
  { id: 13, category: 'accessories', title: 'Кепка', price: 999, discountPrice: null, image: { url: '/images/stub.png', alt: 'Кепка' } },
  { id: 14, category: 'accessories', title: 'Рюкзак', price: 2799, discountPrice: 2499, image: { url: '/images/stub.png', alt: 'Рюкзак' } },
  // home
  { id: 15, category: 'home', title: 'Настольная лампа', price: 1599, discountPrice: null, image: { url: '/images/stub.png', alt: 'Настольная лампа' } },
  { id: 16, category: 'home', title: 'Подушка', price: 899, discountPrice: null, image: { url: '/images/stub.png', alt: 'Подушка' } },
]

export const byCategory = (key: CategoryKey) => PRODUCTS.filter((p) => p.category === key)
