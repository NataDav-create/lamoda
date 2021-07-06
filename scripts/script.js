const headerCityButton = document.querySelector('.header__city-button'),
  subheaderCart = document.querySelector('.subheader__cart'),
  cartOverlay = document.querySelector('.cart-overlay');

headerCityButton.textContent = localStorage.getItem('lamoda-location') || 'What is your city?'

headerCityButton.addEventListener('click', () => {
  const city = prompt('What is your city');
  headerCityButton.textContent = city;
  localStorage.setItem('lamoda-location', city);
});

const openCart = () => {
  cartOverlay.classList.add('cart-overlay-open');
}

closeCart = (e) => {
  let target = e.target;
  if (target.closest('.cart__btn-close') || !target.closest('.cart')) {
    cartOverlay.classList.remove('cart-overlay-open');
  }
}

subheaderCart.addEventListener('click', openCart);
cartOverlay.addEventListener('click', closeCart);