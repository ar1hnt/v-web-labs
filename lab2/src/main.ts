type Nullable<T> = T | null;

interface ProductData {
  id: number;
  name: string;
  price: number;
  oldPrice: Nullable<number>;
  category: string;
}

interface AppState {
  favorites: number[];
  cart: number[];
  showOnlyFavorites: boolean;
  showCart: boolean;
  search: string;
}

function queryAll<K extends Element = Element>(selector: string, root: ParentNode = document): K[] {
  return Array.from(root.querySelectorAll(selector)) as K[];
}

function getById<K extends HTMLElement = HTMLElement>(id: string): K {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Element with id '${id}' not found`);
  return el as K;
}

const productsData: ProductData[] = queryAll<HTMLDivElement>('.product').map((p) => ({
  id: Number((p as HTMLDivElement).dataset.id),
  name: (p as HTMLDivElement).dataset.name ?? '',
  price: Number((p as HTMLDivElement).dataset.price),
  oldPrice: (p as HTMLDivElement).dataset.oldPrice
    ? Number((p as HTMLDivElement).dataset.oldPrice)
    : null,
  category: (p as HTMLDivElement).dataset.category ?? ''
}));

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return (raw ? (JSON.parse(raw) as T) : fallback) ?? fallback;
  } catch {
    return fallback;
  }
}

let favorites = load<number[]>('favorites', []);
let cart = load<number[]>('cart', []);

const save = (k: string, v: unknown) => localStorage.setItem(k, JSON.stringify(v));

const productsContainer = getById<HTMLDivElement>('products');
const searchInput = getById<HTMLInputElement>('search');
const favoritesBtn = getById<HTMLButtonElement>('favoritesBtn');
const cartBtn = getById<HTMLButtonElement>('cartBtn');
const favoritesCountEl = getById<HTMLSpanElement>('favoritesCount');
const cartCountEl = getById<HTMLSpanElement>('cartCount');
const mHome = document.getElementById('mHome') as HTMLButtonElement | null;
const mFav = document.getElementById('mFav') as HTMLButtonElement | null;
const mCart = document.getElementById('mCart') as HTMLButtonElement | null;
const mFavCount = document.getElementById('mFavCount') as HTMLSpanElement | null;
const mCartCount = document.getElementById('mCartCount') as HTMLSpanElement | null;
const homeHeaderBtn = (document.querySelector('.home-btn') || document.querySelector('.icon-btn[aria-label="Главная"]')) as HTMLButtonElement | null;

const productCards = queryAll<HTMLDivElement>('.product');
const emptyMessage = document.getElementById('emptyMessage') as HTMLElement | null;
const categoryGrids = queryAll<HTMLDivElement>('.products-grid');

function reactive(obj: AppState): AppState {
  return new Proxy(obj, {
    set(target, prop: keyof AppState, value: AppState[keyof AppState]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (target as any)[prop] = value;
      if (prop === 'favorites') save('favorites', value);
      if (prop === 'cart') save('cart', value);
      renderState();
      return true;
    }
  });
}

const state: AppState = reactive({
  favorites: favorites,
  cart: cart,
  showOnlyFavorites: false,
  showCart: false,
  search: ''
});

function applyVisibility(): void {
  const q = state.search.trim().toLowerCase();
  let visibleCount = 0;

  productCards.forEach((card) => {
    const id = Number(card.dataset.id);
    const name = (card.dataset.name || '').toLowerCase();
    let visible = true;
    if (q && !name.includes(q)) visible = false;
    if (state.showOnlyFavorites && !state.favorites.includes(id)) visible = false;
    if (state.showCart && !state.cart.includes(id)) visible = false;
    (card as HTMLElement).hidden = !visible;
    if (visible) visibleCount++;

    const favBtn = card.querySelector<HTMLButtonElement>('.fav-btn');
    if (favBtn) {
      if (state.favorites.includes(id)) favBtn.setAttribute('data-fav', 'true');
      else favBtn.removeAttribute('data-fav');
    }
    const cartBtnEl = card.querySelector<HTMLButtonElement>('.add-to-cart');
    if (cartBtnEl) {
      const inCart = state.cart.includes(id);
      cartBtnEl.dataset.inCart = inCart ? 'true' : 'false';
      cartBtnEl.textContent = inCart ? 'Удалить из корзины' : 'В корзину';
    }
  });

  categoryGrids.forEach((grid) => {
    const products = queryAll<HTMLDivElement>('.product', grid);
    const anyVisible = products.some((p) => !(p as HTMLElement).hidden);
    (grid as HTMLElement).hidden = !anyVisible;
    const heading = grid.previousElementSibling as HTMLElement | null;
    if (heading && heading.classList.contains('category-title')) {
      heading.hidden = !anyVisible;
    }
  });

  if (emptyMessage) {
    emptyMessage.hidden = visibleCount !== 0;
  }
}

function updateCounters(): void {
  favoritesCountEl.textContent = String(state.favorites.length);
  cartCountEl.textContent = String(state.cart.length);
  if (mFavCount) mFavCount.textContent = String(state.favorites.length);
  if (mCartCount) mCartCount.textContent = String(state.cart.length);
}

function updateActiveStates(): void {
  const isBase = !state.showOnlyFavorites && !state.showCart && !state.search.trim();
  if (homeHeaderBtn) {
    homeHeaderBtn.classList.toggle('home-active', isBase);
  }
  if (mHome) {
    mHome.classList.toggle('active', isBase);
  }
  if (mFav) {
    mFav.classList.toggle('active', state.showOnlyFavorites);
  }
  if (mCart) {
    mCart.classList.toggle('active', state.showCart);
  }
  favoritesBtn.classList.toggle('active-mode', state.showOnlyFavorites);
  cartBtn.classList.toggle('active-mode', state.showCart);
}

function renderState(): void {
  applyVisibility();
  updateCounters();
  updateActiveStates();
}

favoritesBtn.addEventListener('click', () => {
  state.showOnlyFavorites = !state.showOnlyFavorites;
  state.showCart = false;
});

cartBtn.addEventListener('click', () => {
  state.showCart = !state.showCart;
  state.showOnlyFavorites = false;
});

if (mFav) {
  mFav.addEventListener('click', () => {
    state.showOnlyFavorites = !state.showOnlyFavorites;
    state.showCart = false;
  });
}
if (mCart) {
  mCart.addEventListener('click', () => {
    state.showCart = !state.showCart;
    state.showOnlyFavorites = false;
  });
}
if (mHome) {
  mHome.addEventListener('click', () => {
    state.showCart = false;
    state.showOnlyFavorites = false;
    searchInput.value = '';
    state.search = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

searchInput.addEventListener('input', () => {
  state.search = searchInput.value;
});

productsContainer.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const favBtn = target.closest('.fav-btn') as HTMLButtonElement | null;
  if (favBtn) {
    const productEl = favBtn.closest('.product') as HTMLDivElement | null;
    const id = Number(productEl?.dataset.id ?? -1);
    state.favorites = state.favorites.includes(id)
      ? state.favorites.filter((i) => i !== id)
      : [...state.favorites, id];
    return;
  }
  const cartBtnEl = target.closest('.add-to-cart') as HTMLButtonElement | null;
  if (cartBtnEl) {
    const productEl = cartBtnEl.closest('.product') as HTMLDivElement | null;
    const id = Number(productEl?.dataset.id ?? -1);
    state.cart = state.cart.includes(id)
      ? state.cart.filter((i) => i !== id)
      : [...state.cart, id];
  }
});

renderState();
