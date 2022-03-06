console.log('this is the cart page');

//check to see if the use is logged in

function checkLoggedIn() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    return isLoggedIn;
  }

if(!checkLoggedIn()){
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


  //create HTML for all the products in the cart
  function createCartHtml(quantity){
    console.log('quantity inside function', quantity)
    const userCartHTML = userCart.map((item) => {
      return `
          <div class="cart-item">
            <h2 class="cart-type">${item.type}</h2>
            <p class="cart-style">${item.style}</p>
            <p class="cart-size">${item.size}</p>
            <p class="cart-color">${item.color}</p>
            <p class="cart-price">$${item.quantity * item.price}</p>
            <p class="cart-quantity"><button class="increase">Add 1 item</button><span class="quantityHTML">${quantity}</span><button>Minus 1 item</button></span></p>
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



  const increaseButtons = document.querySelectorAll('.increase');
  const increaseHTML = document.querySelectorAll('.quantityHTML');
  console.log(increaseButtons);

  increaseButtons.forEach(button => {
    button.addEventListener('click', () => {
     
    });
  });
