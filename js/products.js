//helper functions to use throughout this script

//function to create 2 arrays, one for short sleeve and on for long sleeve
function sortProducts(productArr, value, productArr1, productArr2) {
  productArr.forEach(item => {
    if (item.sleeve === value) {
      productArr1.push(item);
    } else {
      productArr2.push(item)
    }
  });
}

//function to loop through array and create select and option elements
function loopProducts(productArr, htmlContainer) {
  productArr.forEach(shirt => {
    //create select elements for color and size
    let shortSleeveColorSelect = document.createElement('select');
    let shortSleeveSizeSelect = document.createElement('select');
    let p = document.createElement('p');
    p.innerText = shirt.style;

    //loop through shirt size and create option for select element
    shirt.size.forEach(size => {
      let option = document.createElement('option');
      option.innerText = size;
      shortSleeveSizeSelect.appendChild(option);
    });

    //loop through shirt color and create option for select element
    shirt.colors.forEach(color => {
      let option = document.createElement('option');
      option.innerText = color;
      shortSleeveColorSelect.appendChild(option);
    })

    //add all HTML to div to display product details
    htmlContainer.appendChild(p);
    htmlContainer.appendChild(shortSleeveColorSelect);
    htmlContainer.appendChild(shortSleeveSizeSelect);
  });

}

//function to get product information
async function getProducts() {
  const response = await fetch('./products.json');
  const products = await response.json();
  return products;
}

//main function to display all the product information
async function displayProducts() {
  //arrays to be filled later
  let allProducts = [];
  let menShortSleeve = [];
  let menLongSleeve = [];
  let womenShortSleeve = [];
  let womenLongSleeve = [];

  //DOM elements
  const shortSleeveContainer = document.querySelector('.short-sleeve-container');
  const longSleeveContainer = document.querySelector('.long-sleeve-container');

  //create new DOM elements
  let h3Men1 = document.createElement('h3');
  h3Men1.innerText = "Men Shirts";
  let h3Men2 = document.createElement('h3');
  h3Men2.innerText = "Men Shirts";

  let h3Women1 = document.createElement('h3');
  h3Women1.innerText = "Women Shirts";
  let h3Women2 = document.createElement('h3');
  h3Women2.innerText = "Women Shirts";


  try {
    allProducts = await getProducts();
    let menShirts = allProducts.Men;
    let womenShirts = allProducts.Women;

    sortProducts(menShirts, 'short', menShortSleeve, menLongSleeve);
    sortProducts(womenShirts, 'short', womenShortSleeve, womenLongSleeve)

    //display men shirts
    shortSleeveContainer.append(h3Men1);
    loopProducts(menShortSleeve, shortSleeveContainer);
    longSleeveContainer.append(h3Men2);
    loopProducts(menLongSleeve, longSleeveContainer);

    //display woman shirts
    shortSleeveContainer.append(h3Women1);
    loopProducts(womenShortSleeve, shortSleeveContainer);

    longSleeveContainer.append(h3Women2);
    loopProducts(womenLongSleeve, longSleeveContainer);


  } catch (e) {
    console.log('There was an error')
    console.log(e)
  }
}

displayProducts();