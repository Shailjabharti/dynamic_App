var slideIndex = 1;
//var item_counter = 0;
showSlides(slideIndex);


function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}


function showSlides(n) {

    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

var carousal = document.getElementById("next");
setInterval(() => {
    carousal.click();
}, 5000);

// Cart functonality


function buy(id, operation, endpoint) {
    var url = window.location.origin+`/cart/${endpoint}/${id}/${operation}`;
    let xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open("GET", url, true);
    xmlHttpReq.onload = function () {
        if (xmlHttpReq.status >= 200 && xmlHttpReq.status < 400) {
            let data = JSON.parse(xmlHttpReq.responseText);
            console.log(data);
            
            updateCart(data.item_counter);
        } else {
            console.log("We conected to the server, but it returned an error.");
        }
    }
    xmlHttpReq.onerror = function () {
        console.log("Connection Error");
    }
    xmlHttpReq.send();
}

function addCount(id, prodid, price) {
    var input = document.getElementById("prod" + prodid);
    input.value = parseInt(input.value) + 1;
    item_counter = input.value;
    buy(id, 'add', 'addtocart');
    updateTotalCart(prodid, price);
}

function minusCount(id, prodid, price) {
    var input = document.getElementById("prod" + prodid);
    input.value = parseInt(input.value) - 1;
    console.log(input.value);
    if (input.value > 0) {
        item_counter = input.value;
        buy(id, 'remove', 'addtocart');
    } else if (input.value == 0) {
        input.value = 0;
        buy(id, 'remove', 'remove-item');
    }
    updateTotalCart(prodid, price);
    //updateCheckoutAmount();
}

function updateCart(item_counter) {
    document.getElementsByClassName("cart-count")[0].innerHTML = item_counter;
    if (window.location.pathname == "/product") {
        window.location.href = "/cart";
    }
    updateCheckoutAmount();
}

function updateTotalCart(prodid, price) {
    var input = document.getElementById("prod" + prodid);
    var totalPrice = parseInt(price) * parseInt(input.value);
    document.getElementsByClassName("totalp" + prodid)[0].innerHTML = totalPrice;
}

function updateCheckoutAmount() {
    var checkoutAccumulation = document.getElementsByClassName("total");
    let totalCheckoutSpan = document.getElementById("totalCheckoutAmount");
    let totalCheckoutPrice = 0;
    for (let i = 0; i < checkoutAccumulation.length; i++) {        
        totalCheckoutPrice = totalCheckoutPrice + parseInt(checkoutAccumulation[i].innerHTML);
    }
    totalCheckoutSpan.innerHTML = "Rs. " + totalCheckoutPrice;
}


