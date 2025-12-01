type Props = { inWishlist: boolean; onClick: () => void }

export const AddToWishlistButton = ({ inWishlist, onClick }: Props) => (
  <button className="fav-btn" aria-label="Избранное" data-fav={inWishlist ? 'true' : undefined} onClick={onClick}>
    <img src="/images/favorite.png" alt="Избранное" />
  </button>
)
