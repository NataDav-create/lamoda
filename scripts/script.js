const headerCityButton = document.querySelector('.header__city-button'),
  subheaderCart = document.querySelector('.subheader__cart'),
  cartOverlay = document.querySelector('.cart-overlay');

headerCityButton.textContent = localStorage.getItem('lamoda-location') || 'What is your city?';

const disableScroll = () => {

  const widthScroll = window.innerWidth - document.body.offsetWidth;

  document.body.dbScrollY = window.scrollY

  document.body.style.cssText = `
        position: fixed;
        top: ${-window.scrollY}px;
        left: 0;
        width: 100%;
        overflow: hidden;
        height: 100vh;
        padding-right: ${widthScroll}px;
    `;
}

const enableScroll = () => {
  document.body.style.cssText = 'position: relative;';
  window.scroll({
    top: document.body.dbScrollY
  })
}

headerCityButton.addEventListener('click', () => {
  const city = prompt('What is your city');
  headerCityButton.textContent = city;
  localStorage.setItem('lamoda-location', city);
});

const openCart = () => {
  cartOverlay.classList.add('cart-overlay-open');
  disableScroll()
}

closeCart = (e) => {
  let target = e.target;
  if (target.closest('.cart__btn-close') || !target.closest('.cart')) {
    cartOverlay.classList.remove('cart-overlay-open');
    enableScroll()
  }
}

subheaderCart.addEventListener('click', openCart);
cartOverlay.addEventListener('click', closeCart);