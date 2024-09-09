import { getDesserts } from "./fetch.js";
import {
  renderCardProduct,
  renderCarItem,
  renderShoppingCartEmpty,
} from "./renders.js";

const d = document;
const desserts = await getDesserts();

let mode = "mobile";
let priceTotal = 0;

const cardProductWrapper = $("#card-product-container");

const countOrdersDesserts = Object.assign(
  {},
  ...desserts.map((dessert) => ({ [dessert.name]: 0 }))
);

const calculateDessertTotal = () => {
  const valuesCount = Object.values(countOrdersDesserts);
  let sumTotal = 0;
  valuesCount.forEach((count) => (sumTotal += count));
  return sumTotal;
};

renderMenuDesserts(mode);
const main = $(".main");
main.innerHTML += renderShoppingCartEmpty();

addEventsUI();
// añadiendo evento de resize
window.addEventListener("resize", listenerResize);

function renderMenuDesserts(mode) {
  cardProductWrapper.innerHTML = desserts
    .map((dessert) => renderCardProduct(dessert, mode, countOrdersDesserts))
    .join("");
}

function handleClickAddToCart(event) {
  const { name } = event.target.dataset;
  countOrdersDesserts[name] += 1;
  const dessertData = desserts.find((dessert) => dessert.name === name);
  const shoppingCart = $("#shopping-cart");
  const shoppingCartDessert = $(".shopping-cart-dessert");
  priceTotal += dessertData.price;
  shoppingCartDessert.innerHTML += renderCarItem({
    count: 1,
    priceBase: dessertData.price,
    title: dessertData.name,
  });
  $$(".card-item-dessert-delete-btn").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const { name } = event.target.dataset;
      const dessertData = desserts.find((dessert) => dessert.name === name);
      priceTotal -= countOrdersDesserts[name] * dessertData.price;
      countOrdersDesserts[name] = 0;
      // actualizar la UI
      const carProductDessert = d.getElementById(
        `cart-product-dessert-${name}`
      );
      carProductDessert.remove();
      const carTotalPrice = $("#car-total-price");
      carTotalPrice.innerHTML = priceTotal;
      const shoppingCartQuantity = $("#shopping-cart-quantity");
      shoppingCartQuantity.innerHTML = `(${calculateDessertTotal()})`;
      const containerDessert = d.getElementById(name);
      const imgDessert = containerDessert.querySelector(".container-image img");
      imgDessert.style = "";
      $(".counter-product", containerDessert).style = "display:none;";
      $(".btn-add-product", containerDessert).style = "display:flex;";
    });
  });

  const carTotalPrice = $("#car-total-price");
  carTotalPrice.innerHTML = priceTotal;
  const shoppingCartQuantity = $("#shopping-cart-quantity");
  shoppingCartQuantity.innerHTML = `(${calculateDessertTotal()})`;

  const imageEmpty = $("img", shoppingCart);
  const messageEmpty = $("p", shoppingCart);
  const btnSubmit = $(".car-confirm-order", shoppingCart);
  const carCarbonNeutral = $(".car-carbon-neutral", shoppingCart);
  const carOrderTotal = $(".car-order-total", shoppingCart);
  imageEmpty.style = "display:none";
  messageEmpty.style = "display:none";
  btnSubmit.style = "display:flex";
  carCarbonNeutral.style = "display:flex";
  carOrderTotal.style = "display:flex";

  const containerDessert = d.getElementById(name);
  const imgDessert = containerDessert.querySelector(".container-image img");
  imgDessert.style = "border: 3px solid var(--red);";
  const btnAddToCart = containerDessert.querySelector(".btn-add-product");
  btnAddToCart.style = "display:none";
  const btnCounterProduct = containerDessert.querySelector(".counter-product");
  btnCounterProduct.style = "display:flex";
  btnCounterProduct.querySelector("span").innerHTML = countOrdersDesserts[name];
}

function decrementCounterDessert(name) {
  if (countOrdersDesserts[name] === 0) return;
  countOrdersDesserts[name] -= 1;
}

function incrementCounterDessert(name) {
  countOrdersDesserts[name] += 1;
}

function listenerResize(event) {
  const { innerWidth } = event.target;
  if (innerWidth > 425 && innerWidth < 768) {
    if (mode !== "tablet") {
      mode = "tablet";
      renderMenuDesserts(mode);
      addEventsUI();
    }
  } else if (innerWidth > 768) {
    if (mode !== "desktop") {
      mode = "desktop";
      renderMenuDesserts(mode);
      addEventsUI();
    }
  } else {
    if (mode !== "mobile") {
      mode = "mobile";
      renderMenuDesserts(mode);
      addEventsUI();
    }
  }
}

function addEventsUI() {
  // añadiendo eventos para el botón de añadir postres
  $$(".btn-add-product").forEach((btn) => {
    btn.addEventListener("click", handleClickAddToCart);
  });

  // añadiendo evento para los botones de incremento y decremento
  $$(".counter-product").forEach((counterProductContainer) => {
    const btnAdd = $(".btn-add-car", counterProductContainer);
    const btnDecrease = $(".btn-decrease-car", counterProductContainer);
    const counter = $("span", counterProductContainer);

    // maneja el evento de añadir
    btnAdd.addEventListener("click", (event) => {
      const { name } = event.target.dataset;
      incrementCounterDessert(name);
      counter.innerHTML = countOrdersDesserts[name];
      const priceDessert = desserts.find(
        (dessert) => dessert.name === name
      ).price;
      priceTotal += priceDessert;
      const carTotalPrice = $("#car-total-price");
      carTotalPrice.innerHTML = priceTotal;
      const shoppingCartQuantity = $("#shopping-cart-quantity");
      shoppingCartQuantity.innerHTML = `(${calculateDessertTotal()})`;
      const carProductDessert = d.getElementById(
        `cart-product-dessert-${name}`
      );

      $(
        ".count-total-dessert",
        carProductDessert
      ).innerHTML = `${countOrdersDesserts[name]}X`;
      $(".price-total-dessert", carProductDessert).innerHTML = `$${
        countOrdersDesserts[name] * priceDessert
      }`;
    });

    // maneja el evento de disminuir
    btnDecrease.addEventListener("click", (event) => {
      const { name } = event.target.dataset;
      decrementCounterDessert(name);
      counter.innerHTML = countOrdersDesserts[name];
      const priceDessert = desserts.find(
        (dessert) => dessert.name === name
      ).price;
      priceTotal -= priceDessert;
      const carTotalPrice = $("#car-total-price");
      carTotalPrice.innerHTML = priceTotal;
      const shoppingCartQuantity = $("#shopping-cart-quantity");
      shoppingCartQuantity.innerHTML = `(${calculateDessertTotal()})`;
      const carProductDessert = d.getElementById(
        `cart-product-dessert-${name}`
      );
      $(
        ".count-total-dessert",
        carProductDessert
      ).innerHTML = `${countOrdersDesserts[name]}X`;
      $(".price-total-dessert", carProductDessert).innerHTML = `$${
        countOrdersDesserts[name] * priceDessert
      }`;

      if (countOrdersDesserts[name] == 0) {
        const containerDessert = d.getElementById(name);
        const imgDessert = containerDessert.querySelector(
          ".container-image img"
        );
        imgDessert.style = "";
        $(".counter-product", containerDessert).style = "display:none;";
        $(".btn-add-product", containerDessert).style = "display:flex;";

        const carProductDessert = d.getElementById(
          `cart-product-dessert-${name}`
        );
        carProductDessert.remove();
      }
    });
  });
}
