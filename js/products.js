//helper functions to use throughout this script

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
    // let menSizeOptionHtmlShort = '';
    // let menColorOptionHtmlShort = '';
    // let menSizeOptionHtmlLong = '';
    // let menColorOptionHtmlLong = '';
    // let womenSizeOptionHtmlShort = '';
    // let womenColorOptionHtmlShort = '';
    // let womenSizeOptionHtmlLong = '';
    // let womenColorOptionHtmlLong = '';
    const menHeading = `<h2>Men's Shirts</h2>`;
    const womenHeading = `<h2>Women's Shirts</h2>`;


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


        const menShortSleeveHTML = menShortSleeve.map(item => {
                    return `
            <form class="card">
              <h2 class="card-type">${item.type.charAt(0).toUpperCase() + item.type.slice(1)}'s</h2>
              <h3 class="card-style">${item.style.charAt(0).toUpperCase() + item.style.slice(1)}</h3>
              <label class="card-label" for="size">Size:</label>
              <select id="size" class="card-options">
               ${item.size.map(size => `<option class="size" value="${size}">${size}<option>`).join('')}
              </select>
              <label class="card-label" for="color">Color:</label>
              <select id="color" class="card-options">
              ${item.colors.map(color => `<option class="color" value="${color}">${color}<option>`).join('')}
              </select>
              <input type="submit" class="btn" id="addToCart" value="Add To Cart">
            </form>
            `
        }).join('')

        const womenShortSleeveHTML = womenShortSleeve.map(item => {
          return `
            <form class="card">
              <h2 class="card-type">${item.type.charAt(0).toUpperCase() + item.type.slice(1)}'s</h2>
              <h3 class="card-style">${item.style.charAt(0).toUpperCase() + item.style.slice(1)}</h3>
              <label class="card-label" for="size">Size:</label>
              <select id="size" class="card-options">
              ${item.size.map(size => `<option value="${size}">${size}<option>`).join('')}
              </select>
              <label class="card-label" for="color">Color:</label>
              <select id="color" class="card-options">
              ${item.colors.map(color => `<option value="${color}">${color}<option>`).join('')}
              </select>
              <input type="submit" class="btn" id="addToCart" value="Add To Cart">
            </form>
            `
          }).join('')

        shortContainer.innerHTML = `<div class="container">${menShortSleeveHTML}</div>
                                    <div class="container">${womenShortSleeveHTML}</div>`;

        const cartButtons = document.querySelectorAll('.btn');

        cartButtons.forEach(button => {
         
          button.addEventListener('click', (e) => {
            e.preventDefault();
          })
        })
       
    } catch (e) {
        console.log('There was an error');
        console.log(e);
    }
}

displayProducts();