'use strict'

//BEGIN HELPER FUNCTIONS 

//function to handle form background color, takes in a color string and the DOM element the color is applied to
//the color hex numbers are coded in the switch statement
function handleBackgroundColor(color, htmlElement) {
  switch (color) {
    case 'default':
      htmlElement.style.backgroundColor = '#557C3E';
      break;
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
    case 'default':
      htmlElement.style.backgroundColor = '#FAEBD7';
      break;
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

//function to create 2 arrays, one for short sleeve and on for long sleeve
function sortProducts(productArr, value, productArr1, productArr2) {
  productArr.forEach((item) => {
    if (item.sleeve === value) {
      productArr1.push(item);
    } else {
      productArr2.push(item);
    }
  });
}

//function to create product info HTML card
function createProductHTML(arr) {
  return arr.map(item => {
        return `
          <div class="card">
            <h2 class="card-type">${item.type.charAt(0).toUpperCase() + item.type.slice(1)}'s</h2>
            <h3 class="card-style">${item.style.charAt(0).toUpperCase() + item.style.slice(1)}</h3>
            <p class="card-price">Price: $${item.price}</p>
            <label class="card-label" for="size">Size:</label>
            <select id="size" class="card-options">
            ${item.size.map(size => `<option class="size" value="${size}">${size}</option>`).join('')}
            </select>
            <label class="card-label" for="color">Color:</label>
            <select id="color" class="card-options">
            ${item.colors.map(color => `<option class="color" value="${color}">${color}</option>`).join('')}
            </select>
            <button type="submit" class="btn add-to-cart">Add To Cart</button>
          </div>
          `
  }).join('\n')
}

//function to get product information
async function getProducts() {
  const response = await fetch('./products.json');
  const products = await response.json();
  return products;
}

//check to see if the use is logged in
function checkLoggedIn() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  return isLoggedIn;
}

//handles the user's color settings runs at the end of displayProducts
function changeColors() {
  //change colors according to user settings
  //DOM elements to change background color
  const cardDiv = document.querySelectorAll('.card');
  const addToCartButton = document.querySelectorAll('.add-to-cart');
  const goToCartButton = document.querySelector('.btn-go-to-cart');
  const buttonDiv = document.querySelector('.button-container');

  //get user color settings from local storage
  const loggedInUserInfo = JSON.parse(localStorage.getItem('user'));
  const userBackgroundColor = loggedInUserInfo.settings.backgroundColor;
  const userButtonColor = loggedInUserInfo.settings.buttonColor;
  
  //change background colors
  cardDiv.forEach(div => {
    handleBackgroundColor(userBackgroundColor, div);
  });
  addToCartButton.forEach(button => {
    handleButtonColor(userButtonColor, button);
  });
  handleButtonColor(userButtonColor, goToCartButton);
  handleBackgroundColor(userBackgroundColor, buttonDiv);
}

//END HELPER FUNCTIONS

//main function to display all the product information
async function displayProducts() {

  //arrays to be filled later
  let allProducts = [];

  //if user is logged in, all nav options are revealed
  if (checkLoggedIn()) {
    let li = document.querySelectorAll('li');
    li.forEach(item => {
      item.classList.contains('hidden');
      item.classList.remove('hidden');
    })
  }

  //DOM elements
  const shortContainer = document.querySelector('.short-sleeve-container');
  const longContainer = document.querySelector('.long-sleeve-container');
  const main = document.querySelector('main');

  //short and long sleeve arrays
  const allShortSleeveShirts = [];
  const allLongSleeveShirts = [];

  try {
    allProducts = await getProducts();
    const menShirts = allProducts.Men;
    const womenShirts = allProducts.Women;

    //sort men's short and long sleeve
    menShirts.forEach(shirt => {
      if(shirt.sleeve === 'short') {
        allShortSleeveShirts.push(shirt)
      } else if(shirt.sleeve === 'long') {
        allLongSleeveShirts.push(shirt)
      }
    });
    //sort women's short and long sleeve
    womenShirts.forEach(shirt => {
      if(shirt.sleeve === 'short') {
        allShortSleeveShirts.push(shirt)
      } else if(shirt.sleeve === 'long') {
        allLongSleeveShirts.push(shirt)
      }
    });

    //create and render all HTML for the products to the web page
    const allShortSleeveHTML = createProductHTML(allShortSleeveShirts); 
    const allLongSleeveHTML = createProductHTML(allLongSleeveShirts);
    shortContainer.innerHTML = `<div class="container">${allShortSleeveHTML}</div>`;
    longContainer.innerHTML = `<div class="container">${allLongSleeveHTML}</div>`;

    //create go to cart button at the bottom of the page
    const cartButton = document.createElement('button');
    const buttonDiv = document.createElement('div');
    buttonDiv.setAttribute('class', 'flex center button-container');
    cartButton.innerText = 'Go To Cart';
    cartButton.setAttribute('class', 'btn-go-to-cart');
    buttonDiv.appendChild(cartButton)
    main.append(buttonDiv);

    //event listener for add to cart button
    const cartButtons = document.querySelectorAll('.btn');
    cartButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        let parentDiv = e.target.parentElement;
        let selectedType = parentDiv.children[0].innerText;
        let selectedStyle = parentDiv.children[1].innerText;
        let selectedPrice = parentDiv.children[2].innerText.slice(8);
        let selectedSize = parentDiv.children[4].value;
        let selectedColor = parentDiv.children[6].value;

        if (!checkLoggedIn()) {
          alert('Please Log In To Add To Your Cart');
          return
        }

        //create cart variable
        let userCart;

        //cart for products
        if(localStorage.getItem('cart')) {
          userCart = JSON.parse(localStorage.getItem('cart'))
        } else {
          userCart = []
        }

        userCart.push({
          type: selectedType,
          style: selectedStyle,
          size: selectedSize,
          color: selectedColor,
          price: selectedPrice,
          quantity: 1
        })
        
        localStorage.setItem('cart', JSON.stringify(userCart));
      });
      //event listener for go to cart
      const goToCartButton = document.querySelector('.btn-go-to-cart');
      goToCartButton.addEventListener('click', () => {
        window.location.pathname = './cart.html';
      });
    }); 

    changeColors()
    
  } catch (e) {
      console.log('There was an error');
      console.log(e);
  }
}

displayProducts();