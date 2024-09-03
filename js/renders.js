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
          <button class="btn-add-product" id="btn-add-product-${product.name}" 
          style="display:${countCar == 0 ? "flex" : "none"};" 
          data-name="${product.name}">
             <img
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
