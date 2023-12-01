document.addEventListener('DOMContentLoaded', function () {
    // Add a click event listener to all "Add to cart" buttons
    var addToCartButtons = document.querySelectorAll('[data-action="add-to-cart"]');
    addToCartButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        addToCart(button);
      });
      
    });
  
    // Function to add item to the cart
    function addToCart(button) {
      var product = button.closest('.col-4'); // Assuming the product is in a col-4 container
      var productName = product.querySelector('.product-name').innerText;
      var productPrice = parseFloat(product.querySelector('.product-price').innerText.replace('R', ''));
  
      var cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 };
  
      // To Check if the item is already in the cart
      var existingItem = cart.items.find(item => item.name === productName);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ name: productName, price: productPrice, quantity: 1 });
      }
  
      // Update the total price
      cart.total += productPrice;
  
      // Save the cart back to local storage
      localStorage.setItem('cart', JSON.stringify(cart));
  
      // Update the cart count in the header
      updateCartCount();
    }
  
    // Function to update the cart count in the header
    function updateCartCount() {
      var cartCountElement = document.getElementById('cart-count');
      var cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 };
      var itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
      cartCountElement.innerText = itemCount;
    }
  
    // Update cart count on page load
    updateCartCount();
    
    
  });