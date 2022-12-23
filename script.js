let productsGrid = document.getElementById('products');
let productsArray = [];
let xhr = new XMLHttpRequest();
let url = 'https://my-json-server.typicode.com/DENDRO20/proiect_final1';

xhr.open('GET',url + '/products');
xhr.responseType = 'json';
xhr.onload = function(){
    let product = xhr.response;
    productsGrid.innerHTML = null;
    product.forEach(p=>{
        productsArray.push(p);
        let pElem = document.createElement('div');
        pElem.classList.add('product');
        pElem.innerHTML = `
                <div class='name'>
                <h2 class='product-name'>${p.name}</h2>
                </div>
                <div class='image'>
                <img class='product-photo' src='${p.photo_url}'>
                </div>
                <div class='elem'>
                <p class='price'><b>Price: </b>${p.price}$</p>
                <p class='product-desc'><b>Description: </b>${p.description}</p>
                <div class='buy-btn'>
                <button class='buy-b' onclick="addProducts(${p.id})">Buy</button>
                </div>
                </div>`;
                productsGrid.append(pElem);
    });   
}
xhr.send();

function addProducts(id){
    xhr.open('GET', `${url}/products/${id}`);
    xhr.responseType = 'json';
    xhr.onload = function(){

    }
}

let cart = document.getElementById("cart-products");
let cartProduct = [];
if(localStorage.getItem('cart')){
    cartProduct = JSON.parse(localStorage.getItem('cart'));
   drawProduct();
}

function deschide(){
    cart.classList.toggle('hide');
}

function addProducts(id){
    let product = productsArray.find(function(p){
        return p.id == id;
    })
    cartProduct.push(product);
    drawProduct();
   localStorage.setItem("cart", JSON.stringify(cartProduct));

}

function drawProduct(){
    if(cartProduct.length == 0)return cart.innerHTML = 'cart'
        cart.innerHTML = null;
        let sum = 0;
        cartProduct.forEach(function(p){
            cart.innerHTML += `
            <p><img src='${p.photo_url}'>${p.name} | ${p.price}$</p>
            <hr>`;
            sum+=p.price;
        });
        cart.innerHTML += `
        <p>Total Price: ${sum}$</p>
        <button onclick="buyAll();">Buy All</button>`
}

function buyAll(){
    cartProduct = [];
    cart.innerHTML = 'Transaction successful';
    localStorage.setItem("cart",'[]');
}

