import { getDesserts } from "./fetch.js";
import { renderCardProduct } from "./renders.js";
import { Yourcard } from "./yourcard.js";

Yourcard();

const d = document;
const desserts = await getDesserts();

let mode = "mobile";
const cardProductWrapper = $("#card-product-container");

const countOrdersDesserts = Object.assign(
  {},
  ...desserts.map((dessert) => ({ [dessert.name]: 0 }))
);

renderMenuDesserts(mode);
addEventsUI();

window.addEventListener("resize", listenerResize);

function renderMenuDesserts(mode) {
  cardProductWrapper.innerHTML = desserts
    .map((dessert) => renderCardProduct(dessert, mode, countOrdersDesserts))
    .join("");
}

function handleClickAddToCart(event) {
  const { name } = event.target.dataset;
  countOrdersDesserts[name] += 1;
  const containerDessert = d.getElementById(name);
  const btnAddToCart = containerDessert.querySelector(".btn-add-product");
  const btnCounterProduct = containerDessert.querySelector(".counter-product");

  btnAddToCart.style.display = "none";
  btnCounterProduct.style.display = "flex";
  btnCounterProduct.querySelector("span").innerHTML = countOrdersDesserts[name];

  const dessert = desserts.find(d => d.name === name);
  if (dessert) {
    window.addToCart(dessert);
  }

  //los botones de los productos
  window.synchronizeProductButtons();
}

function decrementCounterDessert(name) {
  if (countOrdersDesserts[name] === 0) return;
  countOrdersDesserts[name] -= 1;

  const containerDessert = d.getElementById(name);
  const btnAddToCart = containerDessert.querySelector(".btn-add-product");
  const btnCounterProduct = containerDessert.querySelector(".counter-product");

  if (countOrdersDesserts[name] === 0) {
    btnCounterProduct.style.display = "none";
    btnAddToCart.style.display = "flex";
  } else {
    btnCounterProduct.querySelector("span").innerHTML = countOrdersDesserts[name];
  }

  const dessert = desserts.find(d => d.name === name);
  if (dessert) {
    window.addToCart(dessert);
  }


  // los botones de los productos
  window.synchronizeProductButtons();
}

function incrementCounterDessert(name) {
  countOrdersDesserts[name] += 1;

  const dessert = desserts.find(d => d.name === name);
  if (dessert) {
    window.addToCart(dessert);
  }

  const containerDessert = d.getElementById(name);
  const btnCounterProduct = containerDessert.querySelector(".counter-product");
  btnCounterProduct.querySelector("span").innerHTML = countOrdersDesserts[name];

  // botones de los productos
  window.synchronizeProductButtons();
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
  $$(".btn-add-product").forEach((btn) => {
    btn.addEventListener("click", handleClickAddToCart);
  });

  $$(".counter-product").forEach((counterProductContainer) => {
    const btnAdd = $(".btn-add-car", counterProductContainer);
    const btnDecrease = $(".btn-decrease-car", counterProductContainer);
    const counter = $("span", counterProductContainer);

    btnAdd.addEventListener("click", (event) => {
      const { name } = event.target.dataset;
      incrementCounterDessert(name);
      counter.innerHTML = countOrdersDesserts[name];
    });

    btnDecrease.addEventListener("click", (event) => {
      const { name } = event.target.dataset;
      decrementCounterDessert(name);
      counter.innerHTML = countOrdersDesserts[name];
    });
  });
}
