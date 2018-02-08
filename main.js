let shoppingBag = [];
localStorage.setItem('total',JSON.stringify(0));
localStorage.setItem('shopping_bag',JSON.stringify(shoppingBag));

let catalog = JSON.parse(localStorage.getItem('catalog'));
let displayArrayByCategory = [];
displayArrayByCategory = catalog;
let divCatalogPromo = document.querySelector('.sale-fifty .catalog');

startFillPromoCatalog();


function startFillPromoCatalog() {
    let numberOfImages;
    if (screen.width < 1024 && screen.width > 768) {
        numberOfImages =3;
    } else if(screen.width > 0 && screen.width < 768){
        numberOfImages = 2;

    } else {
        numberOfImages = 4;
    }
    for (let i = 0; i !== numberOfImages; i++) {
        fillTheCatalog(displayArrayByCategory[i],divCatalogPromo);
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
