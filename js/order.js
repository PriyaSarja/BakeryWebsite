// Get elements
const inputs = document.querySelectorAll('input[type="number"]');
const summaryList = document.getElementById('summaryList');
const totalDisplay = document.getElementById('summaryTotal');
const orderBtn = document.getElementById('placeOrder');
const status = document.getElementById('orderStatus');

// Update order total
function updateTotal() {
  let total = 0;
  summaryList.innerHTML = '';
  
  inputs.forEach(input => {
    const qty = parseInt(input.value);
    if (qty > 0) {
      const name = input.getAttribute('data-name');
      const price = parseInt(input.getAttribute('data-price'));
      const itemTotal = price * qty;
      total += itemTotal;
      
      const div = document.createElement('div');
      div.className = 'summary-item';
      div.textContent = `${name} × ${qty} = ₹${itemTotal}`;
      summaryList.appendChild(div);
    }
  });
  
  // If no items, show message
  if (summaryList.children.length === 0) {
    const emptyMsg = document.createElement('div');
    emptyMsg.className = 'empty-message';
    emptyMsg.textContent = 'No items selected';
    summaryList.appendChild(emptyMsg);
  }
  
  totalDisplay.textContent = `Total: ₹${total}`;
}

// Add change event to all inputs
inputs.forEach(input => {
  input.addEventListener('change', updateTotal);
});

// Handle order button click
if (orderBtn) {
  orderBtn.addEventListener('click', () => {
    let hasItems = false;
    
    inputs.forEach(input => {
      if (parseInt(input.value) > 0) hasItems = true;
    });
    

    if (!hasItems) {
  if (status) {
    status.textContent = 'Please select at least one item.';
    status.style.color = '#ff5d8f'; 
    status.style.fontWeight = 'bold';
  }
  return;
}

if (status) {
  status.textContent = 'Order placed successfully! 🎉';
  status.style.color = '#ff8fab';
  status.style.fontWeight = 'bold';
}
  });
}

// Initialize
updateTotal();