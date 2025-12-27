document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      if (validateForm(name, email, message)) {
        alert('Thank you! We will contact you soon.');
        contactForm.reset();
      }
    });
  }
  
  function validateForm(name, email, message) {
    // 15 more lines of validation...
  }
});