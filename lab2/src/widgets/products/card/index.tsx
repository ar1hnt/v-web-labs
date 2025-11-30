import { useAppStore } from '../../../shared/store'
import { Image, Price, Title } from '../../../entities'
import { AddToCartButton } from '../../../features/products/add-to-cart/ui'
import { AddToWishlistButton } from '../../../features/products/add-to-wishlist/ui'
import type { Product } from '../../../entities/model/types'

type Props = { product: Product }

export const Card = ({ product }: Props) => {
  const favorites = useAppStore((s) => s.favorites)
  const cart = useAppStore((s) => s.cart)
  const toggleFavorite = useAppStore((s) => s.toggleFavorite)
  const toggleCart = useAppStore((s) => s.toggleCart)

  const inFav = favorites.includes(product.id)
  const inCart = cart.includes(product.id)

  return (
    <div className="product" data-id={product.id} data-category={product.category}>
      <div className="image-wrap">
        <Image url={product.image.url} alt={product.image.alt} />
        <AddToWishlistButton inWishlist={inFav} onClick={() => toggleFavorite(product.id)} />
      </div>
      <div className={`prices ${product.discountPrice ? 'has-discount' : ''}`}>
        {product.discountPrice ? (
          <img className="discount-icon" src="/images/pricetag.png" alt="Скидка" />
        ) : null}
        <Price price={product.price} discountPrice={product.discountPrice} />
      </div>
      <Title title={product.title} />
      <AddToCartButton inCart={inCart} onClick={() => toggleCart(product.id)} />
    </div>
  )
}
