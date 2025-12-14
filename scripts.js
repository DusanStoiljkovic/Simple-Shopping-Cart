const products = [
    { name: "Potato", price: 2.99, image: "img/potato.png" },
    { name: "Tomato", price: 3.49, image: "img/tomato.png" },
    { name: "Carrot", price: 1.99, image: "img/carrot.png" }
];

let cart = JSON.parse(localStorage.getItem('cart'));
console.log(cart);

if(!cart || cart.length === 0 || cart.some(item => item === null)) {
    cart = [
        { name: "Potato", price: 2.99, quantity: 0, image: "img/potato.png" },
        { name: "Tomato", price: 3.49, quantity: 0, image: "img/tomato.png" },
        { name: "Carrot", price: 1.99, quantity: 0, image: "img/carrot.png" }
    ]

    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {

    const itemContainer = document.querySelector('.items');
    const cartItemsDiv = document.querySelector('.cart-items'); 
    const totalDiv = document.querySelector('.total');

    itemContainer.innerHTML = '';
    cartItemsDiv.innerHTML = '';
    totalDiv.innerHTML = '';

    let cartHtml = '<ol>';
    let total = 0;

    products.forEach(product => {

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        let itemText = `
            <div class="item-picture">
                <img src="${product.image}" alt="${product.name}" />
            </div>
            <div class="item-description">
                <div class="item-name">${product.name}</div>
                <div class="item-price">$${product.price.toFixed(2)}</div>
            </div>
            <div class="add">
                <input type="number" min="1" value="1" class="form-control quantity-input" />
                <button class="btn btn-warning">Add to Cart</button>
            </div>`;

        itemContainer.appendChild(itemDiv);
        itemDiv.innerHTML = itemText;

        const btn = itemDiv.querySelector('button');
        const qtyInput = itemDiv.querySelector('input');
        btn.addEventListener('click', () => {
            const quantity = qtyInput.value;
            add(product.name, quantity);
        });

    });
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        if(item.quantity === 0) return;
        cartHtml += `<li>
        <b>${item.name}</b>  $${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}
        <button class="btn btn-danger btn-sm" onclick="remove('${item.name}')">Remove</button></li>`;
    });

    cartHtml += '</ol>';
    cartItemsDiv.innerHTML = cartHtml;

    totalDiv.innerText = `Total: $${total.toFixed(2)}`;
}

function remove(itemName) {
    cart = cart.map(item => {
        if(item.name === itemName) {
           return { ...item, quantity: 0 };
        }
        return item;
    })
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function add(itemName, quantity) {
    cart = cart.map(item => {
        if(item.name === itemName) {
            item.quantity += parseInt(quantity);
        }
        return item;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

renderCart();
