let usersGrid = document.getElementById('users');
let usersArray = [];
let xhr = new XMLHttpRequest();
let url = 'https://my-json-server.typicode.com/DENDRO20/proiect_final1';

xhr.open('GET',url + '/users');
xhr.responseType = 'json';
xhr.onload = function(){
    let user = xhr.response;
    usersGrid.innerHTML = null;
    user.forEach(p=>{
        usersArray.push(p);
        let pElem = document.createElement('div');
        pElem.classList.add('user');
        pElem.innerHTML = `
                <div class='name'>
                <h2 class='user-name'>${p.name} ${p.sirname}</h2>
                </div>
                <div class='image'>
                <button onclick="show_desc(${p.id})">
                <img class='user-photo' src='${p.photo_url}'>
                </button>
               
                </div>
`;
                usersGrid.append(pElem);
    });   
}
xhr.send();

function show_desc(id){
    xhr.open('GET', `${url}/users/${id}`);
    xhr.responseType = 'json';
    xhr.onload = function(){

    }
}

let cart = document.getElementById("description");
let cartProduct = [];

function deschide(){
    cart.classList.toggle('hide1');
}

function show_desc(id){
    let user = usersArray.find(function(p){
        return p.id = id;
    })
    cartProduct.push(user);
    drawUser();

}

function drawUser(){
    // if(cartProduct.length == 0)return cart.innerHTML = 'cart'
    // cart.innerHTML = null;
        cartProduct.forEach(function(p){
            cart.innerHTML = `
            <p>Balance: ${p.balance}</p>`;
        });
}

