const headerCityButton = document.querySelector('.header__city-button');

headerCityButton.textContent = localStorage.getItem('lamoda-location') || 'What is your city?'

headerCityButton.addEventListener('click', () => {
  const city = prompt('What is your city');
  headerCityButton.textContent = city;
  localStorage.setItem('lamoda-location', city);
})