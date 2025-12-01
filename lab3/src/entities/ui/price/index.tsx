const fmt = (v: number) => v.toLocaleString('ru-RU') + ' ₽'

type Props = { price: number; discountPrice: number | null }

export const Price = ({ price, discountPrice }: Props) => {
  if (discountPrice) {
    return (
      <>
        <span className="price">{fmt(discountPrice)}</span>
        <span className="old-price">{fmt(price)}</span>
      </>
    )
  }
  return <span className="price">{fmt(price)}</span>
}
