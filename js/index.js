
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCountElement = document.querySelector('.cart h2');
    const totalAmountElement = document.getElementById('total-amount');
    let cartItems = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.card-product');
            const name = productCard.querySelector('h2').textContent;
            const price = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
            const image = productCard.querySelector('.product-image').src;
            const quantityInput = productCard.querySelector('.quantity-input');
            const quantity = parseInt(quantityInput.value);

            const existingItem = cartItems.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.totalPrice = existingItem.quantity * existingItem.price;
            } else {
                cartItems.push({
                    name: name,
                    price: price,
                    image: image,
                    quantity: quantity,
                    totalPrice: quantity * price
                });
            }
            updateCart();
        });
    });

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cartItems.forEach(item => {
            total += item.totalPrice;
            const cartItem = document.createElement('li');
            cartItem.classList.add('cart-item');

            const imgElement = document.createElement('img');
            imgElement.src = item.image;
            imgElement.alt = item.name;

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
        });

        totalAmountElement.textContent = total.toFixed(2);
        cartCountElement.textContent = `Your Cart (${cartItems.length})`;
    }

    function removeItem(name) {
        cartItems = cartItems.filter(item => item.name !== name);
        updateCart();
    }

    // Lógica para manejar el incremento y decremento de la cantidad
    const quantityButtons = document.querySelectorAll('.quantity-decrease, .quantity-increase');
    quantityButtons.forEach(button => {
        button.addEventListener('click', () => {
            const quantityInput = button.closest('.card-product').querySelector('.quantity-input');
            let currentQuantity = parseInt(quantityInput.value);
            if (button.classList.contains('quantity-decrease') && currentQuantity > 1) {
                quantityInput.value = currentQuantity - 1;
            } else if (button.classList.contains('quantity-increase')) {
                quantityInput.value = currentQuantity + 1;
            }
        });
    });
});
