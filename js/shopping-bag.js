let shoppingBag = JSON.parse(localStorage.getItem('shopping_bag'));

let buysubmit = document.querySelector('.buy-item-now')
let bagItems = document.querySelector('.bag-items');
let emptyBag = document.querySelector('.empty-bag');
let finalArray;

let objectToCreateMultilevelArr = {};

shoppingBag.forEach(function (value) {
    if (typeof objectToCreateMultilevelArr[JSON.stringify(value)] == 'undefined')
        objectToCreateMultilevelArr[JSON.stringify(value)] = [];
    objectToCreateMultilevelArr[JSON.stringify(value)].push(JSON.stringify(value));
});

finalArray = Object.keys(objectToCreateMultilevelArr).map(function (key) {
    return objectToCreateMultilevelArr[key];
});


fillTheBag();

function fillTheBag() {
    try {
        for (let i = 0; i < finalArray.length; i++) {
            if (JSON.parse(finalArray[i][0]).length = 0) {
                document.location.href = 'catalog.html'
            }
            createBagItem(JSON.parse(finalArray[i][0]), i, finalArray[i].length)
        }
        getPrice();
    } catch (event) {
        document.location.href='catalog.html';
    }
}

emptyBag.addEventListener('click', cleanBag);
buysubmit.addEventListener('click', purchase)


function cleanBag() {
    localStorage.removeItem('shopping_bag');
    localStorage.setItem('shopping_bag', JSON.stringify([]));
    numberOfItemsInCart();
    localStorage.removeItem('total');
    localStorage.setItem('total', JSON.stringify(0));
}

function createBagItem(item, iterator, length) {
    let bagItem = document.createElement('div');
    let itemImage = document.createElement('div');
    let img = document.createElement('img');
    let itemText = document.createElement('div');
    let itemName = document.createElement('div');
    let itemPrice = document.createElement('div');
    let itemProps = document.createElement('div');
    let itemColor = document.createElement('div');
    let itemSize = document.createElement('div');
    let itemQuantity = document.createElement('div');
    let quantityMinus = document.createElement('span');
    let quantity = document.createElement('span');
    let quantityPlus = document.createElement('span');
    let itemRemove = document.createElement('button');

    bagItem.setAttribute('class', 'bag-item');
    itemImage.setAttribute('class', 'images-of-items');
    img.setAttribute('src', `img/${item.thumbnail}`);
    itemText.setAttribute('class', 'item-information');
    itemName.setAttribute('class', 'item-titles');
    itemPrice.setAttribute('class', 'item-cost');
    itemProps.setAttribute('class', 'item-color-size-quant');
    itemColor.setAttribute('class', 'item_color');
    itemSize.setAttribute('class', 'item_size');
    itemQuantity.setAttribute('class', 'item_quantity');
    quantityMinus.setAttribute('class', 'minus');
    quantityPlus.setAttribute('class', 'plus');
    itemRemove.setAttribute('class', 'remove-item');
    itemRemove.setAttribute('name', iterator);
    quantityPlus.setAttribute('name', iterator);
    quantityMinus.setAttribute('name', iterator);
    itemRemove.addEventListener('click', removeFromBag)

    itemRemove.textContent = 'Remove item';
    itemName.textContent = item.title;
    itemPrice.textContent = `£ ${item.price}`;
    itemColor.textContent = `Color: ${item.colors[0]}`;
    itemSize.textContent = `Size: ${item.sizes[0]}`;
    itemQuantity.textContent = 'Quantity:';
    quantityMinus.textContent = '-';
    quantity.textContent = length;
    quantityPlus.textContent = '+';

    quantityPlus.addEventListener('click', addOneItem);
    quantityMinus.addEventListener('click', deleteOneItem);

    bagItems.appendChild(bagItem);
    bagItem.appendChild(itemImage);
    itemImage.appendChild(img);
    bagItem.appendChild(itemText);
    bagItem.appendChild(itemText);
    itemText.appendChild(itemName);
    itemText.appendChild(itemPrice);
    itemText.appendChild(itemProps);
    itemProps.appendChild(itemColor);
    itemProps.appendChild(itemSize);
    itemProps.appendChild(itemQuantity);
    itemQuantity.appendChild(quantityMinus);
    itemQuantity.appendChild(quantity);
    itemQuantity.appendChild(quantityPlus);
    itemProps.appendChild(itemRemove);
}

function removeFromBag(event) {
    let positionInArr = event.target.getAttribute('name');
    finalArray.splice(positionInArr, 1);
    rerun();
    refrshShoppingBag();
    fillTheBag();
}

function addOneItem(event) {
    let iterator = event.target.getAttribute('name');
    finalArray[iterator].push(finalArray[iterator][0]);
    getPrice();
    refrshShoppingBag();
    rerun();
    fillTheBag();
    numberOfItemsInCart();
}

function deleteOneItem(event) {
    let iterator = event.target.getAttribute('name');
    finalArray[iterator].splice(finalArray[iterator][0], 1);
    getPrice();
    refrshShoppingBag();
    rerun();
    fillTheBag();
    numberOfItemsInCart();

}

function rerun() {
    while (bagItems.children[0]) {
        bagItems.removeChild(bagItems.children[0]);
    }
}

function getPrice() {
    let finalPrice = 0;
    for (let i = 0; i < finalArray.length; i++) {
        for (let k = 0; k < finalArray[i].length; k++) {
            finalPrice += JSON.parse(finalArray[i][k]).price;
        }
    }
    document.querySelector('#total-cost').textContent = `£ ${finalPrice}`;
    document.querySelector('.cart_sum').textContent = `${finalPrice}`;
    localStorage.removeItem('total');
    localStorage.setItem('total', JSON.stringify(finalPrice));
}

function refrshShoppingBag() {
    let newArr = []
    for (let i = 0; i < finalArray.length; i++) {
        for (let k = 0; k < finalArray[i].length; k++) {
            newArr.push(JSON.parse(finalArray[i][k]));
        }
    }
    localStorage.removeItem('shopping_bag');
    localStorage.setItem('shopping_bag', JSON.stringify(newArr));
}

function numberOfItemsInCart() {
    let bag = JSON.parse(localStorage.getItem('shopping_bag'))
    document.querySelector('.bag-length').textContent = bag.length;
}

function purchase() {
    document.querySelector('.cart_sum').textContent = `0`;
    cleanBag();
    scrollTo(0,0);
    bagItems.setAttribute('class', 'purchase');
    bagItems.textContent = 'Thank you for your purchase';
}
