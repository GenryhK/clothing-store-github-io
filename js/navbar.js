let itemsInBasket = document.querySelector('.bag-length');
document.querySelector('.cart_sum').textContent = (localStorage.getItem('total') === null) ? 0 : localStorage.getItem('total');
document.querySelector('#woman-catalog').addEventListener('click', setCatalog);
document.querySelector('#man-catalog').addEventListener('click', setCatalog);



function setCatalog(event) {
     sessionStorage.removeItem('gender');

     if (event.target.id === 'woman-catalog') {
         sessionStorage.setItem('gender', 'women')
     } else {
         sessionStorage.setItem('gender', 'men')
     }
}
(function () {
    let shoppingBag = localStorage.getItem('shopping_bag');
    let items = JSON.parse(shoppingBag).length;
    itemsInBasket.textContent = items;
}());

let burger = document.querySelector('.header_bars_small');
let burgerOpened = false;

function toggleNavMenu() {
    if (burgerOpened === false) {
        burger.setAttribute('class', 'header_bars_small active' );
        burgerOpened = true;
    }
    else if ( burgerOpened = true ) {
        burger.setAttribute('class', 'header_bars_small' );
        burgerOpened = false;
    }
}

burger.addEventListener('click', toggleNavMenu);