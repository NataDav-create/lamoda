const headerCityButton = document.querySelector(".header__city-button"),
  subheaderCart = document.querySelector(".subheader__cart"),
  cartOverlay = document.querySelector(".cart-overlay"),
  goodsTitle = document.querySelector(".goods__title"),
  navigationItems = document.querySelectorAll(".navigation__item");

let hash = location.hash.substring(1);

headerCityButton.textContent =
  localStorage.getItem("lamoda-location") || "What is your city?";

const getLocalStorage = () =>
  JSON?.parse(localStorage.getItem("cart-lamoda")) || [];

const setLocalStorage = (data) =>
  localStorage.setItem("cart-lamoda", JSON.stringify(data));

const disableScroll = () => {
  const widthScroll = window.innerWidth - document.body.offsetWidth;

  document.body.dbScrollY = window.scrollY;

  document.body.style.cssText = `
        position: fixed;
        top: ${-window.scrollY}px;
        left: 0;
        width: 100%;
        overflow: hidden;
        height: 100vh;
        padding-right: ${widthScroll}px;
    `;
};

const enableScroll = () => {
  document.body.style.cssText = "position: relative;";
  window.scroll({
    top: document.body.dbScrollY,
  });
};

headerCityButton.addEventListener("click", () => {
  const city = prompt("What is your city");
  headerCityButton.textContent = city;
  localStorage.setItem("lamoda-location", city);
});

const openCart = () => {
  cartOverlay.classList.add("cart-overlay-open");
  disableScroll();
};

closeCart = (e) => {
  let target = e.target;
  if (target.closest(".cart__btn-close") || !target.closest(".cart")) {
    cartOverlay.classList.remove("cart-overlay-open");
    enableScroll();
  }
};

subheaderCart.addEventListener("click", openCart);
cartOverlay.addEventListener("click", closeCart);

const getData = async () => {
  const data = await fetch("db.json");
  if (data.ok) {
    return data.json();
  } else {
    throw new Error(
      `Data was not received, error is ${data.status} ${data.statusText}`
    );
  }
};

const getGoods = (callback, prop, value) => {
  getData()
    .then((data) => {
      if (value) {
        callback(data.filter((item) => item[prop] === value));
      } else {
        callback(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

getGoods((data) => {
  console.log(data);
});

try {
  const goodsList = document.querySelector(".goods__list");
  if (!goodsList) {
    throw "This is not a goods page!";
  }

  const changeTitle = () => {
    goodsTitle.textContent = document.querySelector(
      `[href*="#${hash}"]`
    ).textContent;
  };

  const createCard = ({ id, preview, name, cost, brand, sizes }) => {
    let li = document.createElement("li");
    li.classList.add("goods__item");
    li.innerHTML = `<article class="good">
                      <a class="good__link-img" href="card-good.html#${id}">
                        <img class="good__img" src="goods-image/${preview}" alt="${name}">
                      </a>
                        <div class="good__description">
                          <p class="good__price">${cost} &#8381;</p>
                            <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
                              ${
                                sizes
                                  ? `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(
                                      " "
                                    )}</span>
                          </p>`
                                  : ""
                              }
                              <a class="good__link" href="card-good.html#${id}">Подробнее</a>
                          </div>
                      </article>
    
    `;
    return li;
  };

  const renderGoodsList = (data) => {
    goodsList.textContent = "";

    for (const item of data) {
      const card = createCard(item);
      goodsList.append(card);
    }
  };

  window.addEventListener("hashchange", () => {
    hash = location.hash.substring(1);
    getGoods(renderGoodsList, "category", hash);
    changeTitle();
  });
  changeTitle();
  getGoods(renderGoodsList, "category", hash);
} catch (err) {
  console.log(err);
}

try {
  let cardGood = document.querySelector(".card-good");
  if (!cardGood) {
    throw "This is not a card-good page";
  }

  const cardGoodImage = document.querySelector(".card-good__image"),
    cardGoodBrand = document.querySelector(".card-good__brand"),
    cardGoodTitle = document.querySelector(".card-good__title"),
    cardGoodprice = document.querySelector(".card-good__price"),
    cardGoodColor = document.querySelector(".card-good__color"),
    cardGoodSelectWrapper = document.querySelectorAll(
      ".card-good__select__wrapper"
    ),
    cardGoodColorList = document.querySelector(".card-good__color-list"),
    cardGoodSizes = document.querySelector(".card-good__sizes"),
    cardGoodSizesList = document.querySelector(".card-good__sizes-list"),
    cardGoodBuy = document.querySelector(".card-good__buy");

  const generateList = (data) =>
    data.reduce((html, item, i) => {
      return (
        html + `<li class="card-good__select-item" data-id="${i}">${item}</li>`
      );
    }, "");

  const renderCardGood = ([{ id, brand, name, cost, color, sizes, photo }]) => {
    const data = { brand, name, cost, id };

    cardGoodImage.src = `goods-image/${photo}`;
    cardGoodImage.alt = `${brand} ${name}`;
    cardGoodBrand.textContent = brand;
    cardGoodTitle.textContent = name;
    cardGoodprice.textContent = `${cost} ₽`;
    if (color) {
      cardGoodColor.textContent = color[0];
      cardGoodColor.dataset.id = 0;
      cardGoodColorList.innerHTML = generateList(color);
    } else {
      cardGoodColor.style.display = "none";
    }
    if (sizes) {
      cardGoodSizes.textContent = sizes[0];
      cardGoodSizes.dataset.id = 0;
      cardGoodSizesList.innerHTML = generateList(sizes);
    } else {
      cardGoodSizes.style.display = "none";
    }
  };

  cardGoodSelectWrapper.forEach((item) => {
    item.addEventListener("click", (e) => {
      const target = e.target;

      if (target.closest(".card-good__select")) {
        target.classList.toggle("card-good__select__open");
      }
      if (target.closest(".card-good__select-item")) {
        const cardGoodSelect = item.querySelector(".card-good__select");
        cardGoodSelect.textContent = target.textContent;
        cardGoodSelect.dataset.id = target.dataset.id;
        cardGoodSelect.classList.remove("card-good__select__open");
      }
    });
  });

  getGoods(renderCardGood, "id", hash);
} catch (err) {
  console.warn(err);
}
