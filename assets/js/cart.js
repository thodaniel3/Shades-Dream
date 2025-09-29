// cart.js - Cart page logic

document.addEventListener('DOMContentLoaded', () => {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartSummaryDiv = document.getElementById('cart-summary');
  let cart = window.getCart();

  function renderCart() {
    cart = window.getCart();
    if (!cart.length) {
      cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
      cartSummaryDiv.innerHTML = '';
      return;
    }
    cartItemsDiv.innerHTML = cart.map(cartItemHTML).join('');
    cartItemsDiv.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = parseInt(btn.getAttribute('data-id'));
        const action = btn.getAttribute('data-action');
        updateQty(id, action);
      });
    });
    cartItemsDiv.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = parseInt(btn.getAttribute('data-id'));
        removeItem(id);
      });
    });
    renderSummary();
  }

  function cartItemHTML(item) {
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" style="width:150px;height:150px;object-fit:cover;border-radius:0.5rem; margin:5px">
        <div class="item-info">
          <div><strong>${item.name}</strong></div>
          <div>$${item.price.toFixed(2)}</div>
        </div>
        <div class="item-qty">
          <button class="qty-btn" data-id="${item.id}" data-action="decrease">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
        </div>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;
  }

  function updateQty(id, action) {
    let cart = window.getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;
    if (action === 'increase') item.qty += 1;
    if (action === 'decrease') item.qty = Math.max(1, item.qty - 1);
    window.setCart(cart);
    renderCart();
  }

  function removeItem(id) {
    let cart = window.getCart();
    cart = cart.filter(i => i.id !== id);
    window.setCart(cart);
    renderCart();
  }

  function renderSummary() {
    const cart = window.getCart();
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    cartSummaryDiv.innerHTML = `
      <div>Subtotal: <strong>$${subtotal.toFixed(2)}</strong></div>
      <a href="https://wa.me/2348107247625" target="_blank"><button class="checkout-btn">Checkout</button></a>
    `;
  }

  renderCart();
});
