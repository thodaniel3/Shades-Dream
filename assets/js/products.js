// products.js - Product rendering and add to cart logic

const PRODUCTS = [
  {
    id: 1,
    name: 'Hydra Glow Serum',
    desc: 'Deep hydration for radiant skin.',
    price: 29.99,
    image: 'assets/images/best.png',
    featured: true
  },
  {
    id: 2,
    name: 'Gentle Cleanser',
    desc: 'Mild, non-stripping daily cleanser.',
    price: 19.99,
    image: 'assets/images/1 (8).png',
    featured: true
  },
  {
    id: 3,
    name: 'SPF 50 Sunscreen',
    desc: 'Lightweight, non-greasy sun protection.',
    price: 24.99,
    image: 'assets/images/1 (5).png',
    featured: true
  },
  {
    id: 4,
    name: 'Night Repair Cream',
    desc: 'Nourishes and repairs overnight.',
    price: 34.99,
    image: 'assets/images/1 (4).png',
    featured: true
  },
  {
    id: 5,
    name: 'Vitamin C Booster',
    desc: 'Brightens and evens skin tone.',
    price: 27.99,
    image: 'assets/images/1 (3).png',
    featured: false
  },
  {
    id: 6,
    name: 'Soothing Toner',
    desc: 'Calms and balances skin.',
    price: 18.99,
    image: 'assets/images/1 (19).png',
    featured: false
  },
  // Add more products as needed
];

document.addEventListener('DOMContentLoaded', () => {
  // Featured products on homepage
  const featuredSection = document.getElementById('featured-products');
  if (featuredSection) {
    const grid = featuredSection.querySelector('.products-grid');
    const featured = PRODUCTS.filter(p => p.featured).slice(0, 6);
    grid.innerHTML = featured.map(productCardHTML).join('');
    addProductCardListeners(grid, featured);
  }
  // All products on products.html
  const allProductsSection = document.getElementById('all-products');
  if (allProductsSection) {
    const grid = allProductsSection.querySelector('.products-grid');
    grid.innerHTML = PRODUCTS.map(productCardHTML).join('');
    addProductCardListeners(grid, PRODUCTS);
  }
});

function productCardHTML(p) {
  return `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="price">$${p.price.toFixed(2)}</div>
      <button data-id="${p.id}">Add to Cart</button>
    </div>
  `;
}

function addProductCardListeners(grid, products) {
  grid.querySelectorAll('button[data-id]').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = parseInt(btn.getAttribute('data-id'));
      const product = products.find(p => p.id === id);
      if (!product) return;
      let cart = window.getCart();
      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });
      }
      window.setCart(cart);
      btn.textContent = 'Added!';
      setTimeout(() => { btn.textContent = 'Add to Cart'; }, 1000);
    });
  });
}
