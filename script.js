const url = "https://fakestoreapi.com/products";
const cardsLists = document.getElementById("cards-lists");
const numofcarts = document.querySelector(".no.ofcarts");
const carts = document.getElementById("carts");
const categories = document.querySelectorAll(".category");
let str = "";
let cart = [];
let datas = undefined;
let cartAddedvalue = false;
let gotoCart = false;
let addCarts = [];
let index = 0;

//
const showLists = async () => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    datas = result;
    iterateLists(datas);
  } catch (error) {
    console.error(error);
  }
};

// iterate elements of list
function iterateLists(data) {
  str = "";
  if (data.length > 0) {
    for (val of data) {
      const { id, title, price, description, image, category } = val;
      str += `
    <div class="card mx-4 my-3" style="width: 18rem;">
    <img src=${image} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <h6 class="card-price">$${price}</h6>
      <h6 class="card-category">${category}</h6>
      <p class="card-text">$${description.substring(0, 100)}</p>
      <button onclick="onADD(${id})" class="addcart btn btn-primary">${cartAddedvalue ? "Remove Item" : "AddtoCart"
        }</button>
      </div>
      </div>
      `;
    }
    cardsLists.innerHTML = str;
  } else {
    cardsLists.innerHTML = "<h1>No items</h1>";
  }
}
showLists();

function onADD(i) {
 gotoCart = true;
 
  if (cartAddedvalue) {
    index--;
    if (index) {
      carts.innerHTML = `<span>Carts ${index}</span>`;
    } else {
      carts.innerHTML = `<span>Carts</span>`;
    }
    addCarts = addCarts.filter((cart) => cart.id != i);

    iterateLists(addCarts);
    let totalprice = 0;
    addCarts.forEach((cart) => {
      totalprice += cart.price;
    });
    if (totalprice) {
      pricebox.innerHTML = `${cartAddedvalue && `<h1 id='prices'>Your price is $${totalprice}</h1>`
        }`;
    } else {
      pricebox.innerHTML = "";
    }
  } else {
    addCarts.push(datas[i]);
    index++;
    carts.innerHTML = `<span>Carts ${index}</span>`;
  }
}
function showCart() {
  cartAddedvalue = true;
  iterateLists(addCarts);
  let totalprice = 0;
  addCarts.forEach((cart) => {
    totalprice += cart.price;
  });
  pricebox.innerHTML = `${cartAddedvalue && `<h1 id='prices'>Your price is $${totalprice}</h1>`
    }`;
}

categories.forEach((category) => {
  category.addEventListener("click", () => {
    cartAddedvalue = false;
    if (category.innerHTML == "Home") {
      showLists();
    } else {
      let categoryid = category.innerHTML;

      let newDataofLists = datas.filter((data) => data.category === categoryid);
      iterateLists(newDataofLists);
    }
  });
});
