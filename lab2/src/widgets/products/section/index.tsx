import type { ReactNode } from 'react'

type Props = { title: string; children: ReactNode }

export const Section = ({ title, children }: Props) => {
  return (
    <section>
      <h2 className="category-title">{title}</h2>
      <div className="products-grid">{children}</div>
    </section>
  )
}
