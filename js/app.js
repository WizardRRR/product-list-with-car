import { getDesserts } from "./fetch.js";
import { renderCardProduct } from "./renders.js";

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
  console.log(countOrdersDesserts);
}

function incrementCounterDessert(name) {
  countOrdersDesserts[name] += 1;
  console.log(countOrdersDesserts);
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
    });

    // maneja el evento de disminuir
    btnDecrease.addEventListener("click", (event) => {
      const { name } = event.target.dataset;
      decrementCounterDessert(name);
      counter.innerHTML = countOrdersDesserts[name];
      if (countOrdersDesserts[name] == 0) {
        const containerDessert = d.getElementById(name);
        const imgDessert = containerDessert.querySelector(
          ".container-image img"
        );
        imgDessert.style = "";
        $(".counter-product", containerDessert).style = "display:none;";
        $(".btn-add-product", containerDessert).style = "display:flex;";
      }
    });
  });
}
