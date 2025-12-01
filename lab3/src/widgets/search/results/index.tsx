import { useAppStore } from '../../../shared/store'
import { PRODUCTS } from '../../../entities/model/data'
import { AddToWishlistButton } from '../../../features/products/add-to-wishlist/ui'
import { AddToCartButton } from '../../../features/products/add-to-cart/ui'

export const SearchResults = () => {
	const q = useAppStore((s) => s.search)
	const favorites = useAppStore((s) => s.favorites)
	const cart = useAppStore((s) => s.cart)
	const toggleFavorite = useAppStore((s) => s.toggleFavorite)
	const toggleCart = useAppStore((s) => s.toggleCart)
	const query = q.trim().toLowerCase()
	const results = query
		? PRODUCTS.filter((p) => p.title.toLowerCase().includes(query)).slice(0, 12)
		: []
	if (!query || results.length === 0) return null
	return (
		<div className="search-results" role="listbox" aria-label="Результаты поиска">
			{results.map((p) => {
				const inFav = favorites.includes(p.id)
				const inCart = cart.includes(p.id)
				return (
					<div key={p.id} className="search-result-item" role="option" aria-selected={false}>
						<img src={p.image.url} alt={p.image.alt} className="thumb" />
						<span className="s-title">{p.title}</span>
						<AddToWishlistButton inWishlist={inFav} onClick={() => toggleFavorite(p.id)} />
						<AddToCartButton inCart={inCart} onClick={() => toggleCart(p.id)} />
					</div>
				)
			})}
		</div>
	)
}
