// contact.js - Contact form validation

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    let valid = true;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name) {
      valid = false;
      form.name.style.borderColor = 'red';
    } else {
      form.name.style.borderColor = '#ccc';
    }
    if (!validateEmail(email)) {
      valid = false;
      form.email.style.borderColor = 'red';
    } else {
      form.email.style.borderColor = '#ccc';
    }
    if (!message) {
      valid = false;
      form.message.style.borderColor = 'red';
    } else {
      form.message.style.borderColor = '#ccc';
    }
    if (valid) {
      // Send email using mailto
      window.location.href = `mailto:thodaniel3@gmail.com?subject=Contact%20from%20Shades%20Dream&body=Name:%20${encodeURIComponent(name)}%0AEmail:%20${encodeURIComponent(email)}%0AMessage:%20${encodeURIComponent(message)}`;
      form.reset();
    }
  });
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
