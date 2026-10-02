var products = document.querySelectorAll(".list li")
var search = document.getElementById("search")
var buttons = document.querySelectorAll(".buy-btn")
var cartCount = document.getElementById("cart-count")
var cartButton = document.getElementById("cart-button")
var cart = document.getElementById("cart")
var closeCart = document.getElementById("close-cart")
var cartItems = document.getElementById("cart-items") 
var count = 0
var total = 0
var cartProducts =[]

search.oninput = function(){
    var value =search.value.toLowerCase()
    products.forEach(function(product){
        var name = product.querySelector(".card-title").innerText.toLowerCase()
        if(name.includes(value)){
            product.style.display=""
        }
        else{
            product.style.display="none"
        }
    })
}
 
buttons.forEach(function(btn){

    btn.onclick = function(){

        var name = btn.dataset.name
        var price = Number(btn.dataset.price)

        var image = btn.parentElement.parentElement.parentElement
            .querySelector("img").src

        var existingProduct = cartProducts.find(function(product){
            return product.name === name
        })

        if(existingProduct){

            existingProduct.quantity++

        }
        else{

            cartProducts.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            })

        }

        count++
        cartCount.textContent = count

    }

})
function showCart(){

    cartItems.innerHTML = ""

    total = 0

    cartProducts.forEach(function(product, index){

        total += product.price * product.quantity

        cartItems.innerHTML += `
            <div class="flex gap-3 items-center border-b border-[#E8DCCF] py-4">

                <img src="${product.image}"
                     class="w-20 h-20 object-cover rounded-lg">

                <div class="flex-1">

                    <h3 class="font-bold text-[#3D2B1F]">
                        ${product.name}
                    </h3>

                    <p class="text-[#8B7D6B]">
                        $${product.price}
                    </p>

                    <div class="flex items-center gap-3 mt-2">

                        <button 
                            class="minus-btn border rounded-full w-6 h-6"
                            data-index="${index}">
                            -
                        </button>

                        <span>
                            ${product.quantity}
                        </span>

                        <button 
                            class="plus-btn border rounded-full w-6 h-6"
                            data-index="${index}">
                            +
                        </button>

                        <button 
                            class="delete-btn text-red-700 ml-2"
                            data-index="${index}">
                            🗑️
                        </button>

                    </div>

                </div>

            </div>
        `
    })


    cartItems.innerHTML += `
        <div class="border-t border-[#E8DCCF] mt-4 pt-4">

            <div class="flex justify-between font-bold text-[#3D2B1F]">

                <span>Total</span>

                <span>$${total}</span>

            </div>

            <button class="w-full mt-4 bg-[#3D2B1F] text-white py-3 rounded-full">
                Checkout
            </button>

        </div>
    `

    document.querySelectorAll(".plus-btn").forEach(function(btn){

        btn.onclick = function(){

            var index = btn.dataset.index

            cartProducts[index].quantity++

            count++

            cartCount.textContent = count

            showCart()

        }

    })

    document.querySelectorAll(".minus-btn").forEach(function(btn){

        btn.onclick = function(){

            var index = btn.dataset.index

            if(cartProducts[index].quantity > 1){

                cartProducts[index].quantity--

                count--

            }
            else{

                count--

                cartProducts.splice(index, 1)

            }

            cartCount.textContent = count

            showCart()

        }

    })

    document.querySelectorAll(".delete-btn").forEach(function(btn){

        btn.onclick = function(){

            var index = btn.dataset.index

            count -= cartProducts[index].quantity

            cartProducts.splice(index, 1)

            cartCount.textContent = count

            showCart()

        }

    })

}


cartButton.onclick = function(){

    cart.classList.remove("hidden")

    showCart()

}

closeCart.onclick = function(){
    cart.classList.add("hidden")
}