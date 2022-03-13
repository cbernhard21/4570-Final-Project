'use strict'

//BEGIN HELPER FUNCTIONS

//function to handle form background color, takes in a color string and the DOM element the color is applied to
//the color hex numbers are coded in the switch statement
function handleBackgroundColor(color, htmlElement) {
  switch (color) {
    case 'green':
      htmlElement.style.backgroundColor = '#557C3E';
      break;
    case 'black':
      htmlElement.style.backgroundColor = '#333333';
      break;
    case 'blue':
      htmlElement.style.backgroundColor = '#0a013f';
      break;
    case 'brown':
      htmlElement.style.backgroundColor = '#3f3001';
      break;
  }
}

//function to handle button color change, takes in a color string and the DOM element the color is applied to
//the color hex numbers are coded in the switch statement
function handleButtonColor(color, htmlElement) {
  switch (color) {
    case 'white':
      htmlElement.style.backgroundColor = '#FAEBD7';
      break;
    case 'grey':
      htmlElement.style.backgroundColor = '#dddddd';
      break;
    case 'babyBlue':
      htmlElement.style.backgroundColor = '#8ba8f8';
      break;
    case 'lightBrown':
      htmlElement.style.backgroundColor = '#a88d53';
      break;
  }
}

//check to see if the use is logged in
function checkLoggedIn() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  return isLoggedIn;
}


//if user is logged in, all nav options are revealed
function showNavItems() {
  if (checkLoggedIn()) {
    let li = document.querySelectorAll('li');
    li.forEach(item => {
      item.classList.contains('hidden');
      item.classList.remove('hidden');
    })
  }
}


//money formatter
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

//END HELPER FUNCTIONS

function cart() {
  //variables for this function
  const cart = document.querySelector('#cart');
  const userCart = JSON.parse(localStorage.getItem('cart'));
  const main = document.querySelector('main');

  //add ID to each item of the cart using the index for the ID
  userCart.forEach((item, index) => {
    item.id = index;
  })

  //create HTML for all the products in the cart
  function createCartHtml() {
    const userCartHTML = userCart.map((item) => {
      return `
          <div class="cart-item" data-item-id="${item.id}">
            <h2 class="cart-type">${item.type}</h2>
            <p class="cart-style">${item.style}</p>
            <p class="cart-size">Size: ${item.size}</p>
            <p class="cart-color">Color: ${item.color}</p>
            <p class="cart-price">Price: ${item.quantity} x $${item.price} = ${formatter.format(item.quantity * item.price)}</p>
            <p class="cart-quantity" data-item-id="${item.id}">Quantity: <span class="quantity">${item.quantity}</span> <button class="increase">+</button><button class="decrease">-</button></span></p>
            <button class="btn delete">Delete Item</button>
          </div>  
      `
    }).join('');
    return userCartHTML;
  }

  //calculate and create HTML in this function
  function handleTotal() {
    let total = 0;

    //loop through array, add on to the total price
    userCart.forEach(item => {
      let price = Number(item.price * item.quantity);
      total += price;
    })

    const totalHTML = `
        <div class="cart-item total-container">
            <span class="total-text">Order Total</span> <span class="total-amount">${formatter.format(total)}</span>
        </div>
  `;
    return totalHTML
  }

  //display product html and total HTML on page load
  cart.innerHTML = createCartHtml() + handleTotal();

  //DOM elements after page load
  const deleteButtons = document.querySelectorAll('.delete');
  const increaseButtons = document.querySelectorAll('.increase');
  const decreaseButtons = document.querySelectorAll('.decrease');

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

  //handle the increase product quantity
  increaseButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const increaseProduct = e.target.parentElement;
      const increaseProductId = increaseProduct.dataset.itemId;
      userCart.forEach((item) => {
        if (item.id === Number(increaseProductId)) {
          item.quantity++;
        };
      });
      //store cart into local storage
      localStorage.setItem('cart', JSON.stringify(userCart));
      //reload the page
      window.location.reload();
    });
  });

  //handle the decrease product quantity 
  decreaseButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const decreaseProduct = e.target.parentElement;
      const decreaseProductId = decreaseProduct.dataset.itemId;
      userCart.forEach(item => {
        if (item.id === Number(decreaseProductId)) {
          if (item.quantity > 0) {
            item.quantity--
          }
        };
      });
      //store cart into local storage
      localStorage.setItem('cart', JSON.stringify(userCart));
      //reload the page
      window.location.reload();
    });
  });

  //create go to checkout button at the bottom of the page
  const checkButton = document.createElement('button');
  const buttonDiv = document.createElement('div');
  buttonDiv.setAttribute('class', 'flex center button-container');
  checkButton.innerText = 'Check Out';
  checkButton.setAttribute('class', 'btn-go-to-cart');
  buttonDiv.appendChild(checkButton);
  main.append(buttonDiv);

  //event listener for go to checkout
  const goToCheckOutButton = document.querySelector('.btn-go-to-cart');
  goToCheckOutButton.addEventListener('click', () => {
    window.location.pathname = './checkout.html';
  });

  //change colors according to user settings
  //DOM elements to change background color
  const cartItemDiv = document.querySelectorAll('.cart-item');
  const deleteButton = document.querySelectorAll('.delete');
  const allIncreaseButtons = document.querySelectorAll('.increase');
  const allDecreaseButtons = document.querySelectorAll('.decrease');
  const checkoutButton = document.querySelector('.btn-go-to-cart');
  const checkOutButtonDiv = document.querySelector('.button-container');


  //get user color settings from local storage
  const loggedInUserInfo = JSON.parse(localStorage.getItem('user'));
  const userBackgroundColor = loggedInUserInfo.settings.backgroundColor;
  const userButtonColor = loggedInUserInfo.settings.buttonColor;

  //change background colors
  cartItemDiv.forEach(div => {
    handleBackgroundColor(userBackgroundColor, div);
  });
  deleteButton.forEach(button => {
    handleButtonColor(userButtonColor, button);
  });
  allIncreaseButtons.forEach(button => {
    handleButtonColor(userButtonColor, button);
  });
  allDecreaseButtons.forEach(button => {
    handleButtonColor(userButtonColor, button);
  });

  handleButtonColor(userButtonColor, checkoutButton);
  handleBackgroundColor(userBackgroundColor, checkOutButtonDiv);
}

//Handles the page
if (!checkLoggedIn()) {
  alert('you need to be logged in to check your cart');
  window.location.pathname = './login.html'
} else {
  showNavItems();
  cart();
}