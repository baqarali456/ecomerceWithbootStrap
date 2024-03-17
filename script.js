const url = "https://dummyjson.com/products";
const cardsLists = document.getElementById("cards-lists");
const numofcarts = document.querySelector(".no.ofcarts");
const carts = document.getElementById("carts");


let str = "";
let cart = [];
let datas = undefined;
let cartAddedvalue = false;
let addCarts = [];
let index = 0;
let allcategories;

String.prototype.capitalize = function(){
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
}

//
const showLists = async () => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    const {products} = result; 
    datas = products.map(ele=>({...ele,price:Number(ele.price) * 82,category:ele.category.capitalize().split('-').join('')}));
    allcategories = [...new Set(datas.map(ele=>ele.category))]
    
    showCategory()
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
      const { id, title, price, description, images, category } = val;
      str += `
    <div class="card px-2 py-1 mx-4 my-3" style="width: 18rem;">
    <img src=${images[0]} class="card-img-top" alt="...">
    <i class="fa-solid fa-arrow-right"></i>
    <i class="fa-solid fa-arrow-left"></i>
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <h6 class="card-price">Rs ${price}</h6>
      <h6 class="card-category">${category}</h6>
      <p class="card-text">${description.substring(0, 100)}</p>
      <button onclick="onADD(${id})" class="addcart btn btn-primary">
      ${cartAddedvalue ? "Remove Item" : "AddtoCart"}</button>
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
  if (cartAddedvalue) {
    index--;
      if (index) {
        carts.innerHTML = `<span>Carts ${index}</span>`;
      } 
      else {
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
      } 
      else {
        pricebox.innerHTML = "";
      }
  } 
  else {
    addCarts.push(datas[i]);
    index++;
    carts.innerHTML = `<span>Carts ${index}</span>`;
  }
}
function showCart() {
  filterprice.style.display = "none";
  filterpriceValue.style.display = "none";
  cartAddedvalue = true;
  iterateLists(addCarts);
  let totalprice = 0;
  addCarts.forEach((cart) => {
    totalprice += cart.price;
  });
  if(totalprice){
    pricebox.innerHTML = `${cartAddedvalue && `<h1 id='prices'>Your price is $${totalprice}</h1>`
      }`;
  }
}


let strforCategory = "";

function showCategory(){
  allcategories.forEach(ele=>{
    strforCategory += `<li class="nav-item">
    <a class="category cursor-pointer fw-semibold nav-link">${ele}</a>
  </li>`;
  categorybox.innerHTML = strforCategory;
  })
}

categorybox.addEventListener('click',(e)=>{
  cartAddedvalue = false;
   if(e.target.classList.contains('category')){
    const databyCategory = datas.filter(ele=>ele.category === e.target.innerHTML);
    showFilteringPriceProgressBar()
    iterateLists(databyCategory);
   }
})




const filterprice = document.querySelector('#filterprice');
filterprice.min = Number(1000);
filterprice.max = Number(200000);
filterprice.value = Number(200000);
const filterpriceValue = document.getElementById('filterpriceValue');
filterpriceValue.innerHTML = `Items By Price ${filterprice.value}`;

filterprice.addEventListener('change',(e)=>{
  const targetprice = e.target.value;
  filterpriceValue.innerHTML = `Items By Price ${filterprice.value}`;
  let databyPrice = [...datas].filter(ele=>(Number(ele.price) <= targetprice));
  iterateLists(databyPrice)
  
})


home.addEventListener('click',()=>{
  cartAddedvalue = false;
  showFilteringPriceProgressBar()
  iterateLists(datas);
})

function showFilteringPriceProgressBar(){
  filterprice.style.display = "block";
  filterpriceValue.style.display = "block";
}