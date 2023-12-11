const btnMinus = document.querySelector(".itemMinus");
const btnPlus = document.querySelector(".itemPlus");
let counter = document.querySelector(".counter");

window.addEventListener("click",function(event){
    if (event.target.dataset.action === "plus" || event.target.dataset.action === "minus"){
        
        const counterWrapper = event.target.closest(".counter-wrapper");
        counter = counterWrapper.querySelector(".counter");
    }
    if (event.target.dataset.action === "plus"){
        counter.innerText = ++counter.innerText;
    }
    if (event.target.dataset.action === "minus"){
        if(parseInt(counter.innerText)>1){
        counter.innerText = --counter.innerText;
        }
        else if(event.target.closest(".cart-wrapper") && parseInt(counter.innerText)===1){
            event.target.closest(".cart-item").remove();
            showItemInCart();
            calculatePrice();
        }
    }
    if(event.target.hasAttribute("data-action") && event.target.closest(".cart-wrapper")){
        calculatePrice();
    }
});
 // to add items in cart
  window.addEventListener("click",function(event){
    const cartWrapper = document.querySelector('.cart-wrapper');
    if(event.target.hasAttribute('data-cart')){
        const card = event.target.closest(".card");
        const productInfo = {
            id:card.dataset.id,
            imgSrc:card.querySelector('.productPic').getAttribute("src"),
            title:card.querySelector(".title").innerText,
            counter:card.querySelector('.counter').innerText,
            price:card.querySelector(".priceProduct").innerText,
        };
        let itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);
        if(itemInCart){
            const counterItemInCart = itemInCart.querySelector(".counter");
            counterItemInCart.innerText = parseInt(counterItemInCart.innerText) + parseInt(productInfo.counter);
        }
        else {
            /*const cartItem = document.createElement("div");
            cartItem.classList.add("cartItem");
            cartItem.setAttribute("data-id","${productInfo.id}");
            
            const cartItemPic = document.createElement("img");
            cartItemPic.src = "${productInfo.imgSrc}";

            const cartItemDetails = document.createElement("div");
            cartItemDetails.classList.add("cartItemDetails");
            
            const cartItemTitle =document.createElement("p");
            cartItemTitle.classList.add("cartItemTitle");
            cartItemTitle.innerHTML = "${productInfo.title}";

            const itemsCounterWrapper = document.createElement("div");
            itemsCounterWrapper.classList.add("items");
            itemsCounterWrapper.classList.add("counter-wrapper");

            const minus = document.createElement("button");
            minus.classList.add("itemMinus");
            minus.setAttribute("data-action","minus");
            minus.innerHTML = "-";

            const counter = document.createElement("button");
            counter.classList.add("itemPlus");
            counter.setAttribute("data-counter","");
            counter.innerHTML = "${productInfo.counter}";

            const plus = document.createElement("button");
            plus.classList.add("itemPlus");
            plus.setAttribute("data-action","plus");
            plus.innerHTML = "+";
            
            const cartItemPrice = document.createElement("p");
            cartItemPrice.classList.add("cartItemPrice");
            cartItemPrice.innerHTML = "${productInfo.price}";

            cartWrapper.appendChild(cartItem);
            cartItem.appendChild(cartItemPic);
            cartItem.appendChild(cartItemDetails);
            cartItemDetails.appendChild(cartItemTitle);
            cartItemDetails.appendChild(itemsCounterWrapper);
            itemsCounterWrapper.appendChild(minus);
            itemsCounterWrapper.appendChild(counter);
            itemsCounterWrapper.appendChild(plus);
            cartItemDetails.appendChild(cartItemPrice);*/

            const cartItemHTML = 
        `<div class="cartItem cart-item"data-id ="${productInfo.id}">
            <img class="cartItemPic" src="${productInfo.imgSrc}" alt="">
            <div class="cartItemDetails">
                <p class="cartItemTitle ">${productInfo.title}</p>
                <div class="items counter-wrapper">
                    <button class="itemMinus" data-action="minus">-</button>
                    <button class="counter" data-counter = "">${productInfo.counter}</button>
                    <button class="itemPlus" data-action="plus">+</button>
                </div>
                <div class = "spanPrice">
                <span>$</span>
                <p class="priceProduct one"> ${productInfo.price}</p>
            </div>
        </div>`
         cartWrapper.insertAdjacentHTML("beforeend",cartItemHTML);
        }
    
        card.querySelector(".counter").innerText = "1";
        showItemInCart();
        calculatePrice();
    }
 })

 // to Show or keep orderForm and Cart Empty
 const cartEmpty = document.querySelector('.textEmpty');
 const orderForm = document.querySelector(".form");
 const deliveryFree = document.querySelector(".deliveryFree")
 function showItemInCart(){
    const cartWrapper = document.querySelector('.cart-wrapper');
    if(cartWrapper.children.length>0){
        cartEmpty.style.display="none";
        orderForm.style.display="block";
    }
    else{
        cartEmpty.style.display = "block";
        orderForm.style.display="none";
        deliveryFree.textContent = "Free food delivery from $ 20";
    }
}
// to calculate total amount

const totalAmount = document.querySelector(".totalAmount")

function calculatePrice(){
const cartItems = document.querySelectorAll(".cart-item");

let totalCartPrice=0;
cartItems.forEach(function(item){
    const cartItemCounter = item.querySelector("[data-counter]");
    const cartItemPrice = item.querySelector(".priceProduct");
    const deliveryCost = document.querySelector(".deliveryFree");
    const currentPrice = parseInt(cartItemCounter.innerText)*parseInt(cartItemPrice.textContent);
    totalCartPrice = totalCartPrice + currentPrice;
    totalAmount.textContent = totalCartPrice;

    if(totalAmount.innerText >= 20){
        deliveryCost.textContent = "Free";
    }
    else{
        deliveryCost.textContent = "$ 5"
    }
})
}

// input
const btnOrder = document.querySelector(".btnOrder");
btnOrder.addEventListener("click", () =>{
    const userNumber = document.querySelector(".userNumber");
    console.log(userNumber.value.length)
    
    if(userNumber.value === "" ){
        Swal.fire({
            position: 'center',
            background:"black",
            title: 'Enter your number!',
            showConfirmButton: false,
            timer: 2500
          });
    } 
    else if(isNaN(userNumber.value) && userNumber.value.length > 0 ){
        Swal.fire({
            position: 'center',
            background:"black",
            title: 'Enter your number not lettering!',
            showConfirmButton: false,
            timer: 2500
          });
    }
    else if(userNumber.value.length <= 10 || userNumber.value.length > 11){
        Swal.fire({
            position: 'center',
            background:"black",
            title: 'Check your number!',
            showConfirmButton: false,
            timer: 2500
          });
    }
    else{
        Swal.fire({
        position: 'center',
        background:"black",
        title: 'Thank you for your order!',
        showConfirmButton: false,
        timer: 2000
      });
      location.reload();// Не работает
    }
})

