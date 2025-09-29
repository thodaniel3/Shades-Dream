// main.js - Shared header/footer, cart badge, and localStorage cart logic

document.addEventListener('DOMContentLoaded', () => {
  // Hero section video + image slider
  const heroSlides = document.querySelectorAll('.carousel-bg .hero-slide');
  let heroCurrent = 0;
  function showHeroSlide(idx) {
    heroSlides.forEach((slide, i) => {
      slide.style.opacity = i === idx ? '1' : '0';
      slide.style.zIndex = i === idx ? '2' : '1';
    });
  }
  if (heroSlides.length) {
    showHeroSlide(heroCurrent);
    // Wait for video to play 17s, then start image slides every 6s
    setTimeout(() => {
      heroCurrent = 1;
      showHeroSlide(heroCurrent);
      setInterval(() => {
        heroCurrent = (heroCurrent + 1) % heroSlides.length;
        // Skip video after first play
        if (heroCurrent === 0) heroCurrent = 1;
        showHeroSlide(heroCurrent);
      }, 6000);
    }, 17000);
  }

  injectHeaderFooter();
  updateCartBadge();
});

function injectHeaderFooter() {
  const headerHTML = `
    <div class="container">
      <nav>
        <a href="index.html"><strong>Shades Dream</strong></a>
        <a href="products.html">Products</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
        <a href="cart.html" style="position:relative">
          Cart 🛒 <span class="cart-badge" id="cart-badge">0</span>
        </a>
      </nav>
    </div>
  `;
  const footerHTML = `
    <div class="container">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
        <div>
          <strong>Shades Dream</strong> &copy; 2025
        </div>
        <div>
          <a href="#" style="color:#fff;margin-right:1em;">Instagram</a>
          <a href="#" style="color:#fff;margin-right:1em;">Facebook</a>
          <a href="#" style="color:#fff;margin-right:1em;">Tiktok</a>
          <a href="#" style="color:#fff;margin-right:1em;">Youtube</a>
          <a href="#" style="color:#fff;">Linkedin</a>

        </div>
        <div>
          <span>Contact: info@shadesdream.com</span>
        </div>
      </div>
    </div>
  `;
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  if (header) header.innerHTML = headerHTML;
  if (footer) footer.innerHTML = footerHTML;
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const badge = document.getElementById('cart-badge');
  if (badge) {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.textContent = count;
  }
}

// Export for other scripts
window.getCart = getCart;
window.setCart = setCart;
window.updateCartBadge = updateCartBadge;
