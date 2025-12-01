type Props = { inCart: boolean; onClick: () => void }

export const AddToCartButton = ({ inCart, onClick }: Props) => (
  <button className="add-to-cart" data-in-cart={inCart ? 'true' : undefined} onClick={onClick}>
    {inCart ? 'Удалить из корзины' : 'В корзину'}
  </button>
)
