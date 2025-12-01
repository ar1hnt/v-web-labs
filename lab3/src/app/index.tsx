import { Home } from '../pages/home'
import { Cart } from '../pages/cart'
import { Layout } from '../layouts/app'
import { useAppStore } from '../shared/store'

export const App = () => {
  const mode = useAppStore((s) => s.mode)
  return <Layout>{mode === 'cart' ? <Cart /> : <Home />}</Layout>
}
