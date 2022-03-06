'use strict'


//BEGIN HELPER FUNCTIONS 

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
            <input type="submit" class="btn" id="addToCart" value="Add To Cart">
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

//END HELPER FUNCTIONS

//main function to display all the product information
async function displayProducts() {



  //arrays to be filled later
  let allProducts = [];
  let menShortSleeve = [];
  let menLongSleeve = [];
  let womenShortSleeve = [];
  let womenLongSleeve = [];

  //is the user logged in
  // const isLoggedIn = sessionStorage.getItem('isLoggedIn');

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

  try {
    allProducts = await getProducts();
    let menShirts = allProducts.Men;
    let womenShirts = allProducts.Women;

    //create arrays for men and woman short/long sleeve shirts
    sortProducts(menShirts, 'short', menShortSleeve, menLongSleeve);
    sortProducts(womenShirts, 'short', womenShortSleeve, womenLongSleeve);

    const menShortSleeveHTML = createProductHTML(menShortSleeve);
    const womenShortSleeveHTML = createProductHTML(womenShortSleeve)
    const menLongSleeveHTML = createProductHTML(menLongSleeve);
    const womenLongSleeveHTML = createProductHTML(womenLongSleeve);


    shortContainer.innerHTML = `<div class="container">${menShortSleeveHTML}</div>
                                <div class="container">${womenShortSleeveHTML}</div>`;

    longContainer.innerHTML = `<div class="container">${menLongSleeveHTML}</div>
                               <div class="container">${womenLongSleeveHTML}</div>
                              `;

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

        if (!isLoggedIn) {
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
      
    });

    
    
  } catch (e) {
      console.log('There was an error');
      console.log(e);
  }
}

displayProducts();