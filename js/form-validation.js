document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    // Add CSS for pink theme
    const style = document.createElement('style');
    style.textContent = `
      .pink-error {
        border-color: #ff5d8f !important;
        box-shadow: 0 0 0 3px rgba(255, 93, 143, 0.15) !important;
        background-color: #fff0f5 !important;
      }
      .pink-success {
        background-color: #fff0f5 !important;
        color: #ff5d8f !important;
        border: 2px solid #ffb3c6 !important;
        border-radius: 15px !important;
        padding: 15px !important;
        margin-top: 20px !important;
        text-align: center !important;
        font-weight: bold !important;
        animation: pinkFadeIn 0.5s !important;
        box-shadow: 0 4px 15px rgba(255, 141, 171, 0.2) !important;
      }
      .pink-error-message {
        color: #ff5d8f !important;
        font-size: 0.85rem !important;
        margin-top: 8px !important;
        font-weight: 500 !important;
      }
      @keyframes pinkFadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
    
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      // Clear previous messages
      const oldStatus = document.getElementById('pinkStatus');
      if (oldStatus) oldStatus.remove();
      
      if (validateForm(name, email, message)) {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.id = 'pinkStatus';
        successDiv.className = 'pink-success';
        successDiv.innerHTML = '✅ <strong>Message has been delivered!</strong> We will contact you soon.';
        
        // Insert after form
        contactForm.parentNode.insertBefore(successDiv, contactForm.nextSibling);
        
        // Reset form
        contactForm.reset();
        
        // Remove message after 5 seconds
        setTimeout(() => {
          successDiv.style.opacity = '0';
          successDiv.style.transform = 'translateY(-10px)';
          setTimeout(() => successDiv.remove(), 300);
        }, 5000);
      }
    });
  }
  
  function validateForm(name, email, message) {
    // Clear previous errors
    document.querySelectorAll('.pink-error').forEach(el => {
      el.classList.remove('pink-error');
      el.style = '';
    });
    document.querySelectorAll('.pink-error-message').forEach(el => el.remove());
    
    let isValid = true;
    
    // Name validation
    const nameField = document.querySelector('input[name="name"]');
    if (!name || name.trim() === '') {
      showPinkError(nameField, 'Name is required');
      isValid = false;
    } else if (name.length < 2) {
      showPinkError(nameField, 'Name must be at least 2 characters');
      isValid = false;
    }
    
    // Email validation
    const emailField = document.querySelector('input[name="email"]');
    if (!email || email.trim() === '') {
      showPinkError(emailField, 'Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showPinkError(emailField, 'Please enter a valid email address');
      isValid = false;
    }
    
    // Message validation
    const messageField = document.querySelector('textarea[name="message"]');
    if (!message || message.trim() === '') {
      showPinkError(messageField, 'Message is required');
      isValid = false;
    } else if (message.length < 1) {
      showPinkError(messageField, 'Message must be at least 10 characters');
      isValid = false;
    }
    
    return isValid;
  }
  
  function showPinkError(field, message) {
    field.classList.add('pink-error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'pink-error-message';
    errorDiv.textContent = `⚠ ${message}`;
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
  }
});