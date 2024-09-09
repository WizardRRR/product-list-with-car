export function renderCardProduct(product, mode, countOrdersDesserts) {
  const countCar = countOrdersDesserts[product.name];
  return `
  <div class="card-product" id="${product.name}">
      <div class="container-image">
        <img
          src="${product.image[mode]}"
          alt="${product.name}"
          width="150px"
          height="150px"
        />

        <div class="counter-product" style="display: ${
          countCar >= 1 ? "flex" : "none"
        }">
            <button data-name="${product.name}" class="btn-decrease-car">
              <img
                style="pointer-events:none"
                src="./assets/images/icon-decrement-quantity.svg"
                alt="aumentar uno mas al carrito"
              />
            </button>
            <span data-name="${product.name}" >${countCar}</span>
            <button class="btn-add-car" data-name="${product.name}" >
              <img
                  style="pointer-events:none"
                  src="./assets/images/icon-increment-quantity.svg"
                  alt="disminuir en uno al carrito"
                  />
                  </button>
                  </div>
                  <button class="btn-add-product" id="btn-add-product-${
                    product.name
                  }" 
                  style="display:${countCar == 0 ? "flex" : "none"};" 
                  data-name="${product.name}">
            <img
               style="pointer-events:none"
               src="./assets/images/icon-add-to-cart.svg"
               alt="añadir al carrito"
               width="25px"
               height="25px"
             />
             Add to Cart
          </button>
      </div>
      <div class="card-metadata">
        <span>${product.category}</span>
        <h5>${product.name}</h5>
        <span>$${product.price}</span>
      </div>
    </div>`;
}

export const renderShoppingCartEmpty = () => {
  return `
    <div id="shopping-cart">
        <h3>Your Cart <span id="shopping-cart-quantity">(0)</span></h3>
        <img src="./assets/images/illustration-empty-cart.svg" alt="" />
        <p>Your cart is empty</p>
        <div class="shopping-cart-dessert">
        </div>
        <div style="display:none" class="car-order-total">
          <p>Order Total</p>
          <span id="car-total-price">$0</span>
        </div>
        <div style="display:none" class="car-carbon-neutral">
          <img
            src="./assets/images/icon-carbon-neutral.svg"
            alt="carbon neutral"
          />
          <p>This is a <span>carbon-neutral</span> delivery</p>
        </div>
        <button style="display:none" class="car-confirm-order">Confirm Order</button>
      </div>
  `;
};

export const renderCarItem = ({ title, priceBase, count }) => {
  const priceTotal = priceBase * count;
  return `
        <div id="cart-product-dessert-${title}" class="card-item-dessert">
          <div class="card-item-dessert-data">
            <p>${title}</p>
            <p>
              <span class="count-total-dessert">${count}x</span
              ><span class="price-dessert">@${priceBase}</span
              ><span class="price-total-dessert">$${priceTotal}</span>
            </p>
          </div>
          <div class="card-item-dessert-delete">
            <button data-name="${title}" class="card-item-dessert-delete-btn">
              <img style="pointer-events:none" src="./assets/images/icon-remove-item.svg" alt="remove" />
            </button>
          </div>
        </div>
  `;
};
