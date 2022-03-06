//check to see if the use is logged in
function checkLoggedIn() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  return isLoggedIn;
}

if (!checkLoggedIn()) {
  console.log('you need to be logged in to check your cart');
}

//if user is logged in, all nav options are revealed
if (checkLoggedIn()) {
  let li = document.querySelectorAll('li');
  li.forEach(item => {
    item.classList.contains('hidden');
    item.classList.remove('hidden');
  })
}

//global variable
const cart = document.querySelector('#cart');
const userCart = JSON.parse(localStorage.getItem('cart'));
let quantity = 1;

console.log(userCart);

//add ID to each item of the cart using the index for the ID
userCart.forEach((item, index) => {
  item.id = index;
})

//create HTML for all the products in the cart
function createCartHtml(quantity) {
  console.log(userCart)
  const userCartHTML = userCart.map((item) => {
    return `
          <div class="cart-item" data-item-id="${item.id}">
            <h2 class="cart-type">${item.type}</h2>
            <p class="cart-style">${item.style}</p>
            <p class="cart-size">${item.size}</p>
            <p class="cart-color">${item.color}</p>
            <p class="cart-price">$${item.quantity * item.price}</p>
            <p class="cart-quantity" data-item-id="${item.id}">Quantity: <span class="quantity">${quantity}</span> <button class="increase">+</button><button class="decrease">-</button></span></p>
            <button class="btn delete">Delete Item</button>
          </div>  
      `
  }).join('');
  return userCartHTML;
}

//handle the total
function handleTotal() {
  let total = 0;
  userCart.forEach(item => {
    let price = Number(item.price);
    total += price;
  })
  console.log(total)
  const totalHTML = `
        <div>
            <p>Total $${total}</p>
        </div>
  `;
  return totalHTML
}

//display product html on page load
cart.innerHTML = createCartHtml(quantity) + handleTotal();

//DOM elements after page load
const deleteButtons = document.querySelectorAll('.delete');
const increaseButtons = document.querySelectorAll('.increase');
const increaseHTML = document.querySelectorAll('.quantityHTML');

//delete buttons functionality
//add event listener to each delete button
deleteButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    //get the ID of the product
    const deletedProduct = e.target.parentElement;
    const deletedProductId = deletedProduct.dataset.itemId;
    //check the selected product for the product in the cart
    userCart.forEach((item, index) => {
      //delete product from the array
      if (item.id === Number(deletedProductId)) {
        userCart.splice(index, 1)
      }
    });
    //store cart into local storage
    localStorage.setItem('cart', JSON.stringify(userCart));
    //reload the page
    window.location.reload();
  });
})


increaseButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    console.log('increase quantity')
    const increaseProduct = e.target.parentElement;
    const increaseProductId = increaseProduct.dataset.itemId;
    

  });
});