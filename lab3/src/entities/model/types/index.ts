export type CategoryKey = 'electronics' | 'clothes' | 'accessories' | 'home'

export interface ProductImage {
  url: string
  alt: string
}

export interface Product {
  id: number
  category: CategoryKey
  title: string
  price: number
  discountPrice: number | null
  image: ProductImage
}

export const create = (
  id: number,
  category: CategoryKey,
  title: string,
  price: number,
  discountPrice: number | null,
  image: ProductImage,
): Product => ({
  id,
  category,
  title,
  price,
  discountPrice,
  image,
})
