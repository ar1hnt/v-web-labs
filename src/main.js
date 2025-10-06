const productsData = Array.from(document.querySelectorAll('.product')).map(p => ({
  id: Number(p.dataset.id),
  name: p.dataset.name,
  price: Number(p.dataset.price),
  oldPrice: p.dataset.oldPrice ? Number(p.dataset.oldPrice) : null,
  category: p.dataset.category
}));

const load = (key, fallback) => { 
    try { 
        return JSON.parse(localStorage.getItem(key)) ?? fallback; 
    } catch { 
        return fallback; 
    } 
};

let favorites = load('favorites', []);

let cart = load('cart', []);

const save = (k,v)=>localStorage.setItem(k, JSON.stringify(v));

const productsContainer = document.getElementById('products');
const searchInput = document.getElementById('search');
const favoritesBtn = document.getElementById('favoritesBtn');
const cartBtn = document.getElementById('cartBtn');
const favoritesCountEl = document.getElementById('favoritesCount');
const cartCountEl = document.getElementById('cartCount');
const mHome = document.getElementById('mHome');
const mFav = document.getElementById('mFav');
const mCart = document.getElementById('mCart');
const mFavCount = document.getElementById('mFavCount');
const mCartCount = document.getElementById('mCartCount');
const homeHeaderBtn = document.querySelector('.home-btn') || document.querySelector('.icon-btn[aria-label="Главная"]');

const productCards = Array.from(document.querySelectorAll('.product'));
const emptyMessage = document.getElementById('emptyMessage');
const categoryGrids = Array.from(document.querySelectorAll('.products-grid'));

const state = reactive({
  favorites: favorites,
  cart: cart,
  showOnlyFavorites: false,
  showCart: false,
  search: ''
});

function reactive(obj){
  return new Proxy(obj, {
    set(target, prop, value){
      target[prop] = value;
      if(prop === 'favorites') save('favorites', value);
      if(prop === 'cart') save('cart', value);
      renderState();
      return true;
    }
  });
}

function applyVisibility(){
  const q = state.search.trim().toLowerCase();
  let visibleCount = 0;
  productCards.forEach(card => {
    const id = Number(card.dataset.id);
    const name = (card.dataset.name || '').toLowerCase();
    let visible = true;
    if(q && !name.includes(q)) visible = false;
    if(state.showOnlyFavorites && !state.favorites.includes(id)) visible = false;
    if(state.showCart && !state.cart.includes(id)) visible = false;
    card.hidden = !visible;
    if(visible) visibleCount++;

    const favBtn = card.querySelector('.fav-btn');
    if(favBtn){
      if(state.favorites.includes(id)) favBtn.setAttribute('data-fav','true'); else favBtn.removeAttribute('data-fav');
    }
    const cartBtnEl = card.querySelector('.add-to-cart');
    if(cartBtnEl){
      const inCart = state.cart.includes(id);
      cartBtnEl.dataset.inCart = inCart ? 'true' : 'false';
      cartBtnEl.textContent = inCart ? 'Удалить из корзины' : 'В корзину';
    }
  });

  categoryGrids.forEach(grid => {
    const products = Array.from(grid.querySelectorAll('.product'));
    const anyVisible = products.some(p => !p.hidden);
    grid.hidden = !anyVisible;
    const heading = grid.previousElementSibling;
    if(heading && heading.classList.contains('category-title')){
      heading.hidden = !anyVisible;
    }
  });

  if(emptyMessage){
    emptyMessage.hidden = visibleCount !== 0;
  }
}

function updateCounters(){
  favoritesCountEl.textContent = state.favorites.length;
  cartCountEl.textContent = state.cart.length;
  if(mFavCount) mFavCount.textContent = state.favorites.length;
  if(mCartCount) mCartCount.textContent = state.cart.length;
}

function updateActiveStates(){
  const isBase = !state.showOnlyFavorites && !state.showCart && !state.search.trim();
  if(homeHeaderBtn){ homeHeaderBtn.classList.toggle('home-active', isBase); }
  if(mHome){ mHome.classList.toggle('active', isBase); }
  if(mFav){ mFav.classList.toggle('active', state.showOnlyFavorites); }
  if(mCart){ mCart.classList.toggle('active', state.showCart); }
  favoritesBtn.classList.toggle('active-mode', state.showOnlyFavorites);
  cartBtn.classList.toggle('active-mode', state.showCart);
}

function renderState(){
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

if(mFav){
  mFav.addEventListener('click', () => {
    state.showOnlyFavorites = !state.showOnlyFavorites;
    state.showCart = false;
  });
}
if(mCart){
  mCart.addEventListener('click', () => {
    state.showCart = !state.showCart;
    state.showOnlyFavorites = false;
  });
}
if(mHome){
  mHome.addEventListener('click', () => {
    state.showCart = false;
    state.showOnlyFavorites = false;
    searchInput.value='';
    state.search = '';
    window.scrollTo({ top:0, behavior:'smooth' });
  });
}

searchInput.addEventListener('input', () => {
  state.search = searchInput.value;
});

productsContainer.addEventListener('click', (e) => {
  const favBtn = e.target.closest('.fav-btn');
  if(favBtn){
    const id = Number(favBtn.closest('.product').dataset.id);
    state.favorites = state.favorites.includes(id) ? state.favorites.filter(i => i !== id) : [...state.favorites, id];
    return;
  }
  const cartBtnEl = e.target.closest('.add-to-cart');
  if(cartBtnEl){
    const id = Number(cartBtnEl.closest('.product').dataset.id);
    state.cart = state.cart.includes(id) ? state.cart.filter(i => i !== id) : [...state.cart, id];
  }
});

renderState();