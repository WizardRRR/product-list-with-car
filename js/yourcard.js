export function Yourcard() {
    document.addEventListener('DOMContentLoaded', () => {
        const cart = document.createElement('div');
        cart.classList.add('cart');
        cart.innerHTML = `
            <h2>Your Cart (0)</h2>
            <ul class="cart-items"></ul>
            <img src="/assets/images/illustration-empty-cart.svg" alt="Empty cart" id="empty-cart-image">
            <div class="cart-total">
                <p>Total: $<span id="total-amount">0.00</span></p>
                <button class="confirm-order">Confirm Order</button>
            </div>
        `;

        const productWrapper = document.querySelector('#card-product-container');
        const container = document.createElement('div');
        container.classList.add('container');
        container.appendChild(cart);
        container.appendChild(productWrapper);
        document.body.appendChild(container);

        const cartItemsContainer = cart.querySelector('.cart-items');
        const cartCountElement = cart.querySelector('h2');
        const totalAmountElement = cart.querySelector('#total-amount');
        const emptyCartImage = cart.querySelector('#empty-cart-image');
        let cartItems = [];

        // Función para obtener la imagen según el tamaño 
        function getImageSrc(imageUrls) {
            const width = window.innerWidth;
            if (width < 768) {
                return imageUrls.mobile;
            } else if (width >= 768 && width < 1024) {
                return imageUrls.tablet;
            } else {
                return imageUrls.desktop;
            }
        }

        // Función para añadir productos 
        function addToCart(product) {
            const existingItem = cartItems.find(item => item.name === product.name);
            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.totalPrice = existingItem.quantity * existingItem.price;
            } else {
                cartItems.push({
                    name: product.name,
                    price: product.price,
                    image: getImageSrc(product.image),
                    quantity: 1,
                    totalPrice: product.price
                });
            }
            updateCart();
        }

        // Función para actualizar 
        function updateCart() {
            cartItemsContainer.innerHTML = '';
            let total = 0;

            cartItems = cartItems.filter(item => {
                if (item.quantity === 0) {
                    return false;
                }
                total += item.totalPrice;
                const cartItem = document.createElement('li');
                cartItem.classList.add('cart-item');

                const imgElement = document.createElement('img');
                imgElement.src = item.image;
                imgElement.alt = item.name;
                imgElement.classList.add('cart-item-image');

                const namePriceElement = document.createElement('span');
                namePriceElement.textContent = `${item.quantity} x ${item.name} - $${item.totalPrice.toFixed(2)}`;

                const removeButton = document.createElement('button');
                removeButton.textContent = 'X';
                removeButton.classList.add('remove-item');
                removeButton.addEventListener('click', () => {
                    removeItem(item.name);
                });

                cartItem.appendChild(imgElement);
                cartItem.appendChild(namePriceElement);
                cartItem.appendChild(removeButton);
                cartItemsContainer.appendChild(cartItem);
                return true;
            });

            totalAmountElement.textContent = total.toFixed(2);
            cartCountElement.textContent = `Your Cart (${cartItems.reduce((sum, item) => sum + item.quantity, 0)})`;
            emptyCartImage.style.display = cartItems.length > 0 ? 'none' : 'block';
        }

        // Función para eliminar 
        function removeItem(name) {
            const item = cartItems.find(item => item.name === name);
            if (item) {
                item.quantity -= 1;
                if (item.quantity === 0) {
                    cartItems = cartItems.filter(item => item.name !== name);
                } else {
                    item.totalPrice = item.quantity * item.price;
                }
                updateCart();
            }
        }

        // Actualizar las imagenes
        window.addEventListener('resize', () => {
            cartItems.forEach(item => {
                item.image = getImageSrc(item.image);
            });
            updateCart();
        });

        
        // Exportar las funciones 
        window.addToCart = addToCart;
        window.removeFromCartIfQuantityZero = (name) => {
            const item = cartItems.find(item => item.name === name);
            if (item && item.quantity === 0) {
                removeItem(name);
            }
        };
    });
}