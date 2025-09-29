// carousel.js - Image carousel logic for homepage

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('carousel');
  if (!carousel) return;
  // Use actual images from assets/images
  const images = [
    'assets/images/best.png',
    'assets/images/1 (8).png',
    'assets/images/1 (5).png',
    'assets/images/1 (4).png',
    'assets/images/1 (3).png',
  ];
  let current = 0;
  let interval;

  function render() {
    carousel.innerHTML = `
      <img src="${images[current]}" alt="Skincare Slide ${current+1}" loading="lazy">
      <div class="carousel-controls">
        <button class="carousel-btn" id="prev-btn">&#8592;</button>
        <button class="carousel-btn" id="next-btn">&#8594;</button>
      </div>
    `;
    document.getElementById('prev-btn').onclick = prev;
    document.getElementById('next-btn').onclick = next;
  }
  function next() {
    current = (current + 1) % images.length;
    render();
    resetInterval();
  }
  function prev() {
    current = (current - 1 + images.length) % images.length;
    render();
    resetInterval();
  }
  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(next, 5000);
  }
  render();
  interval = setInterval(next, 5000);
});
