let catalog = JSON.parse(localStorage.getItem('catalog'));

document.querySelector('.cart_sum').textContent = JSON.parse(localStorage.getItem('total'));
let button = document.querySelector('#show-more');

let displayArrayByCategory = [];
let divCatalog = document.querySelector('.main-catalog .catalog');
let divCatalogPromo = document.querySelector('.sale-fifty .catalog');
let activeFilterName;
let activeFilterValue;
let flag = false;


startFillPromoCatalog();

filter('fashion', 'not_selected');


function filter(nameKey, value) {
    switch (sessionStorage.getItem('gender')) {
        case 'women':
            for (let i = 0; i < howManyFlaps(); i++) {
                if (catalog[i].category === 'women' && (value === 'not_selected') ? true : catalog[i][nameKey] === value) {
                    displayArrayByCategory.push(catalog[i])
                }

            }
            break;
        case 'men':
            for (let i = 0; i !== catalog.length; i++) {
                if (catalog[i].category === 'men') {
                    displayArrayByCategory.push(catalog[i])
                }
            }
            break;
    }

    startFillCatalog();
}

function startFillPromoCatalog() {
    let numberOfImages;
    if (screen.width < 1024 && screen.width > 768) {
        numberOfImages = 3;
    } else if (screen.width > 0 && screen.width < 768) {
        numberOfImages = 2;

    } else {
        numberOfImages = 4;
    }
    for (let i = 0; i !== numberOfImages; i++) {
        fillTheCatalog(catalog[i], divCatalogPromo);
    }
}

function startFillCatalog() {
    for (let i = 0; i !== displayArrayByCategory.length; i++) {
        fillTheCatalog(displayArrayByCategory[i], divCatalog);
    }
}

function fillTheCatalog(product, listTo) {
    let a = document.createElement('a');
    let catalogCard = document.createElement('div');
    let productImage = document.createElement('div');
    let img = document.createElement('img');
    let productName = document.createElement('div');
    let productPrice = document.createElement('div');
    a.setAttribute('href', 'product.html');
    catalogCard.setAttribute('class', 'card-product');
    catalogCard.setAttribute('id', product.id);
    productImage.setAttribute('class', 'product-image');
    productName.setAttribute('class', 'name-of-product');
    productPrice.setAttribute('class', 'product-price');
    img.setAttribute('src', `img/${product.thumbnail}`);
    productName.textContent = product.title;
    productPrice.textContent = `£ ${+product.price}`;
    productImage.appendChild(img);
    catalogCard.appendChild(productImage);
    catalogCard.appendChild(productName);
    catalogCard.appendChild(productPrice);
    catalogCard.addEventListener('click', goToProduct);
    a.appendChild(catalogCard);
    listTo.appendChild(a);
}


function goToProduct(event) {
    localStorage.setItem('idActiveItem', event.target.parentNode.getAttribute('id'));
}


let select = document.querySelectorAll('.drop-down input');

handleFilterChange = function (event) {
    activeFilterName = event.target.name;
    activeFilterValue = event.target.value;

    let filterItem = document.querySelector('#' + event.target.name);
    let filterSpan = document.querySelector('#' + event.target.name + ' span');

    event.target.value == 'not_selected' ?
        filterItem.setAttribute('class', 'filtration')
        : filterItem.setAttribute('class', 'filtration selected');

    filterSpan.textContent = event.target.parentNode.textContent;
    refresh(activeFilterName, activeFilterValue);
};

for (let i = 0; i < select.length; i++) {
    select[i].addEventListener('change', handleFilterChange);
}

button.addEventListener('click', showAll);

function showAll() {
    flag = true;
    refresh();
    if (displayArrayByCategory.length === divCatalog.children.length) {
        button.style.display = "none";
    }
}

function howManyFlaps() {
    if (flag) {
        return catalog.length
    } else {
        return 9
    }

}

function refresh(activeFilterName = 'fashion', activeFilterValue = 'not_selected') {
    displayArrayByCategory = [];
    while (divCatalog.children[0]) {
        divCatalog.removeChild(divCatalog.children[0]);
    }
    filter(activeFilterName, activeFilterValue);
}

let filterDrop = document.querySelector('.dd-mobile-tablet');
let filterOpened = false;

function toggleFilterDrop() {
    if (filterOpened === false) {
        filterDrop.setAttribute('class', 'dd-mobile-tablet active');
        filterOpened = true;
    }
    else if (filterOpened = true) {
        filterDrop.setAttribute('class', 'dd-mobile-tablet');
        filterOpened = false;
    }
}

filterDrop.addEventListener('click', toggleFilterDrop);