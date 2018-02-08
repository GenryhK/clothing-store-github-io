const objectWithCatalog = JSON.parse(localStorage.getItem('catalog'));
const idActiveItem = localStorage.getItem('idActiveItem');
let activeProduct;
let productToBasket;

for (let i = 0; i != objectWithCatalog.length; i++) {
    if (objectWithCatalog[i].id === idActiveItem) {
        activeProduct = objectWithCatalog[i];
    }
}

let mainImg = document.querySelector(".main-image");
let size = document.querySelector(".thumbnails.size");
let color = document.querySelector(".thumbnails.color");
let ul = document.querySelector('.other-image-wrapper');
let sizeArr = activeProduct.sizes;
let colorArr = activeProduct.colors;
let addToBag = document.querySelector('.add-to-bag');
productToBasket = Object.assign( {} , activeProduct);

ul.addEventListener('click', changeMainPicture);
addToBag.addEventListener('click', addToProductBag);

mainImg.firstElementChild.setAttribute('src', `img/${activeProduct.preview[0]}.png`);

for (let i = 0; i != sizeArr.length; i++) {
    printBySize(sizeArr[i], i);
}

for (let i = 0; i != colorArr.length; i++) {
    printByColor(colorArr[i], i);
}


document.querySelector('.product-title').textContent = activeProduct.title
document.querySelector('.all-information-product').textContent = activeProduct.description
document.querySelector('.product-price').textContent = '£' + activeProduct.price
addImg()

function addImg() {
    for (let i = 0; i != activeProduct.preview.length; i++) {
        let li = document.createElement('li');
        let img = document.createElement('img');
        li.setAttribute('class', 'other-image-item');
        img.setAttribute('src', `img/${activeProduct.preview[i]}.png`);
        li.appendChild(img);
        ul.appendChild(li)
    }
}

function changeMainPicture(event) {
    let newSrc = event.target.getAttribute('src');
    mainImg.firstElementChild.setAttribute('src', newSrc);
}

function printBySize(item, iterator) {
    let label = document.createElement('label');
    label.setAttribute('for', `size_${iterator}`);
    let input = document.createElement('input');
    input.setAttribute('id', `size_${iterator}`);
    input.setAttribute('type', 'radio');
    input.setAttribute('name', 'image_thumb_size');
    input.setAttribute('value', item);
    input.addEventListener('click', function (event) {
        addSizeToBasket(event.target.value);
    })
    label.textContent = item;
    size.appendChild(input);
    size.appendChild(label)
}

function printByColor(item, iterator) {
    let label = document.createElement('label');
    label.setAttribute('for', `color_${iterator}`);
    let input = document.createElement('input');
    input.setAttribute('id', `color_${iterator}`);
    input.setAttribute('type', 'radio');
    input.setAttribute('name', 'image_thumb_color');
    input.setAttribute('value', item);
    input.addEventListener('click', function (event) {
        addColorToBasket (event.target.value)
    })
    label.textContent = item;
    color.appendChild(input);
    color.appendChild(label)
}

function addToProductBag() {
    changeTotalPriceInNavbar();
    let shoppingBag = localStorage.getItem('shopping_bag');
    let arr = JSON.parse(shoppingBag);
    arr.push(productToBasket);
    localStorage.setItem('shopping_bag', JSON.stringify(arr));
    let sBag = localStorage.getItem('shopping_bag');
    let items = JSON.parse(sBag).length;
    itemsInBasket.textContent = items;

}

function addColorToBasket (value) {
    productToBasket.colors= [];
    productToBasket.colors.push(value);
}

function addSizeToBasket (value) {
    productToBasket.sizes= [];
    productToBasket.sizes.push(value);
}

function changeTotalPriceInNavbar() {
    let total =  JSON.parse(localStorage.getItem('total'));
    document.querySelector('.cart_sum').textContent = (total += productToBasket.price);
    localStorage.removeItem('total');
    localStorage.setItem('total', JSON.stringify(total));
}
