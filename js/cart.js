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

  console.log(userCart);

  //create HTML for all the products in the cart
  const userCartHTML = userCart.map(item => {
      return `
          <div class="cart-item">
            <h2 class="cart-type">${item.type}</h2>
            <p class="cart-style">${item.style}</p>
            <p class="cart-size">${item.size}</p>
            <p class="cart-color">${item.color}</p>
            <p class="cart-price">${item.price}</p>
            <p class="cart-quantity"><span class="add" onclick="">add</span> ${item.quantity} <span class="minus">minus</span></p>
          </div>  
      `
  }).join('');



  //handle quantity change
  function handleQuantityChange() {
    console.log('i was clicked')
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


  cart.innerHTML = userCartHTML + handleTotal();